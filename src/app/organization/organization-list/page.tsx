"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Organization {
  id: number;
  code: string;
  name: string;
  logo: string;
  telephone: string;
  mobile: string;
  email: string;
  website: string;
  address: string;
}

const OrganizationList: React.FC = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch("http://localhost:8080/organizations");
        const data = await response.json();
        setOrganizations(data);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchOrganizations();
  }, []);

  const handleView = (id: number) => {
    router.push(`/organization/organization-details/view/${id}`);
  };

  const handleUpdate = (id: number) => {
    router.push(`/organization/organization-details/update/${id}`);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this organization?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/organizations/${id}`,
          {
            method: "DELETE",
          },
        );
        if (response.ok) {
          setOrganizations((prevOrganizations) =>
            prevOrganizations.filter((organization) => organization.id !== id),
          );
        } else {
          console.error("Failed to delete organization");
        }
      } catch (error) {
        console.error("Error deleting organization:", error);
      }
    }
  };

  return (
    <div className="p-4">
      <h2 className="mb-4 text-xl font-bold">Organization List</h2>
      <button
        onClick={() => router.push("/organization")}
        className="mb-4 bg-green-500 px-4 py-2 text-white"
      >
        Add New Organization
      </button>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Code</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Telephone</th>
            <th className="border px-4 py-2">Mobile</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Website</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {organizations.map((organization) => (
            <tr key={organization.id}>
              <td className="border px-4 py-2">{organization.code}</td>
              <td className="border px-4 py-2">{organization.name}</td>
              <td className="border px-4 py-2">{organization.telephone}</td>
              <td className="border px-4 py-2">{organization.mobile}</td>
              <td className="border px-4 py-2">{organization.email}</td>
              <td className="border px-4 py-2">{organization.website}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleView(organization.id)}
                  className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                >
                  View
                </button>
                <button
                  onClick={() => handleUpdate(organization.id)}
                  className="mr-2 rounded bg-yellow-500 px-2 py-1 text-white hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(organization.id)}
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

export default OrganizationList;
