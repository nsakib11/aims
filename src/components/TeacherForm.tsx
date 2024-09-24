"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setTeacherData } from "../app/redux/slices/teacherSlice";

interface Teacher {
  code: string;
  name: string;
  nameNative?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  dob: string;
  fatherName: string;
  motherName: string;
  joinDate: string;
  mobile: string;
  email: string;
  qualification: string;
  jobType: "FULL_TIME" | "PART_TIME";
  picture?: string;
  status: "ACTIVE" | "INACTIVE" | "TERMINATED" | "RETIRED";
}

// Validation schema
const schema = yup.object().shape({
  code: yup.string().required("Code is required"),
  name: yup.string().required("Name is required"),
  gender: yup
    .string()
    .oneOf(["MALE", "FEMALE", "OTHER"])
    .required("Gender is required"),
  dob: yup.date().required("Date of Birth is required").nullable(),
  fatherName: yup.string().required("Father Name is required"),
  motherName: yup.string().required("Mother Name is required"),
  joinDate: yup.date().required("Join Date is required").nullable(),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  qualification: yup.string().required("Qualification is required"),
  jobType: yup
    .string()
    .oneOf(["FULL_TIME", "PART_TIME"])
    .required("Job Type is required"),
  status: yup
    .string()
    .oneOf(["ACTIVE", "INACTIVE", "TERMINATED", "RETIRED"])
    .required("Status is required"),
});

const TeacherForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Teacher>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("http://localhost:8080/teachers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const teacher = await response.json(); // Get the created teacher data from response
        dispatch(setTeacherData(teacher)); // Save the teacher data to Redux
        router.push("/teacher-details"); // Redirect to the details page
      } else {
        alert("Failed to create teacher");
      }
    } catch (error) {
      console.error("Error creating teacher:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-4xl space-y-6 rounded bg-white p-8 shadow-lg"
      >
        <h2 className="mb-4 text-center text-xl font-semibold">
          Create Teacher
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Code
            </label>
            <input
              type="text"
              {...register("code")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.code && (
              <p className="text-red-500">{errors.code.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              {...register("name")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Name (Native)
            </label>
            <input
              type="text"
              {...register("nameNative")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Gender
            </label>
            <select
              {...register("gender")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
              <option value="OTHER">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dob")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Father Name
            </label>
            <input
              type="text"
              {...register("fatherName")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.fatherName && (
              <p className="text-red-500">{errors.fatherName.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Mother Name
            </label>
            <input
              type="text"
              {...register("motherName")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.motherName && (
              <p className="text-red-500">{errors.motherName.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Join Date
            </label>
            <input
              type="date"
              {...register("joinDate")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.joinDate && (
              <p className="text-red-500">{errors.joinDate.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Mobile
            </label>
            <input
              type="text"
              {...register("mobile")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.mobile && (
              <p className="text-red-500">{errors.mobile.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Qualification
            </label>
            <input
              type="text"
              {...register("qualification")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.qualification && (
              <p className="text-red-500">{errors.qualification.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Job Type
            </label>
            <select
              {...register("jobType")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Job Type</option>
              <option value="FULL_TIME">Full Time</option>
              <option value="PART_TIME">Part Time</option>
            </select>
            {errors.jobType && (
              <p className="text-red-500">{errors.jobType.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block">Picture</label>
            <input
              type="text"
              {...register("picture")}
              className="w-full border p-2"
            />
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="TERMINATED">Terminated</option>
              <option value="RETIRED">Retired</option>
            </select>
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TeacherForm;
