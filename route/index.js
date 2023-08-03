/**
 * depending on the type of endpoint called from client side, 
 * this is where the router lives to help direct which type of traffic goes where
 * i.g if we have a POST /shift endpoint call, 
 * this router is able to dicate what kind of operations need to take palce to satisfy the call. 
 */

// Use express's router to route all our API endpoints
const express = require('express');
const router = express.Router();

// Use the Shift class made in ./shift.js to call our method that will get the shift data from the database
const Shift = require("./shift");

// GET Request - get the schedule data based on request body of the ID
router.get("/schedule",  async (req, res) => {
    const {lakerID} = req.query;
    // console.log(lakerID);
    let shift = new Shift();
    
    // The params for LakerID is dynamic
    let scheduleData = await shift.getSchedule(lakerID);

    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(scheduleData, null, 4));
});

router.get("/getShiftByID", async(req,res) => {
    let shift = new Shift();
    const {_id} = req.query;
    console.log(_id);
    let shiftData = await shift.getShiftByID(_id);
    // Content that will be sent will be a prettified json
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(shiftData, null, 4));
});

// GET request - get all the opened shifts in the database
router.get("/openedshifts",  async (req, res) => {
    let shift = new Shift();
    
    let shiftData = await shift.getOpenedShift();

    // Content that will be sent will be a prettified json
    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(shiftData, null, 4));
});

// GET request - get a new Unique Object ID from the database to put new shift to calender
/**
 * Save a single shift to the date base
 *@return {String} The unique Object ID from the database
 */
router.get("/getShiftID", async(req,res) => {
    let shift = new Shift();
    let shiftID = await shift.getShiftID();
    res.send(shiftID);
});

// GET Request - get the schedule data based on request body of the ID
router.get("/dailySchedules",  async (req, res) => {
    // const {lakerID} = req.query;
    // console.log(lakerID);
    let shift = new Shift();
    
    // The params for LakerID is dynamic
    let scheduleData = await shift.getDailySchedules();

    res.header("Content-Type",'application/json');
    res.send(JSON.stringify(scheduleData, null, 4));
});



// POST request - save a new shift to the database
/**
 * Save a single shift to the date base
 * @param {string} start the Start day and Time of the shift, REQUIRED
 * @param {string} end the End day and Time of the shift, REQUIRD
 * @param {string} lakerID the lakerID of the user or the student the shift belong to, REQUIRED
 * @param {Boolean} opened IF the shift is opened or not, If the shift is opened, the lakerID will to offer this specific shift to another student
 * @param {string} position The position of the shift
 *@return {JSON} The data response from shifts that are opened.
 */
router.post("/saveShift", async(req, res) => {
    let shift = new Shift();
    let start=  req.body.start;
    let end= req.body.end;
    let lakerID= req.body.lakerID;
    let opened= req.body.opened;
    let position= req.body.position;
    await shift.saveShift(start,end,lakerID,opened,position);
    res.send("Shift Saved")
});

// POST request - find a shift based on the ID and Update it 
/**
 * @param {string} _id the shift Object ID
 * @param {string} lakerID the lakerID of the user or the student the shift belong to, REQUIRED
 *@return {JSON} The data response from shifts that are opened.
 */
router.post("/exchangeShift", async(req, res) => {
    let shift = new Shift();
    let _id=  req.body.id;
    let lakerID= req.body.lakerID;
    await shift.exchangeShift(_id,lakerID);
    res.send("Shift exchange successfully")
});

module.exports = router;