import { TZDate } from '@date-fns/tz';

/**
 * Date really sucks. Need localtime, not UTC.
 * 
 * @param timestamp 
 */
export function adjustForLocalTime(timestamp: Date) {
    const offsetMinutes = new Date().getTimezoneOffset(); // e.g. -120 for +2 hours
    const offsetHours = -offsetMinutes / 60;

    timestamp.setHours(timestamp.getHours() + offsetHours);
}

export function localTimeToUTC(timestamp: Date): Date {
    const offsetMinutes = new Date().getTimezoneOffset(); // e.g. -120 for +2 hours
    const offsetHours = +offsetMinutes / 60;

    timestamp.setHours(timestamp.getHours() + offsetHours);

    return timestamp;
}

export function utcToLocalTime(timestamp: Date): Date {
    const offsetMinutes = new Date().getTimezoneOffset(); // e.g. -120 for +2 hours
    const offsetHours = -offsetMinutes / 60;

    timestamp.setHours(timestamp.getHours() + offsetHours);

    return timestamp;
}


/**
 * Since Date really sucks, we have to do this to get the correct local time.
 * 
 * @param timestamp 
 */
export function adjustReverseForLocalTime(timestamp: Date) {
    const offsetMinutes = new Date().getTimezoneOffset(); // e.g. -120 for +2 hours
    const offsetHours = +offsetMinutes / 60;

    timestamp.setHours(timestamp.getHours() + offsetHours);
}

/**
 * 
 * @param date 
 * @returns 
 */
export function formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`; // ✅ "YYYY-MM-DD"
}

/**
 * 
 * @param currentDateTime 
 * @returns 
 */
export function formatTimeForInput(currentDateTime: Date): { hour: string; minute: string } {
    const hour = String(currentDateTime.getHours()).padStart(2, '0');
    const minute = String(currentDateTime.getMinutes()).padStart(2, '0');

    return { hour, minute };
}

export function getUTCRangeForLocalDay(date: Date, timeZone: string) {
    const localStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const localEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    return {
        startUTC: new TZDate(localStart, timeZone),
        endUTC: new TZDate(localEnd, timeZone),
    };
}

export function getUTCRange(date: Date) {
    const localStart = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
    const localEnd = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59);

    return {
        startUTC: localStart,
        endUTC: localEnd,
    }
}