CREATE TABLE "users"
(
    "id" SERIAL PRIMARY KEY,
    "full_name" varchar(100),
    "email" varchar(100),
    "password" varchar(100),
    "created_at" timestamp
);
CREATE TABLE "band_descriptors"
(
    "id" SERIAL PRIMARY KEY,
    "label" varchar(100),
    "type" varchar(100)
);
CREATE TABLE "class_code"
(
    "id" SERIAL PRIMARY KEY,
    "code" varchar(100)
);
CREATE TABLE "user_class_code"
(
    "id" SERIAL PRIMARY KEY,
    "user_id" int,
    "class_code_id" int
);
CREATE TABLE "essays"
(
    "id" SERIAL PRIMARY KEY,
    "task" varchar(50),
    "question" varchar,
    "essay" varchar,
    "user_id" int,
    "created_at" timestamp
);
CREATE TABLE "reviews"
(
    "id" SERIAL PRIMARY KEY,
    "essay_id" int,
    "band_descriptor_id" int,
    "value" varchar(100),
    "name" varchar(100),
    "destined_user" int,
    "given_user" int,
    "created_at" timestamp
);
ALTER TABLE "user_class_code" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "user_class_code" ADD FOREIGN KEY ("class_code_id") REFERENCES "class_code" ("id");
ALTER TABLE "essays" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");
ALTER TABLE "reviews" ADD FOREIGN KEY ("essay_id") REFERENCES "essays" ("id");
ALTER TABLE "reviews" ADD FOREIGN KEY ("band_descriptor_id") REFERENCES "band_descriptors" ("id");
ALTER TABLE "reviews" ADD FOREIGN KEY ("destined_user") REFERENCES "users" ("id");
ALTER TABLE "reviews" ADD FOREIGN KEY ("given_user") REFERENCES "users" ("id");