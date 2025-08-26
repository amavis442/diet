import { sql } from 'drizzle-orm';
import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core';
import { logTypes } from './log_types';

export const logEntries = pgTable('log_entries', {
    id: uuid('id').defaultRandom().primaryKey(),
    typeId: uuid('type_id').references(() => logTypes.id).notNull(),
    timestamp: timestamp('timestamp', { mode: 'date', withTimezone: true }).notNull(),
    unix: integer()
        .notNull()
        .default(sql`extract(epoch from now())`),
    note: text('note'),
    description: text('description'),
    score: integer().notNull().default(sql`4`),
});