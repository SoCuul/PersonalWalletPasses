/**
 * Converts a JavaScript Date to a valid W3C String
 * @param date A JavaScript Date object
 * @returns A valid W3C string
 */
export default function (date) {
    const year = date.getFullYear();
    let month = date.getMonth();
    month++;
    if (month < 10) {
        month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    let hours = date.getHours();
    if (hours < 10) {
        hours = '0' + hours;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    let seconds = date.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    const offset = -date.getTimezoneOffset();
    let offsetHours = Math.abs(Math.floor(offset / 60));
    let offsetMinutes = Math.abs(offset) - offsetHours * 60;
    if (offsetHours < 10) {
        offsetHours = '0' + offsetHours;
    }
    if (offsetMinutes < 10) {
        offsetMinutes = '0' + offsetMinutes;
    }
    let offsetSign = '+';
    if (offset < 0) {
        offsetSign = '-';
    }
    return year
        + '-'
        + month
        + '-'
        + day
        + 'T'
        + hours
        + ':'
        + minutes
        + ':'
        + seconds
        + offsetSign
        + offsetHours
        + ':'
        + offsetMinutes;
}
