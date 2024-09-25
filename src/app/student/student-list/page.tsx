"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Student {
  id: number;
  code: string;
  name: string;
  nameNative: string;
  gender: string;
  dob: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  birthRegistration: string;
  enrollDate: string;
  mobile: string;
  email: string;
  status: string;
}

const StudentList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch("http://localhost:8080/students");
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  const handleView = (id: number) => {
    router.push(`/student/student-details/view/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/student/student-details/update/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        const response = await fetch(`http://localhost:8080/students/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setStudents((prevStudents) =>
            prevStudents.filter((student) => student.id !== id),
          );
        } else {
          console.error("Failed to delete student");
        }
      } catch (error) {
        console.error("Error deleting student:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Student List</h2>
      <button
        onClick={() => router.push("/student")}
        className="mb-4 bg-green-500 px-4 py-2 text-white"
      >
        Add New Student
      </button>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Date of Birth</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td className="border px-4 py-2">{student.code}</td>
              <td className="border px-4 py-2">{student.name}</td>
              <td className="border px-4 py-2">{student.gender}</td>
              <td className="border px-4 py-2">
                {new Date(student.dob).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{student.mobile}</td>
              <td className="border px-4 py-2">{student.email}</td>
              <td className="border px-4 py-2">{student.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleView(student.id)}
                  className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleUpdate(student.id)}
                  className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="rounded bg-rose-600 px-2 py-1 text-white hover:bg-rose-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
