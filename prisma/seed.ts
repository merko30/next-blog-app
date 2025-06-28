import prisma from "../prisma";

async function main() {
  const categories = [
    { name: "Technology" },
    { name: "Programming" },
    { name: "Design" },
    { name: "Business" },
    { name: "Lifestyle" },
    { name: "Travel" },
    { name: "Health" },
    { name: "Education" },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { id: 0 }, // id: 0 will never match, so always create
      update: {},
      create: category,
    });
  }

  console.log("Categories seeded!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
