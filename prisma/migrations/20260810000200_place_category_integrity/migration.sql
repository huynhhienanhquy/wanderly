CREATE INDEX "categories_is_active_name_idx"
ON "public"."categories"("is_active", "name");

CREATE INDEX "places_provider_last_synced_at_idx"
ON "public"."places"("provider", "last_synced_at");

ALTER TABLE "public"."categories"
ADD CONSTRAINT "categories_slug_format_check"
CHECK ("slug" ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$');

ALTER TABLE "public"."places"
ADD CONSTRAINT "places_slug_format_check"
CHECK ("slug" ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
ADD CONSTRAINT "places_country_code_check"
CHECK ("country_code" ~ '^[A-Z]{2}$');
