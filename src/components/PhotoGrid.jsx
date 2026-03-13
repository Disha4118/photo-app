import React, { useEffect, useState } from "react";
import PhotoCard from "./PhotoCard";
import Pagination from "./Pagination";
import { searchMovies } from "../services/api";

function PhotoGrid() {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 30;
  const totalPages = Math.ceil(movies.length / itemsPerPage) || 1;
  const pagedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await searchMovies("", 1);
        setMovies(data.Search || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 ml-3">
        {pagedMovies.map((movie) => (
          <div key={movie.id}>
            <PhotoCard movie={movie} />
          </div>
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default PhotoGrid;
