"use client";
import React, { useEffect, useState } from "react";

const MemberUpdateModal = ({ data, createUser }) => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };
  const [member, setMember] = useState(initialValues);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log({ member });
      if (!data) {
        // await createUser(member);
        const formData = new FormData(e.target);
        const userData = Object.fromEntries(formData.entries());

        const response = await fetch("/api/createUser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        if (!response.ok) {
          throw new Error("Failed to create user");
        }

        const data = await response.json();
        console.log("User created:", data.user);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data) {
      setMember({
        ...member,
        email: data.publicUserData.identifier,
        firstName: data.publicUserData.firstName,
        lastName: data.publicUserData.lastName,
      });
    } else {
      setMember(initialValues);
    }
  }, [data]);
  return (
    <div className="container">
      <form
        className="max-w-screen overflow-x-auto border-2 rounded my-5 p-5"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold text-center my-4">
          {data ? "Update" : "Create"} Member
        </h2>
        <div className="p-6.5">
          <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black ">
                First name
              </label>
              <input
                value={member.firstName}
                onChange={(e) =>
                  setMember({ ...member, firstName: e.target.value })
                }
                type="text"
                placeholder="Enter your first name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
              />
            </div>

            <div className="w-full xl:w-1/2">
              <label className="mb-3 block text-sm font-medium text-black ">
                Last name
              </label>
              <input
                value={member.lastName}
                onChange={(e) =>
                  setMember({ ...member, lastName: e.target.value })
                }
                type="text"
                placeholder="Enter your last name"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black ">
              Email <span className="text-meta-1">*</span>
            </label>
            <input
              value={member.email}
              onChange={(e) => setMember({ ...member, email: e.target.value })}
              type="email"
              placeholder="Enter your email address"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
            />
          </div>
          <div className="mb-4.5">
            <label className="mb-3 block text-sm font-medium text-black ">
              Password <span className="text-meta-1">*</span>
            </label>
            <input
              value={member.paswword}
              onChange={(e) =>
                setMember({ ...member, password: e.target.value })
              }
              type="password"
              placeholder="Enter your Password"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
            />
          </div>

          <button className="flex w-full justify-center rounded bg-blue-900 text-white p-3 font-medium text-gray hover:bg-opacity-90 my-3">
            {data ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default MemberUpdateModal;
