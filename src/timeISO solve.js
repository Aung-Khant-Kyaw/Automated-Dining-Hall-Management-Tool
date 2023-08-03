const dateSt = '12,12,2022 10:24 AM';
const newDate = dateSt + ' UTC+0000';

var date = new Date(newDate);

console.log(date.toISOString());

date = new Date('11,24,2022 10:11 PM');
console.log(date.toISOString());