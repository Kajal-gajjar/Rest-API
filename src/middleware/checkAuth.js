import { envVariable, httpErrorMsg, httpStatusCode } from "../constant.js";
import jwt from "jsonwebtoken";

export const checkAuth = (req, res, next) => {
  if (req.headers["authkey"] === envVariable().SECRET_AUTH_KEY) next();
  else {
    res.status(401).send("You are not authorize person");
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res
      .status(httpStatusCode.FORBIDDEN_ERROR)
      .send(httpErrorMsg.FORBIDDEN_TOKEN_ERROR_MSG);
  } else {
    try {
      const decoded = jwt.verify(token, envVariable().TOKEN_KEY);
      req.student = decoded;
      next();
    } catch {
      return res.status(401).send("Invalid Token");
    }
  }
};
