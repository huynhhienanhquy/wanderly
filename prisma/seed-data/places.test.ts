import assert from 'node:assert/strict';
import test from 'node:test';
import { categorySeeds, placeSeeds } from './places';

test('demo seed identifiers and category references are valid', () => {
  const categorySlugs = new Set(categorySeeds.map(({ slug }) => slug));
  assert.equal(categorySlugs.size, categorySeeds.length);
  assert.equal(
    new Set(placeSeeds.map(({ slug }) => slug)).size,
    placeSeeds.length,
  );
  for (const place of placeSeeds) {
    assert.match(place.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    assert.ok(place.categories.length > 0);
    for (const category of place.categories) {
      assert.ok(
        categorySlugs.has(
          category.slug as (typeof categorySeeds)[number]['slug'],
        ),
      );
      assert.ok(category.relevance >= 0 && category.relevance <= 1);
    }
  }
});

test('demo places satisfy database numeric constraints', () => {
  for (const place of placeSeeds) {
    assert.ok(place.latitude >= -90 && place.latitude <= 90);
    assert.ok(place.longitude >= -180 && place.longitude <= 180);
    assert.ok(place.rating >= 0 && place.rating <= 5);
    assert.ok(place.priceMin >= 0 && place.priceMax >= place.priceMin);
    assert.ok(place.durationMinutes > 0);
    assert.ok(place.popularityScore >= 0 && place.popularityScore <= 1);
  }
});
