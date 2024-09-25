// pages/update-teacher/[id].tsx
"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "../../../../../lib/axiosConfig";

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

const UpdateTeacher: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Teacher>();

  useEffect(() => {
    if (id) {
      // Fetch teacher data to populate the form fields
      axiosInstance
        .get(`/teachers/${id}`)
        .then((response) => {
          setTeacher(response.data);
          // Pre-fill form fields with existing data
          Object.keys(response.data).forEach((key) => {
            setValue(key as keyof Teacher, response.data[key]);
          });
        })
        .catch((err) => setError(err.message));
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<Teacher> = (data) => {
    axiosInstance
      .put(`/teachers/${id}`, data)
      .then((response) => {
        router.push(`/teacher/teacher-details/view/${id}`); // Redirect to view page after successful update
      })
      .catch((err) => setError(err.message));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-gray-300 mx-auto mt-10 max-w-md rounded border bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">Update Teacher</h1>
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
          <label>Join Date</label>
          <input
            type="date"
            {...register("joinDate")}
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
          <label>Qualification</label>
          <input
            type="text"
            {...register("qualification")}
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
          <label>Job Type</label>
          <select {...register("jobType")} className="w-full border">
            <option value="">Select Job Type</option>
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
          </select>
        </div>

        <div>
          <label>Status</label>
          <select {...register("status")} className="w-full border">
            <option value="">Select Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="TERMINATED">Terminated</option>
            <option value="RETIRED">Retired</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Update Teacher
        </button>
      </form>
    </div>
  );
};

export default UpdateTeacher;
