import { pgTable, uuid, timestamp, text } from 'drizzle-orm/pg-core';
import { logTypes } from './log_types';

export const logEntries = pgTable('log_entries', {
    id: uuid('id').defaultRandom().primaryKey(),
    typeId: uuid('type_id').references(() => logTypes.id).notNull(),
    timestamp: timestamp('timestamp', { mode: 'date', withTimezone: false }).notNull(),
    note: text('note'),
});