import { envVariable } from "../constant.js";

export const checkAuth = (req, res, next) => {
  if (req.headers["authkey"] === envVariable().SECRET_AUTH_KEY) next();
  else {
    res.status(401).send("You are not authorize person");
  }
};
