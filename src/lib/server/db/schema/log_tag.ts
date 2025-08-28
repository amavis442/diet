import { pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';
import {logEntries } from './log_entries';
import {tags } from './tags';

export const logTag = pgTable('log_tag', {
    id: uuid('id').defaultRandom().primaryKey(),
    entryId: uuid('entry_id').references(() => logEntries.id).notNull(),
    tagId: uuid('tag_id').references(() => tags.id).notNull(),
});
