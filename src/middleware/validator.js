import Joi from "joi";

export const validateCourse = (course) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
};

export const validateStudent = (student) => {
  const schema = {
    name: Joi.string().min(3).required(),
    courseId: Joi.string().hex().length(24).required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    token: Joi.string(),
  };
  return Joi.validate(student, schema);
};

export const validateEmail = (email) => {
  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return emailRegexp.test(email);
};

export const validateUpdatedStudent = (student) => {
  const schema = {
    name: Joi.string().min(3),
    courseId: Joi.string().hex().length(24),
  };
  return Joi.validate(student, schema);
};
