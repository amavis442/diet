ALTER TABLE "session" DROP CONSTRAINT session_user_id_user_id_fk;
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid USING id::uuid;
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "session" ALTER COLUMN "user_id" SET DATA TYPE uuid USING user_id::uuid;

ALTER TABLE "session"
ADD CONSTRAINT session_user_id_user_id_fk
FOREIGN KEY (user_id) REFERENCES "user"(id);