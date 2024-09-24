"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Teacher {
  id: number;
  code: string;
  name: string;
  nameNative: string;
  gender: string;
  dob: string;
  fatherName: string;
  motherName: string;
  joinDate: string;
  mobile: string;
  email: string;
  qualification: string;
  jobType: string;
  picture: string;
  status: string;
}

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch teacher list from backend API
    const fetchTeachers = async () => {
      try {
        const response = await fetch("http://localhost:8080/teachers"); // Replace with your actual API endpoint
        const data = await response.json();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchTeachers();
  }, []);

  const handleView = (id: number) => {
    router.push(`/teacher-details/view/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/teacher-details/update/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        const response = await fetch(`http://localhost:8080/teachers/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setTeachers((prevTeachers) =>
            prevTeachers.filter((teacher) => teacher.id !== id),
          );
        } else {
          console.error("Failed to delete teacher");
        }
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  const handleAddNewTeacher = () => {
    router.push("/teacher"); // Redirect to the add new teacher page
  };

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-bold">Teacher List</h2>
        <button
          onClick={handleAddNewTeacher}
          className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Add New Teacher
        </button>
      </div>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Gender</th>
            <th className="border px-4 py-2">Date of Birth</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Qualification</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id}>
              <td className="border px-4 py-2">{teacher.code}</td>
              <td className="border px-4 py-2">{teacher.name}</td>
              <td className="border px-4 py-2">{teacher.gender}</td>
              <td className="border px-4 py-2">
                {new Date(teacher.dob).toLocaleDateString()}
              </td>
              <td className="border px-4 py-2">{teacher.mobile}</td>
              <td className="border px-4 py-2">{teacher.email}</td>
              <td className="border px-4 py-2">{teacher.qualification}</td>
              <td className="border px-4 py-2">{teacher.status}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleView(teacher.id)}
                  className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleUpdate(teacher.id)}
                  className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(teacher.id)}
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

export default TeacherList;
