import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/api";
import PhotoCard from "../components/PhotoCard";
import Pagination from "../components/Pagination";
import LoadingSkeleton from "../components/LoadingSkeleton";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalResults, setTotalResults] = useState(0);
  const searchTerm = searchParams.get("q");
  const currentPage = parseInt(searchParams.get("page") || "1");
  const itemsPerPage = 30;
  const totalPages = Math.ceil(totalResults / itemsPerPage);
  const pagedMovies = movies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    if (!searchTerm) {
      setMovies([]);
      setTotalResults(0);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await searchMovies(searchTerm, 1);
        setMovies(data.Search || []);
        setTotalResults(parseInt(data.totalResults) || 0);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovies([]);
        setTotalResults(0);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  const handlePageChange = (page) => {
    setSearchParams({ q: searchTerm, page: page.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!searchTerm) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl">Enter a search term to find photos</p>
      </div>
    );
  }

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl">No photos found for "{searchTerm}"</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-2">
        Search Results for "{searchTerm}"
      </h1>
      <p className="text-gray-600 mb-6">
        Found {totalResults} photos • Page {currentPage} of {totalPages || 1}
      </p>
      <div className="grid grid-cols-3 gap-4">
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
