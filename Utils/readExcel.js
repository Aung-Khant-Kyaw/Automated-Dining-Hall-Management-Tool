const readXlsxFile = require('read-excel-file/node')
const moment = require('moment')
const file = 'server/Cooper Fall 2022 Student Schedule.xlsx';
const axios = require('axios')
require('dotenv').config();

//  Global Map to store the user name and their LakerID
let users = new Map()

// File path.
readXlsxFile(file).then((rows) => {
    // put the userName and the LakerID into a map 
    for (let i = 1; i < rows.length; i++) {
        let email = rows[i][1];
        let lakerID = email.slice(0,email.indexOf('@'));
        users.set(rows[i][0], lakerID);
    }
});

// // read the Breakfast sheet
// readXlsxFile(file, { sheet: 'Breakfast' }).then((rows) => {
//     // each row of the excel excluding the first roll which is the title
//     for (let i = 1; i < rows.length; i++) {
//         // from each row,the name of the shift starts from the 2nd column 
//         for (let k = 3; k < rows[i].length; k++){
//             // the first column is the start time
//             let startTime = rows[i][0];
//             // the second column is the end time
//             let endTime = rows[i][1];
//             // the position of the shift is on the third column
//             let position = rows[i][2];
//             // the weekday depends on the column number
//             let weekday;
//             if (k == 3){
//                 weekday = 1;
//             } else if (k == 4) {
//                 weekday = 2;
//             } else if (k == 5) {
//                 weekday = 3;
//             } else if (k == 6) {
//                 weekday = 4;
//             } else if (k == 7) {
//                 weekday = 5;
//             }
//             // get the LakerID depending on the name
//             let lakerID = users.get(rows[i][k]);
//             // since the shift is from the file, the opened boolean is false. 
//             let opened = false;
//             // get an array of the date weekly till the end of semester
//             let dates = getWeeklyDate(weekday);
//             if (lakerID != undefined){
//                 // shifts weekly till the end of the semester
//                 let shiftDocs = [];
//                 for (let date of dates){
//                     let start = date + ' ' + startTime + ' UTC+0000';
//                     start = new Date(start);
//                     let end = date + ' ' + endTime + ' UTC+0000';
//                     end = new Date(end);
//                     // console.log(start, end, lakerID, opened, position);
//                     axios
//                         .post('http://localhost:4000/route/saveShift', {
//                             start: start,
//                             end: end,
//                             lakerID: lakerID,
//                             opened: opened,
//                             position: position
//                         })
//                         .then(function (res) {
//                             console.log(res);
//                         })
//                         .catch(function(err){
//                             console.log(err)
//                         });
//                 }
//             }
//         }
//     }
//     // console.log(shiftDocs.length);
// });

// read the Lunch sheet
readXlsxFile(file, { sheet: 'Lunch' }).then((rows) => {
    // each row of the excel excluding the first roll which is the title
    for (let i = 1; i < rows.length; i++) {
        // from each row,the name of the shift starts from the 2nd column 
        for (let k = 3; k < rows[i].length; k++){
            // the first column is the start time
            let startTime = rows[i][0];
            // the second column is the end time
            let endTime = rows[i][1];
            // the position of the shift is on the third column
            let position = rows[i][2];
            // the weekday depends on the column number
            let weekday;
            if (k == 3){
                weekday = 1;
            } else if (k == 4) {
                weekday = 2;
            } else if (k == 5) {
                weekday = 3;
            } else if (k == 6) {
                weekday = 4;
            } else if (k == 7) {
                weekday = 5;
            }
            // get the LakerID depending on the name
            let lakerID = users.get(rows[i][k]);
            // since the shift is from the file, the opened boolean is false. 
            let opened = false;
            // get an array of the date weekly till the end of semester
            let dates = getWeeklyDate(weekday);
            if (lakerID != undefined){
                // shifts weekly till the end of the semester
                let shiftDocs = [];
                for (let date of dates){
                    let start = date + ' ' + startTime + ' UTC+0000';
                    start = new Date(start);
                    let end = date + ' ' + endTime + ' UTC+0000';
                    end = new Date(end);
                    // console.log(start, end, lakerID, opened, position);
                    axios
                        .post('http://localhost:4000/route/saveShift', {
                            start: start,
                            end: end,
                            lakerID: lakerID,
                            opened: opened,
                            position: position
                        })
                        .then(function (res) {
                            console.log(res);
                        })
                        .catch(function(err){
                            console.log(err)
                        });
                }
            }
        }
    }
    // console.log(shiftDocs.length);
});

// read the Dinner sheet
readXlsxFile(file, { sheet: 'Dinner' }).then((rows) => {
    // each row of the excel excluding the first roll which is the title
    for (let i = 1; i < rows.length; i++) {
        // from each row,the name of the shift starts from the 2nd column 
        for (let k = 3; k < rows[i].length; k++){
            // the first column is the start time
            let startTime = rows[i][0];
            // the second column is the end time
            let endTime = rows[i][1];
            // the position of the shift is on the third column
            let position = rows[i][2];
            // the weekday depends on the column number
            let weekday;
            if (k == 3){
                weekday = 1;
            } else if (k == 4) {
                weekday = 2;
            } else if (k == 5) {
                weekday = 3;
            } else if (k == 6) {
                weekday = 4;
            } else if (k == 7) {
                weekday = 5;
            }
            // get the LakerID depending on the name
            let lakerID = users.get(rows[i][k]);
            // since the shift is from the file, the opened boolean is false. 
            let opened = false;
            // get an array of the date weekly till the end of semester
            let dates = getWeeklyDate(weekday);
            if (lakerID != undefined){
                // shifts weekly till the end of the semester
                let shiftDocs = [];
                for (let date of dates){
                    let start = date + ' ' + startTime + ' UTC+0000';
                    start = new Date(start);
                    let end = date + ' ' + endTime + ' UTC+0000';
                    end = new Date(end);
                    // console.log(start, end, lakerID, opened, position);
                    axios
                        .post('http://localhost:4000/route/saveShift', {
                            start: start,
                            end: end,
                            lakerID: lakerID,
                            opened: opened,
                            position: position
                        })
                        .then(function (res) {
                            console.log(res);
                        })
                        .catch(function(err){
                            console.log(err)
                        });
                }
            }
        }
    }
    // console.log(shiftDocs.length);
});

function getWeeklyDate(dayNum) {
    // 0 = Sunday, 1 = Monday, 2 = Tuesday, 3 = Wednesday, 4 = Thursday, 5 = Friday, 6 = Saturday

    var start = moment(process.env.SEMESTERSTART),
    end   = moment(process.env.SEMESTEREND), 
    day   = dayNum;              

    var result = [];
    var dates = [];
    var current = start.clone();

    while (current.day(7 + day).isBefore(end)) {
    result.push(current.clone());
    }

    for (let m of result){
        var date = new Date(m.format('LL'));
        dates.push(date.toDateString());
    }
    
    return dates; 
}
