// pages/update-teacher/[id].tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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

const UpdateStudent: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Student>();

  useEffect(() => {
    if (id) {
      // Fetch teacher data to populate the form fields
      axiosInstance
        .get(`/students/${id}`)
        .then((response) => {
          setStudent(response.data);
          // Pre-fill form fields with existing data
          Object.keys(response.data).forEach((key) => {
            setValue(key as keyof Student, response.data[key]);
          });
        })
        .catch((err) => setError(err.message));
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<Student> = (data) => {
    axiosInstance
      .put(`/students/${id}`, data)
      .then((response) => {
        router.push(`/student/student-details/view/${id}`); // Redirect to view page after successful update
      })
      .catch((err) => setError(err.message));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-gray-300 mx-auto mt-10 max-w-md rounded border bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">student Teacher</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Code</label>
          <input
            type="text"
            {...register("code", { required: "Code is required" })}
            className="w-full border"
          />
          {errors.code && <p className="text-red-500">{errors.code.message}</p>}
        </div>

        <div>
          <label>Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label>Gender</label>
          <select {...register("gender")} className="w-full border">
            <option value="">Select Gender</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div>
          <label>Date of Birth</label>
          <input type="date" {...register("dob")} className="w-full border" />
        </div>

        <div>
          <label>Father's Name</label>
          <input
            type="text"
            {...register("fatherName")}
            className="w-full border"
          />
        </div>

        <div>
          <label>Mother's Name</label>
          <input
            type="text"
            {...register("motherName")}
            className="w-full border"
          />
        </div>
        <div>
          <label>Guardian's Name</label>
          <input
            type="text"
            {...register("guardianName")}
            className="w-full border"
          />
        </div>
        <div>
          <label>Birth Registration</label>
          <input
            type="text"
            {...register("birthRegistration")}
            className="w-full border"
          />
        </div>

        <div>
          <label>Enroll Date</label>
          <input
            type="date"
            {...register("enrollDate")}
            className="w-full border"
          />
        </div>

        <div>
          <label>Mobile</label>
          <input
            type="text"
            {...register("mobile")}
            className="w-full border"
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email")}
            className="w-full border"
          />
        </div>

        <div>
          <label>Picture</label>
          <input
            type="text"
            {...register("picture")}
            className="w-full border"
          />
        </div>

        <div>
          <label>Status</label>
          <select {...register("status")} className="w-full border">
            <option value="">Select Status</option>
            <option value="DROPOUT">Drop Out</option>
            <option value="TRANSFER">Transfer</option>
            <option value="DIED">Died</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Update Student
        </button>
      </form>
    </div>
  );
};

export default UpdateStudent;
