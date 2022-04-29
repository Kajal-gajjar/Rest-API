import mongoose from "mongoose";
import bcrypt from "bcrypt";

//Define a schema
const Schema = mongoose.Schema;

const StudentModelSchema = new Schema({
  name: String,
  password: String,
  courseId: { type: mongoose.Types.ObjectId, required: true },
  email: String,
  token: String,
});

// hash the password
StudentModelSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
StudentModelSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const StudentModel = mongoose.model("StudentModel", StudentModelSchema);

export default StudentModel;
