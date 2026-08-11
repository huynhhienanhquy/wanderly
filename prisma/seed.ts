import { PlaceProvider, PlaceStatus, PrismaClient } from '@prisma/client';
import { categorySeeds, placeSeeds } from './seed-data/places';

const prisma = new PrismaClient();
const time = (value: string) => new Date(`1970-01-01T${value}:00.000Z`);

async function seedCategories() {
  return Promise.all(
    categorySeeds.map((category) =>
      prisma.category.upsert({
        where: { slug: category.slug },
        create: category,
        update: { ...category, isActive: true },
      }),
    ),
  );
}

async function seedPlaces(categoryIds: Map<string, string>) {
  for (const seed of placeSeeds) {
    const place = await prisma.place.upsert({
      where: { slug: seed.slug },
      create: {
        provider: PlaceProvider.INTERNAL,
        providerPlaceId: `demo:${seed.slug}`,
        name: seed.name,
        slug: seed.slug,
        description: seed.description,
        address: seed.address,
        district: seed.district,
        city: 'Hà Nội',
        countryCode: 'VN',
        latitude: seed.latitude,
        longitude: seed.longitude,
        rating: seed.rating,
        reviewCount: seed.reviewCount,
        priceMin: seed.priceMin,
        priceMax: seed.priceMax,
        typicalDurationMinutes: seed.durationMinutes,
        indoorOutdoor: seed.indoorOutdoor,
        popularityScore: seed.popularityScore,
        status: PlaceStatus.ACTIVE,
      },
      update: {
        name: seed.name,
        description: seed.description,
        address: seed.address,
        district: seed.district,
        latitude: seed.latitude,
        longitude: seed.longitude,
        rating: seed.rating,
        reviewCount: seed.reviewCount,
        priceMin: seed.priceMin,
        priceMax: seed.priceMax,
        typicalDurationMinutes: seed.durationMinutes,
        indoorOutdoor: seed.indoorOutdoor,
        popularityScore: seed.popularityScore,
        status: PlaceStatus.ACTIVE,
      },
    });

    const categoryRows = seed.categories.map((category) => {
      const categoryId = categoryIds.get(category.slug);
      if (!categoryId) throw new Error(`Missing category: ${category.slug}`);
      return { placeId: place.id, categoryId, relevance: category.relevance };
    });
    await prisma.$transaction([
      prisma.placeCategory.deleteMany({ where: { placeId: place.id } }),
      prisma.placeCategory.createMany({ data: categoryRows }),
      prisma.placeOpeningHour.deleteMany({ where: { placeId: place.id } }),
      prisma.placeOpeningHour.createMany({
        data: Array.from({ length: 7 }, (_, dayOfWeek) => ({
          placeId: place.id,
          dayOfWeek,
          openTime: time(seed.opening.open),
          closeTime: time(seed.opening.close),
          isClosed: false,
        })),
      }),
    ]);
  }
}

async function main() {
  const categories = await seedCategories();
  await seedPlaces(
    new Map(categories.map((category) => [category.slug, category.id])),
  );
  console.info(
    `Seeded ${categories.length} categories and ${placeSeeds.length} demo places.`,
  );
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
