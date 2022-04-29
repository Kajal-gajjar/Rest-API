import { mapStudent } from "../utils.js";
import { httpErrorMsg, httpStatusCode } from "../constant.js";
import StudentModel from "../model/studentModel.js";
import {
  validateEmail,
  validateStudent,
  validateUpdatedStudent,
} from "../middleware/validator.js";
import CourseModel from "../model/courseModel.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

//get student list
const getStudents = async (req, res) => {
  const values = await StudentModel.aggregate([
    {
      $lookup: {
        from: "coursemodels",
        localField: "courseId",
        foreignField: "_id",
        as: "Course Details",
      },
    },
  ]);

  res.send(values);
};

//get student details by Id
const getStudentDetails = async (req, res) => {
  const {
    student: { user_id },
  } = req;
  const student = await StudentModel.findOne({ _id: user_id });
  if (!student)
    return res
      .status(httpStatusCode.NOT_FOUND)
      .send(httpErrorMsg.STUDENT_NOT_FOUND_MSG);

  const course = await CourseModel.findOne({ _id: student.courseId });
  res.send(mapStudent(student, course));
};

//add new record of student
const addStudent = (req, res) => {
  const { error } = validateStudent(req.body);
  if (!validateEmail(req.body.email))
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .send(httpErrorMsg.INVALID_MAIL);

  if (error)
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .send(error.details[0].message);

  const student = new StudentModel({
    name: req.body.name,
    email: req.body.email,
    courseId: mongoose.Types.ObjectId(req.body.courseId),
  });

  student.password = student.generateHash(req.body.password);
  // Create token
  const token = jwt.sign(
    { user_id: student._id, email: student.email },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
  // save user token
  student.token = token;

  student.save(function (err) {
    if (err) console.log(err);
  });
  res.send(student);
};

//update student details by ID
const updateStudent = async (req, res) => {
  //look up for the course
  const {
    params: { id: studentId },
  } = req;

  //validate the input data
  const { error } = validateUpdatedStudent(req.body);
  if (error)
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .send(error.details[0].message);

  //update course
  var newvalues = {
    $set: { name: req.body.name, courseId: req.body.courseId },
  };
  const updatedStudent = await StudentModel.updateMany(
    { _id: studentId },
    newvalues
  );
  res.send("The record has been updated successfully.");
};

//delete the student
const deleteStudent = async (req, res) => {
  const {
    params: { id: studentId },
  } = req;

  const deletedData = await StudentModel.deleteOne({ _id: studentId });

  if (deletedData.deletedCount > 0)
    res.send("The requested student details is deleted");
  else
    res
      .status(httpStatusCode.NOT_FOUND)
      .send(httpErrorMsg.STUDENT_NOT_FOUND_MSG);
};

export default {
  getStudentDetails,
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
};
