import { httpErrorMsg, httpStatusCode } from "../constant.js";
import { validateCourse } from "../middleware/validator.js";
import CourseModel from "../model/courseModel.js";

const getData = async (req, res) => {
  const course = await CourseModel.find().clone();
  res.send(course);
};

//get the single value by ID value
const getCourseById = async (req, res) => {
  const {
    params: { id: courseId },
  } = req;

  const course = await CourseModel.findOne({ _id: courseId });
  if (!course)
    return res
      .status(httpStatusCode.NOT_FOUND)
      .send(httpErrorMsg.COURSE_NOT_FOUND_MSG);
  res.send(course);
};

//add the new course with help of app.post
const addCourse = (req, res) => {
  const { error } = validateCourse(req.body);
  if (error)
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .send(error.details[0].message);

  const course = new CourseModel({ name: req.body.name });

  course.save(function (err) {
    if (err) console.log(err);
  });
  res.send(course);
};

//update the course by PUT method
const updateCourse = async (req, res) => {
  //look up for the course
  const {
    params: { id: courseId },
  } = req;

  //validate the input data
  const { error } = validateCourse(req.body);
  if (error)
    return res
      .status(httpStatusCode.BAD_REQUEST)
      .send(error.details[0].message);

  //update course
  var newvalues = { $set: { name: req.body.name } };
  const updatedCourse = await CourseModel.updateOne(
    { _id: courseId },
    newvalues
  );

  if (updatedCourse.modifiedCount > 0)
    res.send("The requested course is updated");
  else
    res
      .status(httpStatusCode.NOT_FOUND)
      .send(httpErrorMsg.COURSE_NOT_FOUND_MSG);
};

//delete the course
const deleteCourse = async (req, res) => {
  const {
    params: { id: courseId },
  } = req;

  const deletedData = await CourseModel.deleteOne({ _id: courseId });

  if (deletedData.deletedCount > 0) res.send("The requested course is deleted");
  else
    res
      .status(httpStatusCode.NOT_FOUND)
      .send(httpErrorMsg.COURSE_NOT_FOUND_MSG);
};

export default {
  getData,
  getCourseById,
  addCourse,
  updateCourse,
  deleteCourse,
};
