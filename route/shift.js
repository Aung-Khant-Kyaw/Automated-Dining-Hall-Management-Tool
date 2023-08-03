/**
 * creating a shift class to get shift data such as 
 *  1. personal schedule or every shift that belong to a lakerID
 *  2. opened shift or every shift where "opened" attribute is true, which means
 *      these are the shifts that need to show up in the Trade Shift
 *  3. take shift will change the lakerID attrite to the personal's lakerID who took it 
 *  4. add shift will add another shift to the Shift Collections with opened attribute being true
 * 
 * and send back to our frontend later
 * */ 

const axios = require("axios");
const SHIFT = require("../models/Shift")
const mongoose = require('mongoose');

class Shift {

    /**
     * Gets the personal shift data aka schedukle based on the LakerID
     * AKA it return every shifts that belong to the LakerID
     *
     * @param {string} lakerID The LakerID used to get the personal shift schedule info from database
     * @return {JSON} The data response from shift schedule.
     */
    getSchedule = async (lakerID) => {
        return SHIFT.find({ lakerID: lakerID, opened: false }).exec();
    }

        /**
     * Gets the personal shift data aka schedukle based on the LakerID
     * AKA it return every shifts that belong to the LakerID
     *
     * @param {string} lakerID The LakerID used to get the personal shift schedule info from database
     * @return {JSON} The data response from shift schedule.
     */
    getDailySchedules = async (lakerID) => {
        return SHIFT.find({}).exec();
    }

    /**
     * opened shift or every shift where "opened" attribute is true, which means
     *    these are the shifts that need to show up in the Trade Shift
     * @return {JSON} The data response from shifts that are opened.
     */
    getOpenedShift = async () => {
        return SHIFT.find({ opened: true }).exec();
    }

    /**
     * Save a single shift to the date base
     * 
     * @param {Shift} newShift new Shift JSON object made from api call
     */
    saveShift = async (start,end,lakerID,opened,position) => {
        // console.log(startTime,endTime,weekly,weekday,date,lakerID,opened,position);
        const tempShift = new SHIFT ({
            start: start,
            end: end,
            lakerID: lakerID,
            opened: opened,
            position: position
        });
        return tempShift.save(function(err, res){
            if (err) return console.log(err);
            console.log("saved successfully");
        });
    }

    /**
     * return a new Object ID that is not in the date base
     */
    getShiftID = async() => {
        return mongoose.Types.ObjectId();
    }

    exchangeShift = async(_id, lakerID) => {
        SHIFT.findByIdAndUpdate(_id, { lakerID: lakerID, opened: false },
                function (err, docs) {
                if (err){
                    console.log(err)
                } else {
                console.log("Shift Doc Updated");
                }
        });
    }
}

module.exports = Shift;