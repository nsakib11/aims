"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const StudentDetails: React.FC = () => {
  const studentData = useSelector((state: any) => state.student.studentData); // Replace `any` with your actual state type if you have TypeScript types defined
  const router = useRouter();

  if (!studentData) {
    router.push("/");
    return null;
  }

  const formattedDob = new Date(studentData.dob).toLocaleDateString();
  const formattedEnrollDate = new Date(
    studentData.enrollDate,
  ).toLocaleDateString();

  const handleViewAllStudents = () => {
    router.push("/student/student-list"); // Assuming '/teachers' is the route where the teacher list is displayed
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Student Details</h2>
      <p>
        <strong>Code:</strong> {studentData.code}
      </p>
      <p>
        <strong>Name:</strong> {studentData.name}
      </p>
      <p>
        <strong>Name (Native):</strong> {studentData.nameNative}
      </p>
      <p>
        <strong>Gender:</strong> {studentData.gender}
      </p>
      <p>
        <strong>Date of Birth:</strong> {formattedDob}
      </p>
      <p>
        <strong>Father's Name:</strong> {studentData.fatherName}
      </p>
      <p>
        <strong>Mother's Name:</strong> {studentData.motherName}
      </p>
      <p>
        <strong>Guardian's Name:</strong> {studentData.guardianName}
      </p>
      <p>
        <strong>Birth Registration:</strong> {studentData.birthRegistration}
      </p>
      <p>
        <strong>Enroll Date:</strong> {formattedEnrollDate}
      </p>
      <p>
        <strong>Mobile:</strong> {studentData.mobile}
      </p>
      <p>
        <strong>Email:</strong> {studentData.email}
      </p>

      <p>
        <strong>Picture:</strong> {studentData.picture}
      </p>

      <p>
        <strong>Status:</strong> {studentData.status}
      </p>

      {/* Button to navigate to the teacher list page */}
      <button
        onClick={handleViewAllStudents}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        View All Students
      </button>
    </div>
  );
};

export default StudentDetails;
