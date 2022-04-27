export const mapStudent = (student, course) => {
  return {
    id: student.id,
    name: student.name,
    courseDetails: course
      ? {
          id: course._id,
          courseName: course.name,
        }
      : "Course details not available",
  };
};
