import { MdOutlineSearch } from "react-icons/md";
import { SEARCHBAR } from "../celebrities.types";

export const SearchBar: React.FC<SEARCHBAR> = ({ onSearch }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Search User"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3">
        <MdOutlineSearch className="text-xl" />
      </div>
    </div>
  );
};
