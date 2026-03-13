import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { getPosterUrl } from "../utils/helpers";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite, addToWatchlist } from "../store/slices/userSlice";
import fav from "../assets/love.png";
import bookmark from "../assets/save.png";
import liked from "../assets/liked.jpg";
import saved from "../assets/saved.png";
import LoadingSkeleton from "../components/LoadingSkeleton";



export default function PhotoDetails() {
  const {favorites,watchlist}=useSelector((state)=>state.user);
  const { photoId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favourite, setFavourite] = useState(favorites.includes(photoId) ? liked : fav);
  const [watchlistIcon, setWatchlistIcon] = useState(watchlist.includes(photoId) ? saved : bookmark);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(photoId);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [photoId]);

  const handleFav = (id) => {
    dispatch(toggleFavorite(id));
    setFavourite(favourite === fav ? liked : fav);
  };

  const handleWatch = (id) => {
    dispatch(addToWatchlist(id));
    setWatchlistIcon(watchlistIcon === bookmark ? saved : bookmark);
  };

  if (loading) return <LoadingSkeleton />;

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl mb-4">Error: {error}</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-gray-500 text-xl mb-4">Photo not found</p>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
          <div className="md:col-span-1">
            <img
              src={getPosterUrl(movie.download_url)}
              alt={movie.author}
              className="w-full rounded-lg shadow-md"
            />
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleFav(movie.id)}
                className="flex-1 flex items-center justify-center bg-pink-100 hover:bg-pink-200 rounded-lg p-3 transition"
              >
                <img
                  src={favourite}
                  alt="Favorite"
                  className="h-8 w-8"
                />
              </button>
              <button
                onClick={() => handleWatch(movie.id)}
                className="flex-1 flex items-center justify-center bg-indigo-100 hover:bg-indigo-200 rounded-lg p-3 transition"
              >
                <img
                  src={watchlistIcon}
                  alt="Watchlist"
                  className="h-8 w-8"
                />
              </button>
            </div>
          </div>

          {/* Details */}
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{movie.author}</h1>
            <p className="text-gray-600 text-lg mb-4">
              Photo ID: {movie.id}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dimensions</h3>
              <p className="text-gray-700">{movie.width} x {movie.height}</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Source Page</h3>
              <a
                href={movie.url}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {movie.url}
              </a>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Author</h3>
                <p className="text-gray-700">{movie.author}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Download</h3>
                <a
                  href={movie.download_url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline break-all"
                >
                  {movie.download_url}
                </a>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Preview</h3>
              <p className="text-gray-700">High-resolution photo from Lorem Picsum.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}