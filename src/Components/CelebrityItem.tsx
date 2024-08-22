import React, { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { CELEBRITYITEMS } from "../celebrities.types";
import { MdOutlineCancel, MdOutlineEdit } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

export const CelebrityItem: React.FC<CELEBRITYITEMS> = ({
  celebrity,
  onUpdate,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [details, setDetails] = useState(celebrity);

  const toggleAccordion = () => {
    if (!isEditing) setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(details);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setDetails(celebrity);
    setIsEditing(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const isDisabled = JSON.stringify(details) === JSON.stringify(celebrity);

  return (
    <div className="border rounded-lg shadow-md p-4 mb-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={toggleAccordion}
      >
        <div className="flex items-center">
          <img
            src={celebrity.picture}
            className="w-12 h-12 rounded-full object-cover"
            alt=""
          />
          {isEditing ? (
            <input
              type="text"
              name="first"
              value={details.first}
              onChange={handleInputChange}
              className="border ml-5 p-1"
            />
          ) : (
            <h3 className="text-lg font-semibold ml-4">{celebrity.first}</h3>
          )}
        </div>
        {isOpen ? <IoIosArrowUp /> : <FaAngleDown />}
      </div>
      {isOpen && (
        <div className="mt-2 space-y-4">
          <div className="flex justify-between">
            <div className="flex flex-col items-start mt-6">
              <label className="font-medium mb-1">Age:</label>
              {isEditing ? (
                <input
                  type="date"
                  name="dob"
                  value={details.dob}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 bg-white"
                />
              ) : (
                <span>{celebrity.dob}</span>
              )}
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className="font-medium mr-1">Gender:</label>
              {isEditing ? (
                <select
                  name="gender"
                  value={details.gender}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Transgender">Transgender</option>
                  <option value="Rather not say">Rather not say</option>
                  <option value="Other">Other</option>
                </select>
              ) : (
                <span>{celebrity.gender}</span>
              )}
            </div>
            <div className="flex flex-col items-start mt-6">
              <label className="font-medium mr-2">Country:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="country"
                  value={details.country}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1"
                  pattern="[A-Za-z\s]+"
                />
              ) : (
                <span>{celebrity.country}</span>
              )}
            </div>
          </div>
          <div className="w-full flex flex-col items-start">
            <label className="font-medium mb-2">Description:</label>
            {isEditing ? (
              <textarea
                name="description"
                value={details.description}
                onChange={handleInputChange}
                className="w-full border rounded px-2 py-1"
              />
            ) : (
              <span>{celebrity.description}</span>
            )}
          </div>
          <div className="mt-2 flex gap-3 float-end">
            {isEditing ? (
              <>
                <FaRegCheckCircle
                  onClick={!isDisabled ? handleSave : undefined}
                  className={`text-2xl ${
                    isDisabled
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-green-500 cursor-pointer hover:text-green-600"
                  }`}
                  aria-disabled={isDisabled}
                />

                <MdOutlineCancel
                  onClick={handleCancel}
                  className="text-2xl cursor-pointer text-red-500"
                />
              </>
            ) : (
              <>
                <RiDeleteBin6Line
                  onClick={() => onDelete(celebrity.id)}
                  className="text-2xl cursor-pointer text-red-500"
                />
                <MdOutlineEdit
                  className="text-2xl cursor-pointer text-teal-500"
                  onClick={handleEdit}
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
