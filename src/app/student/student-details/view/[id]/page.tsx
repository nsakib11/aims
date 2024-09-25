// pages/view-teacher/[id].tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../../lib/axiosConfig";

interface Student {
  code: string;
  name: string;
  nameNative?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;
  fatherName: string;
  motherName: string;
  guardianName: string;
  birthRegistration: string;
  enrollDate: string;
  mobile: string;
  email: string;
  picture?: string;
  status: "DROPOUT" | "TRANSFER" | "DIED";
}

const ViewStudent: React.FC = () => {
  const { id } = useParams();
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/students/${id}`)
        .then((response) => setStudent(response.data))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-gray-300 mx-auto mt-10 max-w-md rounded border bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">Student Details</h1>
      {[
        "id",
        "code",
        "name",
        "nameNative",
        "gender",
        "dob",
        "fatherName",
        "motherName",
        "guardianName",
        "mobile",
        "email",
        "birthRegister",
        "enrollDate",
        "picture",
        "status",
      ].map((field) => (
        <p key={field} className="mb-4">
          <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
          {student[field as keyof Student]}
        </p>
      ))}
      <Link href="/student/student-list" passHref>
        <button className="text-gray- w-full rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700">
          Back to List
        </button>
      </Link>
    </div>
  );
};

export default ViewStudent;
