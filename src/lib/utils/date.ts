import { TZDate } from '@date-fns/tz';

export function adjustForLocalTime(timestamp: Date): Date {
    const offsetMinutes = new Date().getTimezoneOffset();
    const result = new Date(timestamp);
    result.setHours(result.getHours() + (-offsetMinutes / 60));
    return result;
}

export function localTimeToUTC(timestamp: Date): Date {
    const offsetMinutes = new Date().getTimezoneOffset();
    const result = new Date(timestamp);
    result.setHours(result.getHours() + (offsetMinutes / 60));
    return result;
}

export function utcToLocalTime(timestamp: Date): Date {
    const offsetMinutes = new Date().getTimezoneOffset();
    const result = new Date(timestamp);
    result.setHours(result.getHours() + (-offsetMinutes / 60));
    return result;
}

export function adjustReverseForLocalTime(timestamp: Date): Date {
    const offsetMinutes = new Date().getTimezoneOffset();
    const result = new Date(timestamp);
    result.setHours(result.getHours() + (offsetMinutes / 60));
    return result;
}

export function formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

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
    };
}
