"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import axiosInstance from "../../../../../lib/axiosConfig";

interface Organization {
  code: string;
  name: string;
  logo?: string;
  telephone: string;
  mobile: string;
  email: string;
  website?: string;
  address: string;
}

const UpdateOrganization: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Organization>();

  useEffect(() => {
    if (id) {
      // Fetch organization data to populate the form fields
      axiosInstance
        .get(`/organizations/${id}`)
        .then((response) => {
          setOrganization(response.data);
          // Pre-fill form fields with existing data
          Object.keys(response.data).forEach((key) => {
            setValue(key as keyof Organization, response.data[key]);
          });
        })
        .catch((err) => setError(err.message));
    }
  }, [id, setValue]);

  const onSubmit: SubmitHandler<Organization> = (data) => {
    axiosInstance
      .put(`/organizations/${id}`, data)
      .then((response) => {
        router.push(`/organization/organization-details/view/${id}`); // Redirect to view page after successful update
      })
      .catch((err) => setError(err.message));
  };

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-gray-300 mx-auto mt-10 max-w-md rounded border bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">Update Organization</h1>
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
          <label>Logo URL</label>
          <input type="text" {...register("logo")} className="w-full border" />
        </div>

        <div>
          <label>Telephone</label>
          <input
            type="text"
            {...register("telephone", { required: "Telephone is required" })}
            className="w-full border"
          />
          {errors.telephone && (
            <p className="text-red-500">{errors.telephone.message}</p>
          )}
        </div>

        <div>
          <label>Mobile</label>
          <input
            type="text"
            {...register("mobile", { required: "Mobile is required" })}
            className="w-full border"
          />
          {errors.mobile && (
            <p className="text-red-500">{errors.mobile.message}</p>
          )}
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full border"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label>Website</label>
          <input
            type="text"
            {...register("website")}
            className="w-full border"
          />
        </div>

        <div>
          <label>Address</label>
          <input
            type="text"
            {...register("address", { required: "Address is required" })}
            className="w-full border"
          />
          {errors.address && (
            <p className="text-red-500">{errors.address.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Update Organization
        </button>
      </form>
    </div>
  );
};

export default UpdateOrganization;
