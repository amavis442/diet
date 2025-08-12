// adjustForLocalTime.test.ts
import { describe, it, expect } from 'vitest';
import { adjustForLocalTime } from './date';

describe('adjustForLocalTime', () => {
    it('should adjust a UTC timestamp to local time', () => {
        const utcDate = new Date(Date.UTC(2023, 0, 1, 12, 0, 0)); // 12:00 UTC
    
        // Before adjustment: local hour of UTC time
        const beforeAdjustment = utcDate.getHours();
    
        adjustForLocalTime(utcDate);
    
        // After adjustment: should be offset by system timezone
        const offsetHours = -new Date().getTimezoneOffset() / 60;
        const expectedHour = beforeAdjustment + offsetHours;
    
        expect(utcDate.getHours()).toBe(expectedHour);
      });
});
