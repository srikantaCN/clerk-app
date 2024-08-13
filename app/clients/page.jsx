"use client";
import React, { useRef, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import { clients } from "../utils/Clients";
import AddClientModal from "../components/AddClientModal";

const Clients = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const trigger = useRef(null);

  return (
    <>
      <Breadcrumb pageName={"Clients"} />
      <div className="flex flex-row-reverse mb-5">
        <button
          className="bg-violet-400 py-2 px-4 rounded-lg"
          onClick={() => setModalOpen(!modalOpen)}
          ref={trigger}
        >
          Add Client
        </button>
      </div>
      <div className=" container mx-auto w-screen rounded-lg border border-stroke bg-white p-4 shadow-3xl dark:border-strokedark dark:bg-boxdark md:p-6 xl:p-7.5">
        <div className="overflow-auto max-h-96 my-2">
          <table className="table-auto min-w-full font-light text-surface dark:text-black ">
            <thead className="border-2 rounded-lg text-start border-neutral-200 font-medium dark:border-black/10 bg-blue-950 text-white">
              <tr>
                <th scope="col" className="px-6 py-4">
                  Email
                </th>
                <th scope="col" className="px-6 py-4">
                  Phone
                </th>
                <th scope="col" className="px-6 py-4">
                  DOB
                </th>
                <th scope="col" className="px-6 py-4">
                  Name
                </th>
              </tr>
            </thead>
            <tbody className="text-center h-30 overflow-y-scroll">
              {clients?.map((client) => {
                return (
                  <tr
                    key={client?.ClientId}
                    className="border-2 border-neutral-200 dark:border-black/10"
                  >
                    <td className="whitespace-nowrap px-6 py-4">
                      {client?.ClientName}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {client?.Email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {client?.Phone}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {client?.DateOfBirth}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <AddClientModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </>
  );
};

export default Clients;
