import React from "react";
import { clerkClient } from "@clerk/nextjs";

// const data = [
//   {
//     name: "Musharof Chowdhury",
//     position: "Multidisciplinary Web Entrepreneur",
//     email: "musharof@example.com",
//     role: "Owner",
//   },
//   {
//     name: "Naimur Rahman",
//     position: "Website Front-end Developer",
//     email: "naimurrahman@example.com",
//     role: "Member",
//   },
//   {
//     name: "Shafiq Hammad",
//     position: "Regional Paradigm Technician",
//     email: "shafiq.hd@example.com",
//     role: "Moderator",
//   },
//   {
//     name: "Alex Semuyel",
//     position: "Applications Engineer",
//     email: "alex.semuel@example.com",
//     role: "Admin",
//   },
// ];

const MemberTable = async ({ data }) => {
  console.log({ data });
  //   console.log({ clerkClient: await clerkClient.users.getUsersList() });
  return (
    <div className="max-w-screen overflow-x-auto">
      <div className="min-w-[full">
        {/* table header start */}
        <div className="grid grid-cols-12 rounded-t-[10px] bg-blue-900 px-5 py-4 lg:px-7.5 2xl:px-11 gap-5 text-center">
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
        {/* table header end */}

        {/* table body start */}
        <div className="rounded-b-[10px] bg-white dark:bg-boxdark">
          {data.map((item, index) => (
            <div
              key={item.id}
              className="grid grid-cols-12 border-t border-[#EEEEEE] px-5 py-4 dark:border-strokedark lg:px-7.5 2xl:px-11 gap-5 text-center"
            >
              <div className="col-span-2 flex justify-center">
                <img
                  src={item?.publicUserData?.imageUrl}
                  alt="Profile Picture"
                  className="rounded-full h-12 w-12"
                />
              </div>
              <div className="col-span-3">
                <p className="text-[#637381] dark:text-bodydark">
                  {item.publicUserData?.firstName}{" "}
                  {item.publicUserData?.lastName}
                </p>
              </div>

              <div className="col-span-3">
                <p className="text-[#637381] dark:text-bodydark">
                  {item.publicUserData.identifier}
                </p>
              </div>

              <div className="col-span-2">
                <p className="text-[#637381] dark:text-bodydark">{item.role}</p>
              </div>
              <div className="relative col-span-2 text-center">
                <button className="mx-1 bg-green-600 p-2 text-white rounded">
                  Edit{" "}
                </button>
                <button className="mx-1 bg-red-600 p-2 text-white rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* table body end */}
      </div>
    </div>
  );
};

export default MemberTable;
