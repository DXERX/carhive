CREATE TABLE IF NOT EXISTS "bookings" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "bookings_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"user_id" text NOT NULL,
	"car_id" integer NOT NULL,
	"car_name" text NOT NULL,
	"car_image_url" text,
	"full_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"whatsapp" text,
	"pickup_location" text NOT NULL,
	"checkin_date" timestamp NOT NULL,
	"checkout_date" timestamp NOT NULL,
	"total_price" numeric(10, 2) NOT NULL,
	"currency" text DEFAULT 'usd' NOT NULL,
	"notes" text,
	"status" text DEFAULT 'pending' NOT NULL,
	"ip_address" text,
	"country" text,
	"city" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "bookings" ADD CONSTRAINT "bookings_car_id_cars_id_fk" FOREIGN KEY ("car_id") REFERENCES "public"."cars"("id") ON DELETE no action ON UPDATE no action;
