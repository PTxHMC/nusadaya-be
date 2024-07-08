import prisma from "../src/db/index.js";

const main = async () => {
  const category = [
    { name: "Seni" },
    { name: "Bahasa" },
    { name: "Adat" },
    { name: "Kuliner" },
    { name: "Warisan Budaya" },
    { name: "Pakaian" },
    { name: "Permainan" },
  ];

  await prisma.category.createMany({
    data: category,
  });
};

main()
  .then(() => {
    console.log("seeding complete");
    prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
