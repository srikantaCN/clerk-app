"use client";

import { useEffect, useState } from "react";
import { useOrganization, useUser } from "@clerk/nextjs";
import { clerkClient } from "@clerk/clerk-sdk-node";
import MemberUpdateModal from "../components/MemberUpdateModal";
import axios from "axios";

export default function AdminDashboard() {
  const { organization } = useOrganization();
  const { user } = useUser();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const fetchUsers = async () => {
    try {
      const instance = await clerkClient.organizations.getOrganization();

      console.log({ user, organization, instanceId: instance.instanceId });
      const config = {
        url: `https://dapi.clerk.com/v1/instances/${user.userId}/bff/users?limit=10&offset=0`,
        method: "get",
      };
      const res = await axios(config);
      console.log({ res });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    if (organization) {
      const fetchMembers = async () => {
        const fetchedMembers = await organization.getMemberships();
        setMembers(fetchedMembers);
      };
      fetchMembers();
    }
  }, [organization]);

  const createUser = async (member) => {
    try {
      const { email, password, firstName, lastName } = member;
      console.log(clerkClient);
      const newUser = await clerkClient.users.create({
        emailAddress: email,
        firstName: firstName,
        lastName: lastName,
        password,
      });
      console.log("User created:", newUser);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <div className="justify-center items-center flex flex-col ">
      <h1 className="text-3xl font-semibold my-5 underline">
        Members of {organization?.name}
      </h1>
      <button
        className="my-3 p-3 bg-violet-950 text-white rounded"
        onClick={() => {
          setSelectedMember(null);
          // createUser();
        }}
      >
        Create User
      </button>

      <div className="max-w-screen overflow-x-auto my-5">
        <div className="min-w-full border-2 rounded-[10px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 rounded-t-[10px] bg-blue-900 px-5 py-4 gap-5 text-center">
            <div className="col-span-2">
              <h5 className="font-medium text-white">Profile</h5>
            </div>
            <div className="col-span-3">
              <h5 className="font-medium text-white">Name</h5>
            </div>
            <div className="col-span-3">
              <h5 className="font-medium text-white">Email</h5>
            </div>
            <div className="col-span-2">
              <h5 className="font-medium text-white">Role</h5>
            </div>
            <div className="col-span-2">
              <h5 className="text-center font-medium text-white">Actions</h5>
            </div>
          </div>

          {/* Table Body */}
          <div className="rounded-b-[10px] bg-white">
            {members.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 gap-5 text-center"
              >
                <div className="col-span-2 flex justify-center">
                  <img
                    src={item?.publicUserData?.imageUrl}
                    alt="Profile"
                    className="rounded-full h-12 w-12"
                  />
                </div>
                <div className="col-span-3">
                  <p className="text-[#637381]">
                    {item.publicUserData?.firstName}{" "}
                    {item.publicUserData?.lastName}
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="text-[#637381]">
                    {item.publicUserData.identifier}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-[#637381]">{item.role}</p>
                </div>
                <div className="relative col-span-2 text-center">
                  <button
                    className="mx-1 bg-green-600 p-2 text-white rounded"
                    onClick={() => setSelectedMember(item)}
                  >
                    Edit
                  </button>
                  <button className="mx-1 bg-red-600 p-2 text-white rounded">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MemberUpdateModal data={selectedMember} createUser={createUser} />
    </div>
  );
}
