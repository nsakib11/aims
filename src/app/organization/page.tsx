"use client";

import { setOrganizationData } from "@/app/redux/slices/organizationSlice";
import { uploadImageToCloudinary } from "@/lib/cloudinary";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import axiosInstance from "../../lib/axiosConfig";

// Define the schema for Yup validation
const validationSchema = Yup.object().shape({
  code: Yup.string().required("Code is required"),
  name: Yup.string().required("Name is required"),
  telephone: Yup.string().nullable(),
  mobile: Yup.string().required("Mobile number is required"),
  email: Yup.string().email("Email is invalid").required("Email is required"),
  website: Yup.string().url("Website must be a valid URL").nullable(),
  address: Yup.string().required("Address is required"),
});

interface Organization {
  code: string;
  name: string;
  logo: string;
  telephone: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
}

const OrganizationForm: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Organization>({
    resolver: yupResolver(validationSchema), // Integrating Yup validation with react-hook-form
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: Organization) => {
    try {
      let logoUrl = "";

      // Upload the logo if a file is selected
      if (imageFile) {
        setUploading(true);
        const folder = "Organizations";
        logoUrl = await uploadImageToCloudinary(imageFile, folder);
        setUploading(false);
      }

      const organizationData = {
        ...data,
        logo: logoUrl || undefined,
      };

      const response = await axiosInstance.post(
        "/organizations",
        organizationData,
      );

      console.log("Response status:", response.status);
      console.log("Response data:", response.data);

      if (response.status === 200) {
        dispatch(setOrganizationData(response.data));
        router.push("/organization/organization-list");
      } else {
        alert("Failed to create organization");
      }
    } catch (error) {
      setUploading(false);
      console.error("Error creating organization:", error);
      alert("An error occurred while creating the organization.");
    }
  };

  return (
    <div className="mx-auto max-w-md rounded bg-white p-6 shadow">
      <h2 className="mb-4 text-2xl font-bold">Create Organization</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="code">
            Code
          </label>
          <input
            type="text"
            {...register("code")}
            className="border-gray-300 w-full rounded border p-2"
          />
          {errors.code && <p className="text-red-500">{errors.code.message}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="border-gray-300 w-full rounded border p-2"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="logo">
            Logo
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            className="border-gray-300 w-full rounded border p-2"
          />
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="telephone">
            Telephone
          </label>
          <input
            type="tel"
            {...register("telephone")}
            className="border-gray-300 w-full rounded border p-2"
          />
          {errors.telephone && (
            <p className="text-red-500">{errors.telephone.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="mobile">
            Mobile
          </label>
          <input
            type="tel"
            {...register("mobile")}
            className="border-gray-300 w-full rounded border p-2"
          />
          {errors.mobile && (
            <p className="text-red-500">{errors.mobile.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            {...register("email")}
            className="border-gray-300 w-full rounded border p-2"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="website">
            Website
          </label>
          <input
            type="url"
            {...register("website")}
            className="border-gray-300 w-full rounded border p-2"
          />
          {errors.website && (
            <p className="text-red-500">{errors.website.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium" htmlFor="address">
            Address
          </label>
          <textarea
            {...register("address")}
            className="border-gray-300 w-full rounded border p-2"
            rows={4}
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-500 py-2 font-bold text-white hover:bg-blue-600"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Create Organization"}
        </button>
      </form>
    </div>
  );
};

export default OrganizationForm;
