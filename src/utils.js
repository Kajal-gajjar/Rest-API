export const mapStudent = (student, course) => {
  return {
    id: student.id,
    name: student.name,
    email: student.email,
    active: student.active,
    courseDetails: course.length
      ? course.map((x) => {
          return {
            id: x._id,
            courseName: x.name,
          };
        })
      : "Course details not available",
  };
};
