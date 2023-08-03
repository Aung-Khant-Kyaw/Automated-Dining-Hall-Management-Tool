import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "../Stylesheets/CalendarStyles.css";
import axios from 'axios';

var date = new Date().toISOString();
var dateInISO = date.slice(0,date.indexOf("T"));
let lakerID;

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class Calendar extends Component {

  constructor(props) {
    // super the props to pass variable
    super(props);
    lakerID = this.props.id;

    // make reference to the calender
    this.calendarRef = React.createRef();

    // configure the state of the calender
    this.state = {
      // weekly viewe
      viewType: "Week",
      // the bar is visible
      durationBarVisible: true,
      // start hours and end hours, determine the length
      businessBeginsHour: 7,
      businessEndsHour: 20,

      // // add event 
      // timeRangeSelectedHandling: "Disabled",

      // onTimeRangeSelected: async args => {
      //   const dp = this.calendar;
      //   const modal = await DayPilot.Modal.prompt("Add a new shift:", "Enter Position");
      //   dp.clearSelection();
      //   if (!modal.result) { return; }
      //   let objID;
      //   let start = args.start;
      //   let end = args.end;
      //   let position = modal.result
      //   axios
      //     .get('http://localhost:4000/route/getShiftID')
      //     .then(res => {
      //       objID = res; 
      //     })
      //     .catch(err => {
      //       console.log('Error converting endpoints data to calender')
      //     });
      //   dp.events.add({
      //     start: start,
      //     end: end,
      //     id: objID,
      //     text: position
      //   });
      //   axios
      //     .post('http://localhost:4000/route/saveShift', {
      //         start: start,
      //         end: end,
      //         lakerID: lakerID,
      //         opened: true,
      //         position: position
      //     })
      //     .then(function (res) {
      //         console.log(res);
      //     })
      //     .catch(function(err){
      //         console.log(err)
      //     });
      // },

      // eventDeleteHandling: "Update",
      onEventClick: async args => {
        const e = args.e;
        let start = e.data.start.value;
        let date = start.slice(0,start.indexOf("T"));
        let startTime = start.slice(start.indexOf("T")+1,start.indexOf("T")+6);
        let end = e.data.end.value;
        let endTime = end.slice(end.indexOf("T")+1,end.indexOf("T")+6);
        let text = e.data.text;
        let position=text.slice(0,text.indexOf("\n"));
        let display = "Date: " + date + " Start Time: "+ startTime + "\nEnd Time: " + endTime + "\nPosition: " + position;
        const modal = await DayPilot.Modal.confirm(display, {theme: "modal_rounded"});
        if(!modal.result) { return; } else {return;};
      },
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    const events = [];
    var shifts = [];
    let link = 'http://localhost:4000/route/schedule?lakerID=' + lakerID;
    axios
      .get(link)
      .then(res => {
        shifts= res.data;
        for (let i= 0; i<shifts.length ; i++){
          // get data from the db
          var start = shifts[i].start;
          var end = shifts[i].end;
          var position = shifts[i].position;
          var id = shifts[i]._id;
          
          // parse the start and end and position to display to calender
          let startHours = start.slice(start.indexOf("T")+1,start.indexOf(":"));
          let AmOrPm = startHours >= 12 ? 'P.M' : 'A.M';
          startHours = (startHours % 12) || 12;
          let startMins = start.slice(start.indexOf(":")+1,start.indexOf(":")+3);
          startHours = startHours + ":" + startMins + " " + AmOrPm;
          let endHours = end.slice(start.indexOf("T")+1,end.indexOf(":"));
          AmOrPm = endHours >= 12 ? 'P.M' : 'A.M';
          endHours = (endHours % 12) || 12;
          let endMins = end.slice(start.indexOf(":")+1,end.indexOf(":")+3);
          endHours = endHours + ":" + endMins + " " + AmOrPm;

          // update the position which will be the text shown on calender
          position = position + "\n" + startHours + "\n - \n" + endHours;
          // console.log(start,end,position,id);
          // var start = date + ' ' + startTime + ' UTC+0000'
          // var end = date + ' ' + endTime + ' UTC+0000';
          // console.log(start, end);
          // var tempStDate = new Date(start).toISOString();
          // var tempEdDate = new Date(end).toISOString();
          // console.log(tempStDate,tempEdDate);
          events.push({
            start: start,
            end: end,
            id: id,
            text: position
          });
        }
      })
      .catch(err => {
        console.log('Error converting endpoints data to calender')
      })
    const startDate = dateInISO;
    this.calendar.update({startDate, events});
  }

  render() {
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={2}
            skipMonths={2}
            startDate={dateInISO}
            selectionDay={dateInISO}
            onTimeRangeSelected={ args => {
              this.calendar.update({
                startDate: args.day
              });
            }}
          />
        </div>
        <div style={styles.main}>
          <DayPilotCalendar
            {...this.state}
            ref={this.calendarRef}
          />
        </div>
      </div>
    );
  }
}

export default Calendar;