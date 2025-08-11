import { pgTable, text, varchar, uuid } from 'drizzle-orm/pg-core';

export const logTypes = pgTable('log_types', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 50 }).notNull(), // e.g. "coffee"
    icon: text('icon').notNull(), // e.g. "☕"
    color: varchar('color', { length: 20 }).notNull().default('blue-100'),
});
