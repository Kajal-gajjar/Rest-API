import mongoose from "mongoose";

//Define a schema
const Schema = mongoose.Schema;

const CourseModelSchema = new Schema({
  name: String,
});

const CourseModel = mongoose.model("CourseModel", CourseModelSchema);

export default CourseModel;
