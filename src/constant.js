export const httpStatusCode = {
  NOT_FOUND: 404,
  SUCCESS: 200,
  BAD_REQUEST: 400,
  INTERNAL_SERVER: 500,
  FORBIDDEN_ERROR: 403,
};

export const httpErrorMsg = {
  COURSE_NOT_FOUND_MSG: "The course for requested ID is not found",
  STUDENT_NOT_FOUND_MSG: "The student for requested ID is not found",
  INVALID_MAIL: "The mail Id is not valid",
  STUDENT_NOT_FOUND_EMAIL:
    "Student details for the requested mail Id is not found",
  SUCCESS_LOGIN: "Login is Successful. ",
  FORBIDDEN_TOKEN_ERROR_MSG: "A token is required for authentication",
};

export const envVariable = () => {
  return {
    SECRET_AUTH_KEY: process.env.SECRET_AUTH_KEY,
    TOKEN_KEY: process.env.TOKEN_KEY,
  };
};
