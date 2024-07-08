import prisma from "../src/db/index.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const salt = await bcrypt.genSalt();
const hashPassword = await bcrypt.hash("password", salt);

const main = async () => {
  const users = Array.from({ length: 20 }).map(() => ({
    username: faker.person.firstName(),
    email: faker.internet.email(),
    password: hashPassword,
  }));

  await prisma.user.createMany({
    data: users,
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
