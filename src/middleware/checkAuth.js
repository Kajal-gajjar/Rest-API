export const checkAuth = (req, res, next) => {
  if (req.headers["authkey"] === "12345") next();
  else {
    res.status(401).send("You are not authorize person");
  }
};
