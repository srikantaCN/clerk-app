"use client";

import { useOrganizationList, useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";
// import UsersList from "./users";

// Parameters for fetching organization memberships
export const userMembershipsParams = {
  memberships: {
    pageSize: 5,
    keepPreviousData: true,
  },
};

// List of the user's organization memberships.
const JoinedOrganizations = () => {
  const { user } = useUser();
  const { isLoaded, organizationList } = useOrganizationList({
    memberships: userMembershipsParams.memberships,
  });
  console.log({ organizationList, user });
  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const [userMemberships, setUserMemberships] = useState([]);

  // Effect to update the memberships list when the organization changes
  useEffect(() => {
    if (selectedOrgId && organizationList) {
      const selectedOrg = organizationList.find(
        (org) => org.organization.id === selectedOrgId
      );
      console.log({ selectedOrg: selectedOrg.membership });
      setUserMemberships([selectedOrg?.membership] || []);
    }
  }, [selectedOrgId]);

  //   useEffect(() => {
  //     if (isLoaded && organizationList.length === 0) {
  //       console.log("No organizations found for this user.");
  //     }
  //   }, [isLoaded, organizationList]);

  if (!isLoaded) {
    return <>Loading...</>;
  }

  const handleOrgSelect = (orgId) => {
    console.log({ orgId });
    setSelectedOrgId(orgId);
  };

  const editUserRole = (userId, currentRole) => {
    const newRole = prompt("Enter new role:", currentRole);

    if (newRole && newRole !== currentRole) {
      // Implement role update logic here using Clerk's updateOrganizationMembership API
      console.log(`Updating role for user ${userId} to ${newRole}`);
    }
  };

  const removeUserFromOrg = (userId) => {
    const confirmRemoval = confirm(
      "Are you sure you want to remove this user from the organization?"
    );

    if (confirmRemoval) {
      // Implement user removal logic here using Clerk's updateOrganizationMembership API
      console.log(`Removing user ${userId} from the organization`);
    }
  };

  return (
    <>
      <h1>Joined Organizations</h1>
      <select onChange={(e) => handleOrgSelect(e.target.value)}>
        <option value="">Select Organization</option>
        {organizationList?.map((org) => {
          console.log({ org });
          return (
            <option key={org.organization.id} value={org.organization.id}>
              {org.organization.name}
            </option>
          );
        })}
      </select>

      {selectedOrgId && (
        <>
          <h2>User Memberships for Selected Organization</h2>
          <table>
            <thead>
              <tr>
                <th>Identifier</th>
                <th>Joined</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userMemberships?.map((mem) => (
                <tr key={mem.id}>
                  <td>{mem?.publicUserData?.identifier}</td>
                  <td>{new Date(mem.createdAt).toLocaleDateString()}</td>
                  <td>{mem.role}</td>
                  <td>
                    <button onClick={() => editUserRole(mem.userId, mem.role)}>
                      Edit Role
                    </button>
                    <button onClick={() => removeUserFromOrg(mem.userId)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
export default JoinedOrganizations;
