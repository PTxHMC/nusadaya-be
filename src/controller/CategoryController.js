import CategoryService from "../service/CategoryService.js";
import { createPaginationResponse, createResponse } from "../utils/CreateResponse.js";

const createCategory = async (req, res) => {
  try {
    const data = req.body;

    const category = await CategoryService.createCategory(data);

    const responseData = createResponse(
      "Berhasil menambahkan kategori",
      category
    );

    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const categories = await CategoryService.getCategories(page, limit);

    const pagination = createPaginationResponse(
      categories.totalItems,
      categories.totalPage,
      categories.pageNumber,
      categories.limitNumber
    );

    const dataResponse = createResponse(
      "Berhasil Mengambil Data",
      categories.categories,
      pagination
    );

    res.status(200).json(dataResponse);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const category = await CategoryService.updateCategory(id, data);

    const responseData = createResponse(
      "Berhasil mengupdate kategori",
      category
    );

    res.status(201).json(responseData);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const category = await CategoryService.deleteCategory(id);

    res.status(200).json({ message: category });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
