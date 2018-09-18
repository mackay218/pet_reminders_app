CREATE TABLE "person" (
	"id" serial NOT NULL,
	"first_name" varchar(200) NOT NULL,
	"last_name" varchar(200) NOT NULL,
	"clinic_name" varchar(200) NOT NULL,
	"email" varchar(200) NOT NULL,
	"password" varchar(500) NOT NULL,
	CONSTRAINT vets_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "pet_owners" (
  "id" serial NOT NULL,
  "first_name" varchar(200) NOT NULL,
  "last_name" varchar(200) NOT NULL,
  "phone" varchar(12) NOT NULL,
  "email" varchar(200) NOT NULL,
  "address" varchar(200) NOT NULL,
  "vet_id" integer NOT NULL,
  CONSTRAINT pet_owners_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "pets" (
	"id" serial NOT NULL,
	"owner_id" integer NOT NULL,
	"name" varchar(200) NOT NULL,
	"species" varchar(200) NOT NULL,
	"breed" varchar(200) DEFAULT 'N/A',
	"age" integer,
	"sex" varchar(1) NOT NULL,
	"weight" integer NOT NULL,
	"notes" varchar(1000),
	CONSTRAINT pets_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "care_type" (
	"id" serial NOT NULL,
	"name" varchar(200) NOT NULL,
	"frequency" integer NOT NULL,
	CONSTRAINT care_type_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "care_history" (
	"id" serial NOT NULL,
	"pet_id" integer NOT NULL,
	"care_type_id" integer NOT NULL,
	"due_date" DATE NOT NULL,
	"previous_date" DATE NOT NULL,
	"notes" varchar(1000),
	"notification_sent" BOOLEAN NOT NULL DEFAULT 'false',
	"complete_care" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT care_history_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "reminder_settings" (
	"id" serial NOT NULL,
	"vet_id" integer NOT NULL,
	"reminder_window" integer NOT NULL,
	"reminder_days" varchar(200),
	"start_time" TIMESTAMP,
	"stagger_time" integer,
	"stagger_time" integer,
	"auto_send" BOOLEAN DEFAULT 'false',
	"message" varchar(200) DEFAULT 'false',
	CONSTRAINT reminder_settings_pk PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "pet_owners" ADD CONSTRAINT "pet_owners_fk0" FOREIGN KEY ("vet_id") REFERENCES "vets"("id");

ALTER TABLE "pets" ADD CONSTRAINT "pets_fk0" FOREIGN KEY ("owner_id") REFERENCES "pet_owners"("id");


ALTER TABLE "care_history" ADD CONSTRAINT "care_history_fk0" FOREIGN KEY ("pet_id") REFERENCES "pets"("id");
ALTER TABLE "care_history" ADD CONSTRAINT "care_history_fk1" FOREIGN KEY ("care_type_id") REFERENCES "care_type"("id");

ALTER TABLE "reminder_settings" ADD CONSTRAINT "reminder_settings_fk0" FOREIGN KEY ("vet_id") REFERENCES "vets"("id");

