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
    courseId: Joi.string().hex().length(24),
  };
  return Joi.validate(student, schema);
};

export const validateUpdatedStudent = (student) => {
  const schema = {
    name: Joi.string().min(3),
    courseId: Joi.string().hex().length(24),
  };
  return Joi.validate(student, schema);
};
