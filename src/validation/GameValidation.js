import Joi from "joi";

const gameValidation = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string(),
  type: Joi.number().required(),
  content: Joi.object(),
  thumbnail: Joi.string(),
});

export { gameValidation };
