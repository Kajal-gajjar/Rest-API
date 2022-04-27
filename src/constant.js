export const httpStatusCode = {
  NOT_FOUND: 404,
  SUCCESS: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER: 500,
};

export const httpErrorMsg = {
  COURSE_NOT_FOUND_MSG: "The course for requested ID is not found",
  STUDENT_NOT_FOUND_MSG: "The student for requested ID is not found",
};

export const envVariable = () => {
  return { SECRET_AUTH_KEY: process.env.SECRET_AUTH_KEY };
};
