import { mapStudent } from "../utils.js";
import { httpErrorMsg, httpStatusCode } from "../constant.js";
import StudentModel from "../model/studentModel.js";
import { validateUpdatedStudent } from "../middleware/validator.js";
import CourseModel from "../model/courseModel.js";
import mongoose from "mongoose";

//get student list
const getStudents = async (req, res) => {
  const values = await StudentModel.aggregate([
    {
      $match: {
        active: true,
      },
    },
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

  const course = await CourseModel.find({ _id: student.courseId });
  res.send(mapStudent(student, course));
};

//update student details by ID
const updateStudent = async (req, res) => {
  //look up for the course
  const {
    student: { user_id: studentId },
  } = req;
  console.log(studentId);
  //validate the input data
  const { error } = validateUpdatedStudent(req.body);
  if (error)
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .send(error.details[0].message);

  //update course
  var newvalues = {
    $set: {
      name: req.body.name,
      courseId: req.body.courseId.map((x) => mongoose.Types.ObjectId(x)),
    },
  };

  const updatedStudent = await StudentModel.updateMany(
    { _id: studentId },
    newvalues
  );
  if (updatedStudent.modifiedCount > 0)
    res.status(httpStatusCode.SUCCESS).send(httpErrorMsg.UPDATE_STUDENT);
};

//delete the student
const deleteStudent = async (req, res) => {
  const {
    student: { user_id: studentId },
  } = req;

  var newvalues = {
    $set: {
      active: false,
    },
  };

  const updatedStudent = await StudentModel.updateOne(
    { _id: studentId },
    newvalues
  );
  if (updatedStudent.modifiedCount > 0)
    res.status(httpStatusCode.SUCCESS).send(httpErrorMsg.DELETE_STUDENT);
};

//Log out API
const studentLogout = async (req, res) => {
  const token = req.headers.token;
  const { student } = req;

  res.clearCookie(token);
  res.status(httpStatusCode.SUCCESS).send(httpErrorMsg.LOGOUT);
};

//activate the student
const activateStudent = async (req, res) => {
  const student = await StudentModel.findOne({ email: req.body.email });
  let studentId = student._id;
  if (!student.active) {
    if (!student.validPassword(req.body.password))
      res.status(httpStatusCode.UNAUTHORIZED).send(httpErrorMsg.INVALID_DATA);

    var newvalues = {
      $set: {
        active: true,
      },
    };

    const updatedStudent = await StudentModel.updateOne(
      { _id: studentId },
      newvalues
    );

    if (updatedStudent.modifiedCount > 0)
      res.status(httpStatusCode.SUCCESS).send(httpErrorMsg.ACTIVATE_STUDENT);
  } else
    res.status(httpStatusCode.BAD_REQUEST).send(httpErrorMsg.ACTIVATED_STUDENT);
};

export default {
  getStudentDetails,
  getStudents,
  updateStudent,
  deleteStudent,
  studentLogout,
  activateStudent,
};
