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

      // add event 
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: async args => {

        // get Start Time and End Time and Position
        const dp = this.calendar;
        var form = [
          {name: "Start Time: Enter in 24 hour Format", id: "start"},
          {name: "End Time: : Enter in 24 hour Format", id: "end"},
          {name: "Position", id: "position"}
        ]
        let start = args.start;
        let end = args.end;
        let startTime = start.value.slice(start.value.indexOf("T")+1,start.value.indexOf(":")+3);
        let endTime = end.value.slice(end.value.indexOf("T")+1,end.value.indexOf(":")+3);
        var data = {
          start: startTime,
          end: endTime,
        }
        const modal = await DayPilot.Modal.form(form,data);
        dp.clearSelection();
        if (!modal.result) {return;}
        let formResult = modal.result
        start = start.value.slice(0,start.value.indexOf("T")+1) + formResult.start + ":00"
        end = end.value.slice(0,end.value.indexOf("T")+1) + formResult.end + ":00"
        // parse formResult to get what you need 

        // get objID for database
        axios
          .get('http://localhost:4000/route/getShiftID')
          .then(async res => {
            let objID = res.data;
            // put the rest of code here coz things doesnt get out of axios
            let text = getPosition(start,end,formResult.position,lakerID)
            dp.events.add({
              start: start,
              end: end,
              id: objID,
              text: text
            });

            await axios
              .post('http://localhost:4000/route/saveShift', {
                  start: start,
                  end: end,
                  lakerID: lakerID,
                  opened: true,
                  position: formResult.position
              })
              .then(function (res) {
                  // console.log(res);
              })
              .catch(function(err){
                  console.log(err)
              });
            
            // await console.log("happy day to uou ")
          })
          .catch(err => {
            console.log('Add shift error')
          });
      },
      
      onEventClick: async args => {
        const dp = this.calendar;
        // console.log(args.e.data.text)
        const e = args.e;
        let start = e.data.start.value;
        let date = start.slice(0,start.indexOf("T"));
        let startTime = start.slice(start.indexOf("T")+1,start.indexOf("T")+6);
        let end = e.data.end.value;
        let endTime = end.slice(end.indexOf("T")+1,end.indexOf("T")+6);
        let text = e.data.text;
        let position=text.slice(0,text.indexOf("\n"));
        let from = text.slice(text.indexOf("-")+19);
        let id = e.data.id;
        let display = "Date: " + date + " Start Time: "+ startTime + "\nEnd Time: " + endTime + "\nPosition: " + position + "\nFrom: " + from;
        const modal = await DayPilot.Modal.confirm(display, {okText: "Cover shift", theme: "modal_rounded"});
        if (!modal.result) { return; }
        if (modal.result === "OK") {
          await axios
              .post('http://localhost:4000/route/exchangeShift', {
                  id: id,
                  lakerID: lakerID
              })
              .then(function(res) {

                dp.events.remove(e);
              })
              .catch(function(err){
                  console.log(err)
              });
        }
        // dp.events.update({viewType: "Week"});

        // const dp = this.calendar;
        // const modal = await DayPilot.Modal.prompt("Update shift info:", args.e.text());
        // if (!modal.result) { return; }
        // const e = args.e;
        // e.data.text = modal.result;
        // dp.events.update(e);
      },
    };
  }

  get calendar() {
    return this.calendarRef.current.control;
  }

  componentDidMount() {
    const events = [];
    var shifts = [];
    let link = 'http://localhost:4000/route/openedshifts';
    axios
      .get(link)
      .then(res => {
        shifts= res.data;
        for (let i= 0; i<shifts.length ; i++){
          // get data from the db
          var start = shifts[i].start;
          var end = shifts[i].end;
          var position = shifts[i].position;
          var account = shifts[i].lakerID;
          var id = shifts[i]._id;

          position = getPosition(start,end,position,account);

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

function getPosition (start, end, position, lakerID){
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
  position = position + "\n" + startHours + "\n - \n" + endHours + "\n from: " + lakerID ;
  return position;
}
export default Calendar;