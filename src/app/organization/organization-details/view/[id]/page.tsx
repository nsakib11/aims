"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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

const ViewOrganization: React.FC = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/organizations/${id}`)
        .then((response) => setOrganization(response.data))
        .catch((err) => setError(err.message));
    }
  }, [id]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (!organization) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border-gray-300 mx-auto mt-10 max-w-md rounded border bg-white p-8">
      <h1 className="mb-4 text-2xl font-bold">Organization Details</h1>
      {[
        "id",
        "code",
        "name",
        "logo",
        "telephone",
        "mobile",
        "email",
        "website",
        "address",
      ].map((field) => (
        <p key={field} className="mb-4">
          <strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong>{" "}
          {organization[field as keyof Organization]}
        </p>
      ))}
      <Link href="/organization/organization-list" passHref>
        <button className="text-gray- w-full rounded bg-blue-500 px-4 py-2 font-bold hover:bg-blue-700">
          Back to List
        </button>
      </Link>
    </div>
  );
};

export default ViewOrganization;
