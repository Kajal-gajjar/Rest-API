import { httpErrorMsg, httpStatusCode } from "../constant.js";
import StudentModel from "../model/studentModel.js";
import jwt from "jsonwebtoken";

//Student Login
const studentLogin = async (req, res) => {
  const student = await StudentModel.findOne({ email: req.body.email });
  if (!student)
    return res
      .status(httpStatusCode.NOT_FOUND)
      .send(httpErrorMsg.STUDENT_NOT_FOUND_EMAIL);

  if (!student.validPassword(req.body.password)) {
    res.send("Usename or password is invalid!!");
  } else {
    const token = jwt.sign(
      { user_id: student._id, email: student.email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    res.status(httpStatusCode.SUCCESS).send({ token });
  }
};

export default {
  studentLogin,
};
