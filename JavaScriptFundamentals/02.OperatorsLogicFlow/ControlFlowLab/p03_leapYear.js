/**
 * Created by vladix on 5/23/17.
 */
function isLeapYear(year) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        console.log("yes")
    } else {
        console.log("no")
    }
}

isLeapYear(1999);