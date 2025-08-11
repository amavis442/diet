import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export const tags = pgTable('tags', {
    id: uuid('id').defaultRandom().primaryKey(),
    label: varchar('label', { length: 30 }).notNull(), // e.g. "Carnivore"
});
