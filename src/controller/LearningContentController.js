import LearningContentService from "../service/LearningContentService.js";
import {
  createPaginationResponse,
  createResponse,
} from "../utils/CreateResponse.js";

const getLearningContents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const learningContent = await LearningContentService.getLearningContents(
      page,
      limit
    );

    const pagination = createPaginationResponse(
      learningContent.totalItems,
      learningContent.totalPage,
      learningContent.pageNumber,
      learningContent.limitNumber
    );

    const responseData = createResponse(
      "Data berhasil ditemukan",
      learningContent.result,
      pagination
    );

    res.status(200).json(responseData);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getMyLearningContents = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const id = req.id

    const learningContent = await LearningContentService.getMyLearningContents(
      page,
      limit,
      id
    );

    const pagination = createPaginationResponse(
      learningContent.totalItems,
      learningContent.totalPage,
      learningContent.pageNumber,
      learningContent.limitNumber
    );

    const responseData = createResponse(
      "Data berhasil ditemukan",
      learningContent.result,
      pagination
    );

    res.status(200).json(responseData);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

const getLearningContentById = async (req, res) => {
  try {
    const id = req.params.id;
    const learningContent = await LearningContentService.getLearningContentById(
      id
    );

    const responseData = createResponse(
      "Data berhasil ditemukan",
      learningContent
    );

    res.status(200).json(responseData);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const createLearningContent = async (req, res) => {
  try {
    const userId = req.id;
    const data = req.body;
    const image_path = req.file ? req.file.path : null;

    const learningContent = await LearningContentService.createLearningContent(
      userId,
      data,
      image_path
    );

    const responseData = createResponse(
      "Berhasil menambah materi",
      learningContent
    );

    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateLearningContent = async (req, res) => {
  try {
    const userId = req.id;
    const data = req.body;
    const image_path = req.file ? req.file.path : null;
    const contentId = req.params.id;

    const learningContent = await LearningContentService.updateLearningContent(
      userId,
      contentId,
      data,
      image_path
    );

    const responseData = createResponse(
      "Berhasil mengupdate materi",
      learningContent
    );

    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteLearningContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const userId = req.id;

    const learningContent = await LearningContentService.deleteLearningContent(
      contentId,
      userId
    );

    res.status(200).json({ message: learningContent });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

export default {
  createLearningContent,
  getLearningContents,
  getMyLearningContents,
  getLearningContentById,
  updateLearningContent,
  deleteLearningContent,
};
