// pages/view-teacher/[id].tsx
"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosConfig";

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

const ViewTeacher: React.FC = () => {
  const { id } = useParams();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/teachers/${id}`)
        .then((response) => setTeacher(response.data))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-gray-300 mx-auto mt-10 max-w-md rounded border bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">Teacher Details</h1>
      {[
        "id",
        "code",
        "name",
        "nameNative",
        "gender",
        "dob",
        "fatherName",
        "motherName",
        "joinDate",
        "mobile",
        "email",
        "qualification",
        "jobType",
        "picture",
        "status",
      ].map((field) => (
        <p key={field} className="mb-4">
          <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
          {teacher[field as keyof Teacher]}
        </p>
      ))}
      <Link href="/teacher-list" passHref>
        <button className="text-gray- w-full rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700">
          Back to List
        </button>
      </Link>
    </div>
  );
};

export default ViewTeacher;
