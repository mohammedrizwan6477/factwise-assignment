import React from "react";
import { DIALOGMODEL } from "../celebrities.types";
import { RxCross2 } from "react-icons/rx";

export const DialogBox: React.FC<DIALOGMODEL> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full">
        <div className="flex justify-between justify-items-center">
        <h2 className="text-sm mb-4">
          Are you Sure You want to delete ?
        </h2>
        <RxCross2 onClick={onClose} className="cursor-pointer text-xl"/>
        </div>
        <div className="flex justify-end space-x-4 mt-10">
          <button
            onClick={onClose}
            className="bg-white border text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-orange-400 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
