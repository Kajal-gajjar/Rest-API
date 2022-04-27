import mongoose from "mongoose";

//Define a schema
const Schema = mongoose.Schema;

const StudentModelSchema = new Schema({
  name: String,
  courseId: { type: mongoose.Types.ObjectId, required: true },
});

const StudentModel = mongoose.model("StudentModel", StudentModelSchema);

export default StudentModel;
