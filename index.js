
const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) 
    return payable
}

function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
        createTimeInEvent,
        createTimeOutEvent,
        hoursWorkedOnDate,
        wagesEarnedOnDate,
        allWagesFor
    };
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
}

function createTimeInEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function createTimeOutEvent(dateStamp) {
    let [date, hour] = dateStamp.split(' ');
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return this;
}

function hoursWorkedOnDate(soughtDate) {
    let timeIn = this.timeInEvents.find(e => e.date === soughtDate);
    let timeOut = this.timeOutEvents.find(e => e.date === soughtDate);
    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(date) {
    return this.hoursWorkedOnDate(date) * this.payPerHour;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(record => record.firstName === firstName);
}

function calculatePayroll(records) {
    return records.reduce((memo, record) => memo + record.allWagesFor(), 0);
}

// Example usage:
const employees = [
    ["Gray", "Worm", "Security", 1],
    ["Daenerys", "Targaryen", "CEO", 1000],
    ["Jon", "Snow", "CFO", 1000]
];

let employeeRecords = createEmployeeRecords(employees);

employeeRecords[0].createTimeInEvent("2018-01-01 0800");
employeeRecords[0].createTimeOutEvent("2018-01-01 1700");

employeeRecords[1].createTimeInEvent("2018-01-01 0900");
employeeRecords[1].createTimeOutEvent("2018-01-01 1700");

employeeRecords[2].createTimeInEvent("2018-01-01 1000");
employeeRecords[2].createTimeOutEvent("2018-01-01 1700");

console.log(calculatePayroll(employeeRecords));
