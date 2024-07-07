import Joi from "joi";

const Role = Object.freeze({
  USER: "USER",
  TEACHER: "TEACHER",
  ADMIN: "ADMIN",
});

const Gender = Object.freeze({
  MALE: "MALE",
  FEMALE: "FEMALE",
  UNKNOWN: "UNKNOWN",
});

const registerValidation = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.min": "username minimal 3 karakter",
    "string.max": "username maksimal 30 karakter",
    "string.empty": "username tidak boleh kosong",
    "any.required": "username wajib diisi",
  }),
  email: Joi.string().max(254).email().required().messages({
    "string.email": "format email harus valid",
    "string.max": "email maksimal 254 karakter",
    "string.empty": "email tidak boleh kosong",
    "any.required": "email wajib diisi",
  }),
  password: Joi.string().min(6).max(255).messages({
    "string.min": "password minimal 6 karakter",
    "string.max": "password maksimal 255 karakter",
    "string.empty": "password tidak boleh kosong",
    "any.required": "password wajib diisi",
  }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "password dan konfirmasi password harus sama",
      "string.empty": "konfirmasi password tidak boleh kosong",
      "any.required": "konfirmasi password wajib diisi",
    }),
  role: Joi.string()
    .valid(...Object.values(Role))
    .messages({
      "any.only": "Role harus salah satu dari {{#valids}}",
    }),
});

const resetPasswordValidation = Joi.object({
  password: Joi.string().min(6).max(255).messages({
    "string.min": "password minimal 6 karakter",
    "string.max": "password maksimal 255 karakter",
    "string.empty": "password tidak boleh kosong",
    "any.required": "password wajib diisi",
  }),
  confirm_password: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "password dan konfirmasi password harus sama",
      "string.empty": "konfirmasi password tidak boleh kosong",
      "any.required": "konfirmasi password wajib diisi",
    }),
});

const profileValidation = Joi.object({
  full_name: Joi.string().min(3).max(255).messages({
    "string.min": "username minimal 3 karakter",
    "string.max": "username maksimal 30 karakter",
  }),
  gender: Joi.string()
    .valid(...Object.values(Gender))
    .messages({
      "any.only": "Jenis kelamin harus salah satu dari {{#valids}}",
    }),
  profile_picture: Joi.string().allow(''),
});

export { registerValidation, resetPasswordValidation, profileValidation };
