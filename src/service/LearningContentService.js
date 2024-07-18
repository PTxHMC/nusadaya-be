import prisma from "../db/index.js";
import uploads from "../middleware/UploadImage.js";
import {
  learningContentValidation,
  updateLearningContentValidation,
} from "../validation/LearningContentValidation.js";
import validate from "../validation/validation.js";

const getLearningContents = async (page, limit, search) => {
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [totalItems, contents] = await prisma.$transaction([
    prisma.learning_Content.count({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
    }),
    prisma.learning_Content.findMany({
      where: {
        title: {
          contains: search,
          mode: "insensitive",
        },
      },
      include: {
        learning_content_categories: { include: { category: true } },
        user: true,
      },
      skip: skip,
      take: limitNumber,
    }),
  ]);

  const result = contents.map((content) => ({
    id: content.id,
    title: content.title,
    thumbnail: content.thumbnail,
    user: content.user.username,
    categories: content.learning_content_categories.map(
      (listCategory) => listCategory.category.name
    ),
  }));

  const totalPage = Math.ceil(totalItems / limitNumber);

  return { totalPage, totalItems, pageNumber, limitNumber, result };
};

const getMyLearningContents = async (page, limit, userId) => {
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const [totalItems, contents] = await prisma.$transaction([
    prisma.learning_Content.count({ where: { userId } }),
    prisma.learning_Content.findMany({
      where: { userId },
      include: {
        learning_content_categories: { include: { category: true } },
        user: true,
      },
      skip: skip,
      take: limitNumber,
    }),
  ]);

  const result = contents.map((content) => ({
    id: content.id,
    title: content.title,
    thumbnail: content.thumbnail,
    user: content.user.username,
    categories: content.learning_content_categories.map(
      (listCategory) => listCategory.category.name
    ),
  }));

  const totalPage = Math.ceil(totalItems / limitNumber);

  return { totalPage, totalItems, pageNumber, limitNumber, result };
};

const getLearningContentById = async (id) => {
  const idContent = parseInt(id);

  const learningContent = await prisma.learning_Content.findFirst({
    where: {
      id: idContent,
    },
    include: {
      learning_content_categories: { include: { category: true } },
      user: true,
    },
  });

  if (!learningContent) throw new Error("Data tidak ditemukan");

  const result = {
    id: learningContent.id,
    title: learningContent.title,
    content: learningContent.content,
    thumbnail: learningContent.thumbnail,
    user: learningContent.user.username,
    categories: learningContent.learning_content_categories.map(
      (listCategory) => listCategory.category.name
    ),
    created_at: learningContent.createdAt,
  };

  return result;
};

const createLearningContent = async (userId, data, image_path) => {
  const newData = validate(learningContentValidation, data);

  const categories = newData.categories ? newData.categories.map(Number) : [];

  const thumbnail = image_path
    ? await uploads(image_path, "nusadaya-media")
    : null;

  const learningContent = await prisma.learning_Content.create({
    data: {
      title: newData.title,
      content: newData.content,
      thumbnail,
      userId,
      learning_content_categories: {
        create: categories.map((categoryId) => ({
          category: {
            connect: { id: categoryId },
          },
        })),
      },
    },
    include: {
      learning_content_categories: { include: { category: true } },
      user: true,
    },
  });

  const result = {
    id: learningContent.id,
    title: learningContent.title,
    content: learningContent.content,
    thumbnail: learningContent.thumbnail,
    user: learningContent.user.username,
    categories: learningContent.learning_content_categories.map(
      (listCategory) => listCategory.category.name
    ),
  };

  return result;
};

const updateLearningContent = async (userId, contentId, data, image_path) => {
  const idNumber = parseInt(contentId);
  const newData = validate(updateLearningContentValidation, data);

  const existContent = await prisma.learning_Content.findFirst({
    where: {
      id: idNumber,
      userId,
    },
  });

  if (!existContent) {
    throw new Error("Konten pembelajaran tidak ditemukan");
  }

  const categories = newData.categories ? newData.categories.map(Number) : [];

  const thumbnail = image_path
    ? await uploads(image_path, "nusadaya-media")
    : null;

  await prisma.learning_Content_Categories.deleteMany({
    where: { learning_content_id: idNumber },
  });

  const updateData = {
    title: newData.title,
    content: newData.content,
    learning_content_categories: {
      create: categories.map((categoryId) => ({
        category: {
          connect: { id: categoryId },
        },
      })),
    },
  };

  // Hanya tambahkan thumbnail jika ada nilainya
  if (thumbnail) {
    updateData.thumbnail = thumbnail;
  }

  const learningContent = await prisma.learning_Content.update({
    where: {
      id: idNumber,
    },
    data: updateData,
    include: {
      learning_content_categories: { include: { category: true } },
      user: true,
    },
  });

  const result = {
    id: learningContent.id,
    title: learningContent.title,
    content: learningContent.content,
    thumbnail: learningContent.thumbnail,
    user: learningContent.user.username,
    categories: learningContent.learning_content_categories.map(
      (listCategory) => listCategory.category.name
    ),
  };

  return result;
};

const deleteLearningContent = async (contentId, userId) => {
  const idNumber = parseInt(contentId);

  const existContent = await prisma.learning_Content.findFirst({
    where: {
      id: idNumber,
      userId: userId,
    },
  });

  if (!existContent) {
    throw new Error("Konten pembelajaran tidak ditemukan");
  }

  await prisma.learning_Content.delete({
    where: {
      id: idNumber,
    },
  });

  return "OK";
};

export default {
  createLearningContent,
  getLearningContents,
  getMyLearningContents,
  getLearningContentById,
  updateLearningContent,
  deleteLearningContent,
};
