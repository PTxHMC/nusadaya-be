import prisma from "../db/index.js";
import { categoryValidation } from "../validation/CategoryValidation.js";
import validate from "../validation/validation.js";

const createCategory = async (data) => {
  const newData = validate(categoryValidation, data);

  const existCategory = await prisma.category.findFirst({
    where: {
      name: newData.name,
    },
  });

  if (existCategory) {
    throw new Error("Kategori sudah ada");
  }

  const category = await prisma.category.create({
    data: {
      name: newData.name,
    },
  });

  return category;
};

const getCategories = async (page, limit) => {
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [totalItems, categories] = await prisma.$transaction([
    prisma.category.count(),
    prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
      skip: skip,
      take: limitNumber,
    }),
  ]);

  const totalPage = Math.ceil(totalItems / limitNumber);

  return { totalPage, totalItems, pageNumber, limitNumber, categories };
};

const updateCategory = async (id, data) => {
  const idNumber = parseInt(id);
  const newData = validate(categoryValidation, data);

  const existCategory = await prisma.category.findFirst({
    where: {
      id: idNumber,
    },
  });

  if (!existCategory) {
    throw new Error("Kategori tidak ditemukan");
  }

  const existCategoryName = await prisma.category.findFirst({
    where: {
      name: newData.name,
    },
  });

  if (existCategoryName) {
    throw new Error("Nama kategori sudah ada");
  }

  const category = await prisma.category.update({
    data: {
      name: newData.name,
    },
    where: {
      id: idNumber,
    },
  });

  return category;
};

const deleteCategory = async (id) => {
  const idNumber = parseInt(id);

  const existCategory = await prisma.category.findFirst({
    where: {
      id: idNumber,
    },
  });

  if (!existCategory) {
    throw new Error("Kategori tidak ditemukan");
  }

  await prisma.category.delete({
    where: {
      id: idNumber,
    },
  });

  return "OK";
};

export default {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
