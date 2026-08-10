-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- Enable spatial queries for place discovery and radius filtering.
CREATE EXTENSION IF NOT EXISTS postgis;

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('ACTIVE', 'LOCKED', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."PreferenceSource" AS ENUM ('ONBOARDING', 'EXPLICIT', 'LEARNED');

-- CreateEnum
CREATE TYPE "public"."PlaceProvider" AS ENUM ('INTERNAL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "public"."PlaceStatus" AS ENUM ('DRAFT', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "public"."IndoorOutdoor" AS ENUM ('INDOOR', 'OUTDOOR', 'MIXED');

-- CreateEnum
CREATE TYPE "public"."ReviewStatus" AS ENUM ('PUBLISHED', 'HIDDEN', 'DELETED');

-- CreateEnum
CREATE TYPE "public"."PlanType" AS ENUM ('PERSONAL', 'GROUP', 'SURPRISE');

-- CreateEnum
CREATE TYPE "public"."PlanStatus" AS ENUM ('DRAFT', 'GENERATED', 'FINALIZED', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "public"."TravelMode" AS ENUM ('WALK', 'BIKE', 'DRIVE', 'TRANSIT');

-- CreateEnum
CREATE TYPE "public"."PlanItemSource" AS ENUM ('GENERATED', 'MANUAL', 'REPLACED');

-- CreateEnum
CREATE TYPE "public"."FeedbackType" AS ENUM ('LOVED', 'OKAY', 'DISLIKED', 'SKIP', 'REPLACE', 'VISITED');

-- CreateEnum
CREATE TYPE "public"."AiInteractionType" AS ENUM ('EXTRACT', 'EXPLAIN', 'MODIFY');

-- CreateEnum
CREATE TYPE "public"."InteractionStatus" AS ENUM ('SUCCESS', 'FAILED', 'FALLBACK');

-- CreateEnum
CREATE TYPE "public"."EventStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" UUID NOT NULL,
    "email" VARCHAR(320) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "public"."UserRole" NOT NULL DEFAULT 'USER',
    "status" "public"."UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "email_verified_at" TIMESTAMPTZ(6),
    "last_login_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_profiles" (
    "user_id" UUID NOT NULL,
    "display_name" VARCHAR(100) NOT NULL,
    "avatar_url" TEXT,
    "phone" VARCHAR(30),
    "home_latitude" DECIMAL(9,6),
    "home_longitude" DECIMAL(9,6),
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    "locale" VARCHAR(10) NOT NULL DEFAULT 'vi-VN',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."user_sessions" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "refresh_token_hash" VARCHAR(255) NOT NULL,
    "user_agent" TEXT,
    "ip_hash" VARCHAR(128),
    "expires_at" TIMESTAMPTZ(6) NOT NULL,
    "revoked_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "icon" VARCHAR(100),
    "description" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_preferences" (
    "user_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "weight" DECIMAL(5,4) NOT NULL DEFAULT 1,
    "source" "public"."PreferenceSource" NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "user_preferences_pkey" PRIMARY KEY ("user_id","category_id")
);

-- CreateTable
CREATE TABLE "public"."places" (
    "id" UUID NOT NULL,
    "provider" "public"."PlaceProvider" NOT NULL DEFAULT 'INTERNAL',
    "provider_place_id" VARCHAR(255),
    "name" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "description" TEXT,
    "address" TEXT NOT NULL,
    "district" VARCHAR(100),
    "city" VARCHAR(100) NOT NULL,
    "country_code" CHAR(2) NOT NULL,
    "latitude" DECIMAL(9,6) NOT NULL,
    "longitude" DECIMAL(9,6) NOT NULL,
    "rating" DECIMAL(3,2),
    "review_count" INTEGER NOT NULL DEFAULT 0,
    "price_min" BIGINT,
    "price_max" BIGINT,
    "typical_duration_minutes" INTEGER,
    "indoor_outdoor" "public"."IndoorOutdoor" NOT NULL,
    "popularity_score" DECIMAL(5,4) NOT NULL DEFAULT 0,
    "status" "public"."PlaceStatus" NOT NULL DEFAULT 'DRAFT',
    "provider_payload" JSONB,
    "last_synced_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."place_categories" (
    "place_id" UUID NOT NULL,
    "category_id" UUID NOT NULL,
    "relevance" DECIMAL(5,4) NOT NULL DEFAULT 1,

    CONSTRAINT "place_categories_pkey" PRIMARY KEY ("place_id","category_id")
);

-- CreateTable
CREATE TABLE "public"."place_images" (
    "id" UUID NOT NULL,
    "place_id" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "attribution" TEXT,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_cover" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "place_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."place_opening_hours" (
    "id" UUID NOT NULL,
    "place_id" UUID NOT NULL,
    "day_of_week" SMALLINT NOT NULL,
    "open_time" TIME(0),
    "close_time" TIME(0),
    "is_closed" BOOLEAN NOT NULL DEFAULT false,
    "valid_from" DATE,
    "valid_to" DATE,

    CONSTRAINT "place_opening_hours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."favorites" (
    "user_id" UUID NOT NULL,
    "place_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorites_pkey" PRIMARY KEY ("user_id","place_id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "place_id" UUID NOT NULL,
    "rating" SMALLINT NOT NULL,
    "content" TEXT,
    "status" "public"."ReviewStatus" NOT NULL DEFAULT 'PUBLISHED',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plans" (
    "id" UUID NOT NULL,
    "owner_user_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "plan_type" "public"."PlanType" NOT NULL DEFAULT 'PERSONAL',
    "status" "public"."PlanStatus" NOT NULL DEFAULT 'DRAFT',
    "timezone" VARCHAR(50) NOT NULL DEFAULT 'Asia/Ho_Chi_Minh',
    "start_time" TIMESTAMPTZ(6) NOT NULL,
    "end_time" TIMESTAMPTZ(6) NOT NULL,
    "people_count" INTEGER NOT NULL,
    "budget" BIGINT,
    "currency" CHAR(3) NOT NULL DEFAULT 'VND',
    "start_latitude" DECIMAL(9,6),
    "start_longitude" DECIMAL(9,6),
    "max_travel_radius_meters" INTEGER,
    "input_text" TEXT,
    "constraints" JSONB NOT NULL,
    "estimated_cost" BIGINT NOT NULL DEFAULT 0,
    "estimated_distance_meters" INTEGER NOT NULL DEFAULT 0,
    "estimated_travel_minutes" INTEGER NOT NULL DEFAULT 0,
    "match_score" DECIMAL(5,4),
    "version" INTEGER NOT NULL DEFAULT 1,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plan_items" (
    "id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "place_id" UUID NOT NULL,
    "order_index" INTEGER NOT NULL,
    "start_time" TIMESTAMPTZ(6) NOT NULL,
    "end_time" TIMESTAMPTZ(6) NOT NULL,
    "estimated_cost" BIGINT NOT NULL DEFAULT 0,
    "travel_mode" "public"."TravelMode",
    "travel_distance_meters" INTEGER NOT NULL DEFAULT 0,
    "travel_duration_minutes" INTEGER NOT NULL DEFAULT 0,
    "match_score" DECIMAL(5,4),
    "recommendation_reason" TEXT,
    "weather_snapshot" JSONB,
    "source" "public"."PlanItemSource" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "plan_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."plan_shares" (
    "id" UUID NOT NULL,
    "plan_id" UUID NOT NULL,
    "token_hash" VARCHAR(255) NOT NULL,
    "expires_at" TIMESTAMPTZ(6),
    "revoked_at" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plan_shares_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."user_feedbacks" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "plan_id" UUID,
    "plan_item_id" UUID,
    "place_id" UUID,
    "feedback_type" "public"."FeedbackType" NOT NULL,
    "rating" SMALLINT,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_feedbacks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ai_interactions" (
    "id" UUID NOT NULL,
    "user_id" UUID,
    "plan_id" UUID,
    "interaction_type" "public"."AiInteractionType" NOT NULL,
    "provider" VARCHAR(50) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "prompt_version" VARCHAR(50) NOT NULL,
    "input_redacted" JSONB,
    "output_json" JSONB,
    "input_tokens" INTEGER,
    "output_tokens" INTEGER,
    "latency_ms" INTEGER NOT NULL,
    "status" "public"."InteractionStatus" NOT NULL,
    "error_code" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_interactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "id" UUID NOT NULL,
    "place_id" UUID,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "start_time" TIMESTAMPTZ(6) NOT NULL,
    "end_time" TIMESTAMPTZ(6) NOT NULL,
    "price_min" BIGINT,
    "price_max" BIGINT,
    "booking_url" TEXT,
    "status" "public"."EventStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."admin_audit_logs" (
    "id" UUID NOT NULL,
    "admin_user_id" UUID NOT NULL,
    "action" VARCHAR(100) NOT NULL,
    "entity_type" VARCHAR(50) NOT NULL,
    "entity_id" UUID,
    "before_data" JSONB,
    "after_data" JSONB,
    "request_id" VARCHAR(100),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "public"."users"("status");

-- CreateIndex
CREATE INDEX "user_sessions_user_id_expires_at_idx" ON "public"."user_sessions"("user_id", "expires_at");

-- CreateIndex
CREATE INDEX "user_sessions_expires_at_idx" ON "public"."user_sessions"("expires_at");

-- CreateIndex
CREATE UNIQUE INDEX "categories_slug_key" ON "public"."categories"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "places_slug_key" ON "public"."places"("slug");

-- CreateIndex
CREATE INDEX "places_city_status_idx" ON "public"."places"("city", "status");

-- CreateIndex
CREATE INDEX "places_rating_idx" ON "public"."places"("rating" DESC);

-- CreateIndex
CREATE INDEX "places_price_min_price_max_idx" ON "public"."places"("price_min", "price_max");

-- CreateIndex
CREATE UNIQUE INDEX "places_provider_provider_place_id_key" ON "public"."places"("provider", "provider_place_id");

-- CreateIndex
CREATE INDEX "place_categories_category_id_place_id_idx" ON "public"."place_categories"("category_id", "place_id");

-- CreateIndex
CREATE INDEX "place_images_place_id_sort_order_idx" ON "public"."place_images"("place_id", "sort_order");

-- CreateIndex
CREATE INDEX "place_opening_hours_place_id_day_of_week_idx" ON "public"."place_opening_hours"("place_id", "day_of_week");

-- CreateIndex
CREATE INDEX "reviews_place_id_created_at_idx" ON "public"."reviews"("place_id", "created_at" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "reviews_user_id_place_id_key" ON "public"."reviews"("user_id", "place_id");

-- CreateIndex
CREATE INDEX "plans_owner_user_id_created_at_idx" ON "public"."plans"("owner_user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "plans_status_start_time_idx" ON "public"."plans"("status", "start_time");

-- CreateIndex
CREATE INDEX "plan_items_plan_id_start_time_idx" ON "public"."plan_items"("plan_id", "start_time");

-- CreateIndex
CREATE UNIQUE INDEX "plan_items_plan_id_order_index_key" ON "public"."plan_items"("plan_id", "order_index");

-- CreateIndex
CREATE UNIQUE INDEX "plan_shares_token_hash_key" ON "public"."plan_shares"("token_hash");

-- CreateIndex
CREATE INDEX "plan_shares_plan_id_idx" ON "public"."plan_shares"("plan_id");

-- CreateIndex
CREATE INDEX "user_feedbacks_user_id_created_at_idx" ON "public"."user_feedbacks"("user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "ai_interactions_user_id_created_at_idx" ON "public"."ai_interactions"("user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "ai_interactions_status_created_at_idx" ON "public"."ai_interactions"("status", "created_at");

-- CreateIndex
CREATE INDEX "events_start_time_end_time_idx" ON "public"."events"("start_time", "end_time");

-- CreateIndex
CREATE INDEX "admin_audit_logs_admin_user_id_created_at_idx" ON "public"."admin_audit_logs"("admin_user_id", "created_at" DESC);

-- CreateIndex
CREATE INDEX "admin_audit_logs_entity_type_entity_id_idx" ON "public"."admin_audit_logs"("entity_type", "entity_id");

-- AddForeignKey
ALTER TABLE "public"."user_profiles" ADD CONSTRAINT "user_profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_sessions" ADD CONSTRAINT "user_sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_preferences" ADD CONSTRAINT "user_preferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_preferences" ADD CONSTRAINT "user_preferences_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."place_categories" ADD CONSTRAINT "place_categories_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."place_categories" ADD CONSTRAINT "place_categories_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."place_images" ADD CONSTRAINT "place_images_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."place_opening_hours" ADD CONSTRAINT "place_opening_hours_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorites" ADD CONSTRAINT "favorites_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."favorites" ADD CONSTRAINT "favorites_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plans" ADD CONSTRAINT "plans_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plan_items" ADD CONSTRAINT "plan_items_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plan_items" ADD CONSTRAINT "plan_items_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."plan_shares" ADD CONSTRAINT "plan_shares_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_feedbacks" ADD CONSTRAINT "user_feedbacks_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_feedbacks" ADD CONSTRAINT "user_feedbacks_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_feedbacks" ADD CONSTRAINT "user_feedbacks_plan_item_id_fkey" FOREIGN KEY ("plan_item_id") REFERENCES "public"."plan_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."user_feedbacks" ADD CONSTRAINT "user_feedbacks_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_interactions" ADD CONSTRAINT "ai_interactions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ai_interactions" ADD CONSTRAINT "ai_interactions_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "public"."plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."events" ADD CONSTRAINT "events_place_id_fkey" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."admin_audit_logs" ADD CONSTRAINT "admin_audit_logs_admin_user_id_fkey" FOREIGN KEY ("admin_user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Business constraints not expressible in Prisma schema.
ALTER TABLE "public"."user_preferences"
ADD CONSTRAINT "user_preferences_weight_check" CHECK ("weight" BETWEEN 0 AND 1);

ALTER TABLE "public"."place_categories"
ADD CONSTRAINT "place_categories_relevance_check" CHECK ("relevance" BETWEEN 0 AND 1);

ALTER TABLE "public"."places"
ADD CONSTRAINT "places_coordinates_check" CHECK (
  "latitude" BETWEEN -90 AND 90 AND "longitude" BETWEEN -180 AND 180
),
ADD CONSTRAINT "places_rating_check" CHECK ("rating" IS NULL OR "rating" BETWEEN 0 AND 5),
ADD CONSTRAINT "places_review_count_check" CHECK ("review_count" >= 0),
ADD CONSTRAINT "places_price_check" CHECK (
  ("price_min" IS NULL OR "price_min" >= 0)
  AND ("price_max" IS NULL OR "price_max" >= 0)
  AND ("price_min" IS NULL OR "price_max" IS NULL OR "price_max" >= "price_min")
),
ADD CONSTRAINT "places_duration_check" CHECK (
  "typical_duration_minutes" IS NULL OR "typical_duration_minutes" > 0
),
ADD CONSTRAINT "places_popularity_check" CHECK ("popularity_score" BETWEEN 0 AND 1);

ALTER TABLE "public"."place_opening_hours"
ADD CONSTRAINT "place_opening_hours_day_check" CHECK ("day_of_week" BETWEEN 0 AND 6),
ADD CONSTRAINT "place_opening_hours_value_check" CHECK (
  ("is_closed" AND "open_time" IS NULL AND "close_time" IS NULL)
  OR (NOT "is_closed" AND "open_time" IS NOT NULL AND "close_time" IS NOT NULL)
),
ADD CONSTRAINT "place_opening_hours_validity_check" CHECK (
  "valid_from" IS NULL OR "valid_to" IS NULL OR "valid_to" >= "valid_from"
);

ALTER TABLE "public"."reviews"
ADD CONSTRAINT "reviews_rating_check" CHECK ("rating" BETWEEN 1 AND 5);

ALTER TABLE "public"."plans"
ADD CONSTRAINT "plans_time_check" CHECK ("start_time" < "end_time"),
ADD CONSTRAINT "plans_people_count_check" CHECK ("people_count" >= 1),
ADD CONSTRAINT "plans_budget_check" CHECK ("budget" IS NULL OR "budget" >= 0),
ADD CONSTRAINT "plans_start_coordinates_check" CHECK (
  ("start_latitude" IS NULL AND "start_longitude" IS NULL)
  OR (
    "start_latitude" BETWEEN -90 AND 90
    AND "start_longitude" BETWEEN -180 AND 180
  )
),
ADD CONSTRAINT "plans_radius_check" CHECK (
  "max_travel_radius_meters" IS NULL OR "max_travel_radius_meters" > 0
),
ADD CONSTRAINT "plans_estimates_check" CHECK (
  "estimated_cost" >= 0
  AND "estimated_distance_meters" >= 0
  AND "estimated_travel_minutes" >= 0
),
ADD CONSTRAINT "plans_match_score_check" CHECK (
  "match_score" IS NULL OR "match_score" BETWEEN 0 AND 1
),
ADD CONSTRAINT "plans_version_check" CHECK ("version" >= 1);

ALTER TABLE "public"."plan_items"
ADD CONSTRAINT "plan_items_order_check" CHECK ("order_index" >= 0),
ADD CONSTRAINT "plan_items_time_check" CHECK ("start_time" < "end_time"),
ADD CONSTRAINT "plan_items_estimates_check" CHECK (
  "estimated_cost" >= 0
  AND "travel_distance_meters" >= 0
  AND "travel_duration_minutes" >= 0
),
ADD CONSTRAINT "plan_items_match_score_check" CHECK (
  "match_score" IS NULL OR "match_score" BETWEEN 0 AND 1
);

ALTER TABLE "public"."user_feedbacks"
ADD CONSTRAINT "user_feedbacks_target_check" CHECK (
  "plan_id" IS NOT NULL OR "plan_item_id" IS NOT NULL OR "place_id" IS NOT NULL
),
ADD CONSTRAINT "user_feedbacks_rating_check" CHECK (
  "rating" IS NULL OR "rating" BETWEEN 1 AND 5
);

ALTER TABLE "public"."events"
ADD CONSTRAINT "events_time_check" CHECK ("start_time" < "end_time"),
ADD CONSTRAINT "events_price_check" CHECK (
  ("price_min" IS NULL OR "price_min" >= 0)
  AND ("price_max" IS NULL OR "price_max" >= 0)
  AND ("price_min" IS NULL OR "price_max" IS NULL OR "price_max" >= "price_min")
);

CREATE UNIQUE INDEX "place_images_one_cover_per_place"
ON "public"."place_images"("place_id") WHERE "is_cover" = true;
