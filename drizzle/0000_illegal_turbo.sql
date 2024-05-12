DO $$ BEGIN
 CREATE TYPE "public"."pix_key_type" AS ENUM('CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'CHAVE_ALEATORIA');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."receiver_status" AS ENUM('VALID', 'DRAFT');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "receivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" varchar(250) NOT NULL,
	"document" varchar(14) NOT NULL,
	"status" "receiver_status" DEFAULT 'DRAFT' NOT NULL,
	"pix_key_type" "pix_key_type" NOT NULL,
	"pix_key" varchar(140) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
