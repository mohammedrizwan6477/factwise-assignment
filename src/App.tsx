import { useState, useEffect, useCallback } from "react";
import Celebrities from "./celebrities.json";
import { CELEBRITIES } from "./celebrities.types";
import { SearchBar } from "./Components/SearchBar";
import { CelebrityItem } from "./Components/CelebrityItem";
import { DialogBox } from "./Components/DialogBox";

const calculateAge = (dob: CELEBRITIES["dob"]) => {
  const birthDate = new Date(dob);
  const getDate = Date.now() - birthDate.getTime();
  const ageDate = new Date(getDate);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

function App() {
  const [celebrities, setCelebrities] = useState<CELEBRITIES[]>([]);
  const [filteredCelebrities, setFilteredCelebrities] = useState<CELEBRITIES[]>(
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const [celeId, setCeleId] = useState<number | null>(null);

  useEffect(() => {
    const updatedData = Celebrities.map((celebrity: CELEBRITIES) => ({
      ...celebrity,
      age: calculateAge(celebrity.dob),
    }));
    setCelebrities(updatedData);
    setFilteredCelebrities(updatedData);
  }, []);

  const handleSearch = useCallback(
    (term: string) => {
      if (term === "") {
        setFilteredCelebrities(celebrities);
      } else {
        const filtered = celebrities.filter((celebrity) =>
          celebrity.first.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredCelebrities(filtered);
      }
    },
    [celebrities]
  );

  const handleUpdate = useCallback(
    (updatedCelebrity: CELEBRITIES) => {
      const updatedList = celebrities.map((celebrity) =>
        celebrity.id === updatedCelebrity.id ? updatedCelebrity : celebrity
      );
      setCelebrities(updatedList);
      setFilteredCelebrities(updatedList);
    },
    [celebrities]
  );

  const handleDelete = useCallback((id: number) => {
    setCeleId(id);
    setIsOpen(true);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setCeleId(null);
  };

  const handleConfirm = () => {
    if (celeId !== null) {
      const updatedCelebrities = celebrities.filter(
        (celeb) => celeb.id !== celeId
      );
      setCelebrities(updatedCelebrities);
      setFilteredCelebrities(updatedCelebrities);
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        <div className="w-full max-w-4xl p-6">
          <h3 className="text-2xl font-semibold text-black mb-6">List View</h3>
          <div className="w-full mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>
          <div className="flex flex-col gap-6">
            {filteredCelebrities.map((celebrity) => (
              <CelebrityItem
                key={celebrity.id}
                celebrity={celebrity}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
        {isOpen && (
          <DialogBox
            isOpen={isOpen}
            onClose={handleClose}
            onConfirm={handleConfirm}
          />
        )}
      </div>
    </>
  );
}

export default App;
