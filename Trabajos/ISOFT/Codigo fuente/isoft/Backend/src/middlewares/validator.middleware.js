export const validate = (validator) => (req, res, next) => {
  try {
    validator.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json(error.errors.map((error) => error.message));
  }
};
