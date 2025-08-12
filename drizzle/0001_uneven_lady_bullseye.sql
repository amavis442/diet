ALTER TABLE "log_entries" ALTER COLUMN "timestamp" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "log_entries" ADD COLUMN "unix" integer DEFAULT extract(epoch from now()) NOT NULL;--> statement-breakpoint
ALTER TABLE "log_types" ADD COLUMN "color" varchar(20) DEFAULT 'blue-100' NOT NULL;