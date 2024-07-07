const validate = (schema, req) => {
  const result = schema.validate(req, { abortEarly: false });
  if (result.error) {
    const errorMessage = result.error.details.map((detail) => detail.message);
    throw new Error(errorMessage);
  } else {
    return result.value;
  }
};

export default validate;
