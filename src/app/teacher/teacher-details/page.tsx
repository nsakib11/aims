"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const TeacherDetails: React.FC = () => {
  const teacherData = useSelector((state: any) => state.teacher.teacherData); // Replace `any` with your actual state type if you have TypeScript types defined
  const router = useRouter();

  if (!teacherData) {
    router.push("/");
    return null;
  }

  const formattedDob = new Date(teacherData.dob).toLocaleDateString();
  const formattedJoinDate = new Date(teacherData.joinDate).toLocaleDateString();

  const handleViewAllTeachers = () => {
    router.push("/teacher-list"); // Assuming '/teachers' is the route where the teacher list is displayed
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">Teacher Details</h2>
      <p>
        <strong>Code:</strong> {teacherData.code}
      </p>
      <p>
        <strong>Name:</strong> {teacherData.name}
      </p>
      <p>
        <strong>Name (Native):</strong> {teacherData.nameNative}
      </p>
      <p>
        <strong>Gender:</strong> {teacherData.gender}
      </p>
      <p>
        <strong>Date of Birth:</strong> {formattedDob}
      </p>
      <p>
        <strong>Father's Name:</strong> {teacherData.fatherName}
      </p>
      <p>
        <strong>Mother's Name:</strong> {teacherData.motherName}
      </p>
      <p>
        <strong>Join Date:</strong> {formattedJoinDate}
      </p>
      <p>
        <strong>Mobile:</strong> {teacherData.mobile}
      </p>
      <p>
        <strong>Email:</strong> {teacherData.email}
      </p>
      <p>
        <strong>Qualification:</strong> {teacherData.qualification}
      </p>
      <p>
        <strong>Picture:</strong> {teacherData.picture}
      </p>
      <p>
        <strong>Job Type:</strong> {teacherData.jobType}
      </p>
      <p>
        <strong>Status:</strong> {teacherData.status}
      </p>

      {/* Button to navigate to the teacher list page */}
      <button
        onClick={handleViewAllTeachers}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        View All Teachers
      </button>
    </div>
  );
};

export default TeacherDetails;
