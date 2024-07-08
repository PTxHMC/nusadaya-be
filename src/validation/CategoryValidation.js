import Joi from "joi";

const categoryValidation = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.min": "nama kategori minimal 3 karakter",
    "string.max": "nama kategori maksimal 30 karakter",
    "string.empty": "nama kategori tidak boleh kosong",
    "any.required": "nama kategori wajib diisi",
  }),
});

export { categoryValidation };
