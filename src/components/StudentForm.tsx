"use client";

import axiosInstance from "@/lib/axiosConfig";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { setStudentData } from "../app/redux/slices/studentSlice";
import DatePicker from "./FormElements/DatePicker/DatePickerOneTeacher";

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
  guardianName: yup.string().required("Guardian Name is required"),
  birthRegistration: yup.string().required("Birth Registration is required"),
  enrollDate: yup.date().required("Enroll Date is required").nullable(),
  mobile: yup
    .string()
    .required("Mobile number is required")
    .matches(/^[0-9]{10}$/, "Mobile must be 10 digits"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  status: yup
    .string()
    .oneOf(["DROPOUT", "TRANSFER", "DIED"])
    .required("Status is required"),
});

const StudentForm: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Student>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: Student) => {
    try {
      let pictureUrl = "";

      if (imageFile) {
        setUploading(true);
        pictureUrl = await uploadImageToCloudinary(imageFile); // Upload to Cloudinary and get the URL
        setUploading(false);
      }

      const studentData = {
        ...data,
        picture: pictureUrl || undefined, // Add the picture URL to the data
      };

      const response = await axiosInstance.post("/students", studentData);

      // Log the response to debug
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        const student = response.data;
        dispatch(setStudentData(student)); // Save student data to Redux
        router.push("/student/student-details"); // Redirect to student list
      } else {
        alert(`Failed to create student. Status: ${response.status}`);
      }
    } catch (error) {
      setUploading(false);
      console.error("Error creating student:", error);
      alert("An error occurred while creating the student.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto max-w-4xl space-y-6 rounded bg-white p-8 shadow-lg"
      >
        <h2 className="mb-4 text-center text-xl font-semibold">
          Create Student
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
            <label>Date of Birth</label>
            <DatePicker register={register} name="dob" />
            {errors.dob && <p>{errors.dob.message}</p>}
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
              Guardian Name
            </label>
            <input
              type="text"
              {...register("guardianName")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.guardianName && (
              <p className="text-red-500">{errors.guardianName.message}</p>
            )}
          </div>

          <div>
            <label className="text-gray-700 mb-1 block text-sm font-medium">
              Birth Registration
            </label>
            <input
              type="text"
              {...register("birthRegistration")}
              className="w-full rounded border p-2 focus:ring-2 focus:ring-blue-500"
            />
            {errors.birthRegistration && (
              <p className="text-red-500">{errors.birthRegistration.message}</p>
            )}
          </div>

          <div>
            <label>Enroll Date</label>
            <DatePicker register={register} name="enrollDate" />
            {errors.enrollDate && <p>{errors.enrollDate.message}</p>}
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
            <label className="mb-1 block">Picture</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2"
            />
            {uploading && <p className="text-blue-500">Uploading...</p>}
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
              <option value="DROPOUT">Dropout</option>
              <option value="TRANSFER">Transfer</option>
              <option value="DIED">Died</option>
            </select>
            {errors.status && (
              <p className="text-red-500">{errors.status.message}</p>
            )}
          </div>
        </div>

        <div className="mt-4 text-right">
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
