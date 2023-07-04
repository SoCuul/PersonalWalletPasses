type numOrString = number | string

/**
 * Converts a JavaScript Date to a valid W3C String
 * @param date A JavaScript Date object
 * @returns A valid W3C string
 */
export default function (date: Date): string {
    const year = date.getFullYear()

    let month: numOrString = date.getMonth()
    month ++
    if (month < 10) {
        month = '0' + month
    }
    
    let day: numOrString = date.getDate()
    if (day < 10) {
        day = '0' + day
    }

    let hours: numOrString = date.getHours()
    if (hours < 10) {
        hours = '0' + hours
    }

    let minutes: numOrString = date.getMinutes()
    if (minutes < 10) {
        minutes = '0' + minutes
    }

    let seconds: numOrString = date.getSeconds()
    if (seconds < 10) {
        seconds = '0' + seconds
    }

    const offset: number = -date.getTimezoneOffset()
    let offsetHours: numOrString = Math.abs(Math.floor(offset / 60))
    let offsetMinutes: numOrString = Math.abs(offset) - offsetHours * 60

    if (offsetHours < 10) {
        offsetHours = '0' + offsetHours
    }
    if (offsetMinutes < 10) {
        offsetMinutes = '0' + offsetMinutes
    }
    let offsetSign = '+'
    if (offset < 0) {
        offsetSign = '-'
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
        + offsetMinutes
}