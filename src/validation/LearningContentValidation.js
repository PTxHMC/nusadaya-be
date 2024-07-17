import Joi from "joi";

const learningContentValidation = Joi.object({
  title: Joi.string().min(3).max(255).required().messages({
    "string.min": "judul minimal 3 karakter",
    "string.max": "judul maksimal 255 karakter",
    "string.empty": "judul tidak boleh kosong",
    "any.required": "judul wajib diisi",
  }),
  content: Joi.string().required().messages({
    "string.empty": "isi konten tidak boleh kosong",
    "any.required": "isi konten wajib diisi",
  }),
  thumbnail: Joi.string(),
  categories: Joi.array(),
});

const updateLearningContentValidation = Joi.object({
  title: Joi.string().min(3).max(255).messages({
    "string.min": "judul minimal 3 karakter",
    "string.max": "judul maksimal 255 karakter",
    "string.empty": "judul tidak boleh kosong",
  }),
  content: Joi.string().messages({
    "string.empty": "isi konten tidak boleh kosong",
  }),
  thumbnail: Joi.string(),
  categories: Joi.array(),
});

export { learningContentValidation, updateLearningContentValidation };
