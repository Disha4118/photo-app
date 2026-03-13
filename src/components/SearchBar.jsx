import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [val, setVal] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (val.trim()) {
      navigate(`/search?q=${encodeURIComponent(val)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        placeholder="Search photo"
        className="border px-3 py-2 rounded w-64"
        value={val}
        onChange={(e) => setVal(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition"
      >
        Search
      </button>
    </form>
  );
}
