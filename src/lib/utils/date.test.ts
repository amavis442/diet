import { describe, it, expect } from 'vitest';
import { adjustForLocalTime } from './date';

describe('adjustForLocalTime', () => {
    it('should return a new Date adjusted to local time without mutating the input', () => {
        const utcDate = new Date(Date.UTC(2023, 0, 1, 12, 0, 0));
        const originalTime = utcDate.getTime();
        const beforeHour = utcDate.getHours();

        const result = adjustForLocalTime(utcDate);

        const offsetHours = -new Date().getTimezoneOffset() / 60;
        expect(result.getHours()).toBe(beforeHour + offsetHours);
        expect(utcDate.getTime()).toBe(originalTime);
    });
});
