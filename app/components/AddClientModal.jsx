import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { grades, schoolSettings } from "../utils/Clients";
import { Grid } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AddClientModal = ({ modalOpen, setModalOpen, trigger }) => {
  const initialAbaServiceHistory = {
    providerName: "",
    startDate: "",
    endDate: "",
    outcomes: "",
  };
  const modal = useRef(null);
  const [isChecked, setIsChecked] = useState(false);
  const [openTab, setOpenTab] = useState(1);
  const [abaServicesHistory, setAbaServicesHistory] = useState([
    initialAbaServiceHistory,
  ]);

  const activeClasses = "text-primary border-blue-900";
  const inactiveClasses = "border-transparent";

  const handleAddService = () => {
    const newService = [...abaServicesHistory];
    newService.push(initialAbaServiceHistory);
    console.log("object", newService);
    setAbaServicesHistory(newService);
  };
  const handleDelete = (index) => {
    const newService = [...abaServicesHistory];
    newService.splice(index, 1);
    setAbaServicesHistory(newService);
  };

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal?.current?.contains(target) ||
        trigger?.current?.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div>
      <div
        className={`fixed left-0 top-0 z-999999 flex h-full min-h-screen w-full items-center justify-center bg-black/90 px-4 py-5 ${
          modalOpen ? "block" : "hidden"
        }`}
      >
        <div
          ref={modal}
          onFocus={() => setModalOpen(true)}
          //   onBlur={() => setModalOpen(false)}
          className="container w-full max-w-142.5 rounded-lg bg-blue-50 px-8 py-8 md:px-17.5 md:py-15"
        >
          <h2 className="text-center mb-8 text-3xl underline text-blue-900">
            Add Client
          </h2>

          <button
            onClick={() => setModalOpen(false)}
            className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full transition bg-white text-blue-900"
          >
            <svg
              width="10"
              height="10"
              viewBox="0 0 13 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.4917 7.65579L11.106 12.2645C11.2545 12.4128 11.4715 12.5 11.6738 12.5C11.8762 12.5 12.0931 12.4128 12.2416 12.2645C12.5621 11.9445 12.5623 11.4317 12.2423 11.1114C12.2422 11.1113 12.2422 11.1113 12.2422 11.1113C12.242 11.1111 12.2418 11.1109 12.2416 11.1107L7.64539 6.50351L12.2589 1.91221L12.2595 1.91158C12.5802 1.59132 12.5802 1.07805 12.2595 0.757793C11.9393 0.437994 11.4268 0.437869 11.1064 0.757418C11.1063 0.757543 11.1062 0.757668 11.106 0.757793L6.49234 5.34931L1.89459 0.740581L1.89396 0.739942C1.57364 0.420019 1.0608 0.420019 0.740487 0.739944C0.42005 1.05999 0.419837 1.57279 0.73985 1.89309L6.4917 7.65579ZM6.4917 7.65579L1.89459 12.2639L1.89395 12.2645C1.74546 12.4128 1.52854 12.5 1.32616 12.5C1.12377 12.5 0.906853 12.4128 0.758361 12.2645L1.1117 11.9108L0.758358 12.2645C0.437984 11.9445 0.437708 11.4319 0.757539 11.1116C0.757812 11.1113 0.758086 11.111 0.75836 11.1107L5.33864 6.50287L0.740487 1.89373L6.4917 7.65579Z"
                className="fill-current stroke-current"
              />
            </svg>
          </button>
          <div className="rounded-sm  p-7.5 shadow-default">
            <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
              <Link
                href="#"
                className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
                  openTab === 1 ? activeClasses : inactiveClasses
                }`}
                onClick={() => setOpenTab(1)}
              >
                Client Information
              </Link>
              <Link
                href="#"
                className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
                  openTab === 2 ? activeClasses : inactiveClasses
                }`}
                onClick={() => setOpenTab(2)}
              >
                Biopsychosocial Information
              </Link>
              <Link
                href="#"
                className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
                  openTab === 3 ? activeClasses : inactiveClasses
                }`}
                onClick={() => setOpenTab(3)}
              >
                School Placement
              </Link>
              <Link
                href="#"
                className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
                  openTab === 4 ? activeClasses : inactiveClasses
                }`}
                onClick={() => setOpenTab(4)}
              >
                History of ABA Services
              </Link>
              <Link
                href="#"
                className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
                  openTab === 5 ? activeClasses : inactiveClasses
                }`}
                onClick={() => setOpenTab(5)}
              >
                Others
              </Link>
            </div>

            <div>
              <div
                className={`leading-relaxed px-5 h-[600px] overflow-y-scroll ${
                  openTab === 1 ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col gap-9">
                  <div className="rounded-lg border  border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark px-5">
                    <div className="p-6.5">
                      <div className="my-4 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="my-3 block text-sm font-medium text-black">
                            Participant Name
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                          />
                        </div>

                        <div className="w-full xl:w-1/2">
                          <label className="my-3 block text-sm font-medium text-black">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            placeholder="Enter your DOB"
                            className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                          />
                        </div>
                      </div>

                      <div className="my-4 flex flex-col gap-6 xl:flex-row">
                        <div className="w-full xl:w-1/2">
                          <label className="my-3 block text-sm font-medium text-black">
                            Date of Initial Assessment
                          </label>
                          <input
                            type="date"
                            placeholder="Choose a date"
                            className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                          />
                        </div>

                        <div className="w-full xl:w-1/2">
                          <label className="my-3 block text-sm font-medium text-black">
                            Date of Current Reassessment
                          </label>
                          <input
                            type="date"
                            placeholder="Choose a date"
                            className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                          />
                        </div>
                      </div>

                      <label className="my-4 block text-lg font-medium text-black border-b-2 pb-3 border-gray-500">
                        Parent/Guardian Contact
                      </label>
                      <div className="my-4 flex flex-col gap-6 xl:flex-row ">
                        <div className="w-full xl:w-1/3">
                          <label className="mb-3 block text-sm font-medium text-black">
                            Name <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="Enter your Parent's Name"
                            className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                          />
                        </div>
                        <div className="w-full xl:w-1/3">
                          <label className="mb-3 block text-sm font-medium text-black">
                            Phone <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="number"
                            placeholder="Enter Contact Number"
                            className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                          />
                        </div>
                        <div className="w-full xl:w-1/3">
                          <label className="mb-3 block text-sm font-medium text-black">
                            Email <span className="text-meta-1">*</span>
                          </label>
                          <input
                            type="email"
                            placeholder="Enter your email address"
                            className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`leading-relaxed px-5   h-[600px] overflow-y-scroll ${
                  openTab === 2 ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col gap-9">
                  <div className="rounded-lg border  border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark p-5">
                    <div className="mb-2 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full">
                        <label className="my-3 block text-sm font-medium text-black">
                          Current Family Structure{" "}
                          <span className="text-meta-1">*</span>
                        </label>
                        <input
                          type="text"
                          placeholder="Current Family Structure"
                          className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                      </div>
                    </div>
                    <div className="mb-2 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full">
                        <label className="my-2 block text-sm font-medium text-black">
                          Medications <span className="text-meta-1">*</span>
                        </label>
                        <span className="text-sm text-gray-600">
                          Include ALL medications (OTC, Psych meds or behavioral
                          meds), dosage and prescribing physician.
                        </span>
                        <textarea
                          type="text"
                          placeholder="Medications"
                          className="w-full mt-3 rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                      </div>
                    </div>
                    <div className="mb-2 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full">
                        <label className="my-3 block text-sm font-medium text-black">
                          Medical History <span className="text-meta-1">*</span>
                        </label>
                        <textarea
                          type="text"
                          placeholder="Medical History"
                          className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`leading-relaxed px-5   h-[600px] overflow-y-scroll ${
                  openTab === 3 ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col gap-9 mb-10">
                  {/* <!-- Sign In Form --> */}
                  <div className="rounded-lg border border-stroke bg-white shadow-lg dark:border-stroke dark:bg-boxdark px-5  mb-5">
                    <label className="my-3 block text-lg font-medium text-black  border-b-2 pb-3 border-gray-500">
                      School Placement
                    </label>
                    <label className="my-3 block text-lg font-medium text-black">
                      School Type
                    </label>
                    <Grid container spacing={1} className="my-3 ">
                      {schoolSettings?.map((settings) => {
                        return (
                          <Grid item xs={4} className="my-4" key={settings?.id}>
                            <label
                              htmlFor="checkboxLabelOne"
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="">
                                <input
                                  type="checkbox"
                                  id="checkboxLabelOne"
                                  className="sr-only w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                  value={isChecked}
                                  onChange={() => {
                                    setIsChecked(!isChecked);
                                  }}
                                />
                                <div
                                  className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                                    isChecked &&
                                    "border-blue-900 bg-gray dark:bg-transparent"
                                  }`}
                                >
                                  <span
                                    className={`h-2.5 w-2.5 rounded-sm ${
                                      isChecked && "bg-blue-900"
                                    }`}
                                  ></span>
                                </div>
                              </div>
                              {settings?.name}
                            </label>
                          </Grid>
                        );
                      })}
                    </Grid>

                    <label className="my-3 block text-lg font-medium text-black">
                      Grade
                    </label>
                    <Grid container spacing={1} className="my-3 ">
                      {grades?.map((grade) => {
                        return (
                          <Grid item xs={2} className="my-4" key={grade?.id}>
                            <label
                              htmlFor="checkboxLabelOne"
                              className="flex cursor-pointer select-none items-center"
                            >
                              <div className="">
                                <input
                                  type="checkbox"
                                  id="checkboxLabelOne"
                                  className="sr-only w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                                  value={isChecked}
                                  onChange={() => {
                                    setIsChecked(!isChecked);
                                  }}
                                />
                                <div
                                  className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                                    isChecked &&
                                    "border-blue-900 bg-gray dark:bg-transparent"
                                  }`}
                                >
                                  <span
                                    className={`h-2.5 w-2.5 rounded-sm ${
                                      isChecked && "bg-blue-900"
                                    }`}
                                  ></span>
                                </div>
                              </div>
                              {grade?.name}
                            </label>
                          </Grid>
                        );
                      })}
                    </Grid>
                    <div className="my-4 flex flex-col gap-6 ">
                      <div className="w-full">
                        <label className="my-3 block text-sm font-medium text-black">
                          Start and end time of school hours
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your name"
                          className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                      </div>

                      <div className="w-full">
                        <label className="my-3 block text-sm font-medium text-black">
                          Schedule of academic activities
                        </label>
                        <input
                          type="text"
                          placeholder="Schedule of academic activities"
                          className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                      </div>
                      <div className="w-full">
                        <label className="my-3 block text-sm font-medium text-black">
                          Total number of hours spent in school per week
                        </label>
                        <input
                          type="tel"
                          placeholder="Total number of hours spent in school per week"
                          className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`leading-relaxed px-5 h-[600px] overflow-y-scroll ${
                  openTab === 4 ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col gap-9">
                  <div className="rounded-lg border  border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark p-5">
                    <div className="flex justify-between items-center">
                      <span className="text-red-600">
                        (indicate N/A if no prior history)
                      </span>
                    </div>

                    {abaServicesHistory?.map((item, index, arr) => {
                      return (
                        <div key={item?.id}>
                          <div className="my-4 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full xl:w-1/3">
                              <label className="my-3 block text-sm font-medium text-black">
                                <span>Provider Name</span>
                              </label>
                              <input
                                type="text"
                                placeholder="Enter Provider name"
                                className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                              />
                            </div>

                            <div className="w-full xl:w-1/3">
                              <label className="my-3 block text-sm font-medium text-black">
                                Start Date
                              </label>
                              <input
                                type="date"
                                placeholder="Enter start date"
                                className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                              />
                            </div>
                            <div className="w-full xl:w-1/3">
                              <label className="my-3 font-medium text-black">
                                <span>End Date</span>
                              </label>
                              <input
                                type="date"
                                placeholder="Enter end date"
                                className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                              />
                            </div>
                          </div>
                          <div className="my-4 flex flex-col gap-6 xl:flex-row">
                            <div className="w-full">
                              <label className="my-3  text-sm font-medium text-black flex justify-between items-center ">
                                <span>Outcomes</span>
                                <div className="flex justify-center items-center rounded-lg gap-3">
                                  {index === arr.length - 1 && (
                                    <button
                                      className="bg-blue-900 text-sm  text-white p-1 flex justify-center items-center rounded-lg"
                                      onClick={handleAddService}
                                    >
                                      <AddIcon fontSize="small" />
                                    </button>
                                  )}

                                  {index !== 0 && (
                                    <button
                                      className="bg-red-600 text-sm  text-white p-1 flex justify-center items-center rounded-lg"
                                      onClick={handleDelete}
                                    >
                                      <DeleteIcon fontSize="small" />
                                    </button>
                                  )}
                                </div>
                              </label>
                              <textarea
                                placeholder="Enter Outcomes"
                                className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div
                className={`leading-relaxed px-5 h-[600px] overflow-y-scroll ${
                  openTab === 5 ? "block" : "hidden"
                }`}
              >
                <div className="flex flex-col gap-9">
                  <div className="rounded-lg border  border-stroke bg-white shadow-lg dark:border-strokedark dark:bg-boxdark p-5">
                    <div className="my-4 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full">
                        <label className="my-3 text-sm font-medium text-black flex flex-col">
                          <span>Other Mental Health Services</span>
                          <span className="text-gray-500">
                            (Include any mental health hospitalizations)
                          </span>
                        </label>
                        <input
                          type="text"
                          placeholder="Enter Provider name"
                          className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                      </div>
                    </div>
                    <div className="w-full my-4">
                      <label className="my-3 block text-sm font-medium text-black">
                        Other Services
                      </label>
                      <textarea
                        placeholder="• e.g., Occupational therapy, speech
                                        therapy, physical therapy, feeding
                                        therapy, etc.
                                        • Include how many sessions per
                                        week and how many hours overall.
                                        • Indicate NA if none."
                        className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                      />
                    </div>
                    <div className="w-full my-4">
                      <label className="my-3 text-sm font-medium text-black flex flex-col">
                        <span>Coordination of care with other providers</span>
                        <span className="text-gray-500">
                          (Psychologists, psychiatrists, OT, SLP, PT, School
                          personnel, etc.)
                        </span>
                      </label>
                      <textarea
                        type="date"
                        placeholder="Enter end date"
                        className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                      />
                    </div>
                    <div className="my-4 flex flex-col gap-6 xl:flex-row">
                      <div className="w-full">
                        <label className="my-3 text-sm font-medium text-black flex flex-col">
                          <span>Major Life Changes</span>
                          <span className="text-gray-500">
                            (Indicate NA if none)
                          </span>
                        </label>
                        <textarea
                          placeholder="Enter Outcomes"
                          className="w-full rounded-lg border-md border-stroke bg-transparent px-5 py-3 text-black outline-none transition ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
                        />
                      </div>
                    </div>
                    <button className="flex w-full justify-center rounded bg-blue-900 p-3 font-medium text-white hover:bg-opacity-90">
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddClientModal;
