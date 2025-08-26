ALTER TABLE "log_entries" ADD COLUMN "description" text;
ALTER TABLE "log_entries" ADD COLUMN "score" integer DEFAULT 4 NOT NULL;