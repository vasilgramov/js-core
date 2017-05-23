/**
 * Created by vladix on 5/22/17.
 */

function calcNextDay(year, month, day)  {
    let date = new Date(year, month-1, day);
    let oneDay = 24 * 60 * 60 * 1000; // milliseconds in 1 day
    let nextDate = new Date(date.getTime() + oneDay);
    return nextDate.getFullYear() + "-" +
        (nextDate.getMonth() + 1) + '-' +
        nextDate.getDate();
}

nextDay(2016, 9, 30);
