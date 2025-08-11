import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { logEntries } from './log_entries';
import { tags } from './tags';

export const entryTags = pgTable('entry_tags', {
    entryId: uuid('entry_id').references(() => logEntries.id).notNull(),
    tagId: uuid('tag_id').references(() => tags.id).notNull(),
});
