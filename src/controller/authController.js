import { httpErrorMsg, httpStatusCode } from "../constant.js";
import StudentModel from "../model/studentModel.js";
import jwt from "jsonwebtoken";
import { validateEmail, validateStudent } from "../middleware/validator.js";
import mongoose from "mongoose";

//Student Login
const studentLogin = async (req, res) => {
  const student = await StudentModel.findOne({ email: req.body.email });
  if (!student)
    return res
      .status(httpStatusCode.NOT_FOUND)
      .send(httpErrorMsg.STUDENT_NOT_FOUND_EMAIL);

  if (!student.validPassword(req.body.password))
    return res.send("Usename or password is invalid!!");

  const token = jwt.sign(
    { user_id: student._id, email: student.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  res.status(httpStatusCode.SUCCESS).send({ token });
};

//add new record of student
const addStudent = async (req, res) => {
  const { error } = validateStudent(req.body);
  if (!validateEmail(req.body.email))
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .send(httpErrorMsg.INVALID_MAIL);

  if (error)
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .send(error.details[0].message);

  const { email } = req.body;
  const student = await StudentModel.findOne({ email });
  if (student) {
    return res
      .status(httpStatusCode.FORBIDDEN_ERROR)
      .send(httpErrorMsg.DUPLICATE_EMAIL);
  }

  const newStudent = new StudentModel({
    name: req.body.name,
    email: req.body.email,
    courseId: req.body.courseId.map((x) => mongoose.Types.ObjectId(x)),
  });

  newStudent.password = newStudent.generateHash(req.body.password);
  // Create token
  const token = jwt.sign(
    { user_id: newStudent._id, email: newStudent.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  // save user token
  newStudent.save(function (err) {
    if (err) res.send(err);
  });
  res.send({ ...newStudent._doc, token });
};

export default {
  studentLogin,
  addStudent,
};
