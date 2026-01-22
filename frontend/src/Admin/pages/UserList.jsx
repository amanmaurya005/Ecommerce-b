import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthProvider";

function UserList() {
 
  const {users,fetchUsers,loading}=useAuth()

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Users</h1>
        <p className="text-sm text-gray-500">
          Manage all registered users
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Name
              </th>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Email
              </th>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Phone
              </th>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Role
              </th>
              <th className="border-b px-4 py-3 text-left text-sm font-semibold text-gray-700">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  Loading users...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="border-b px-4 py-3 text-sm text-gray-800">
                    {user.name}
                  </td>
                  <td className="border-b px-4 py-3 text-sm text-gray-800">
                    {user.email}
                  </td>
                  <td className="border-b px-4 py-3 text-sm text-gray-800">
                    {user.phone}
                  </td>
                  <td className="border-b px-4 py-3">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-700">
                      {user.role || "user"}
                    </span>
                  </td>
                  <td className="border-b px-4 py-3">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserList;
