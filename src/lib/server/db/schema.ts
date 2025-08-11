import { pgTable, serial, integer, text, timestamp } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
	id: text('id').primaryKey(),
	age: integer('age'),
	username: text('username').notNull().unique(),
	passwordHash: text('password_hash').notNull()
});

export const session = pgTable('session', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => user.id),
	expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull()
});

export type Session = typeof session.$inferSelect;

export type User = typeof user.$inferSelect;

// 👇 Import table definitions
import { entryTags } from './schema/entry_tags';
import { logEntries } from './schema/log_entries';
import { logTypes } from './schema/log_types';
import { tags } from './schema/tags';

// 👇 Export inferred types
export type EntryTag = typeof entryTags.$inferSelect;
export type LogEntry = typeof logEntries.$inferSelect;
export type LogType = typeof logTypes.$inferSelect;
export type Tag = typeof tags.$inferSelect;

export type NewLogEntry = typeof logEntries.$inferInsert;
export type NewTag = typeof tags.$inferInsert;
export type NewLogType = typeof logTypes.$inferInsert;

// 👇 Optionally export the tables too
export {
    entryTags,
    logEntries,
    logTypes,
    tags
};