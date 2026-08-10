import {
  IndoorOutdoor,
  PlaceProvider,
  PlaceStatus,
  PrismaClient,
} from '@prisma/client';

const prisma = new PrismaClient();

const categories = [
  { slug: 'cafe', name: 'Cafe', icon: 'coffee' },
  { slug: 'food', name: 'Ẩm thực', icon: 'utensils' },
  { slug: 'art', name: 'Nghệ thuật', icon: 'palette' },
  { slug: 'outdoor', name: 'Ngoài trời', icon: 'trees' },
  { slug: 'photography', name: 'Chụp ảnh', icon: 'camera' },
] as const;

async function main() {
  const savedCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.upsert({
        where: { slug: category.slug },
        create: category,
        update: {
          icon: category.icon,
          isActive: true,
          name: category.name,
        },
      }),
    ),
  );

  const cafeCategory = savedCategories.find(
    (category) => category.slug === 'cafe',
  );
  const photographyCategory = savedCategories.find(
    (category) => category.slug === 'photography',
  );

  if (!cafeCategory || !photographyCategory) {
    throw new Error('Required seed categories were not created');
  }

  await prisma.place.upsert({
    where: { slug: 'wanderly-demo-cafe' },
    create: {
      provider: PlaceProvider.INTERNAL,
      name: 'Wanderly Demo Cafe',
      slug: 'wanderly-demo-cafe',
      description: 'Địa điểm seed dùng cho phát triển và kiểm thử local.',
      address: 'Hoàn Kiếm, Hà Nội',
      city: 'Hà Nội',
      countryCode: 'VN',
      latitude: 21.028511,
      longitude: 105.804817,
      rating: 4.7,
      reviewCount: 120,
      priceMin: 50000,
      priceMax: 150000,
      typicalDurationMinutes: 90,
      indoorOutdoor: IndoorOutdoor.MIXED,
      popularityScore: 0.82,
      status: PlaceStatus.ACTIVE,
      categories: {
        create: [
          { categoryId: cafeCategory.id, relevance: 1 },
          { categoryId: photographyCategory.id, relevance: 0.8 },
        ],
      },
    },
    update: {
      status: PlaceStatus.ACTIVE,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
