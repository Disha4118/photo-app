// src/services/api.js
const BASE_URL = "https://picsum.photos/v2";
const DEFAULT_LIMIT = 30;

const normalizeTerm = (term) => (term || "").trim().toLowerCase();

export const searchMovies = async (searchTerm, page = 1) => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: DEFAULT_LIMIT.toString(),
  });

  const response = await fetch(`${BASE_URL}/list?${params.toString()}`);
  if (!response.ok) {
    throw new Error("Failed to fetch photos.");
  }

  const data = await response.json();
  const term = normalizeTerm(searchTerm);
  const filtered = term
    ? data.filter((photo) => {
        const idMatch = String(photo.id).includes(term);
        const authorMatch = (photo.author || "").toLowerCase().includes(term);
        return idMatch || authorMatch;
      })
    : data;

  return {
    Search: filtered,
    totalResults: filtered.length.toString(),
  };
};

export const getMovieDetails = async (photoId) => {
  if (!photoId) {
    throw new Error("Missing photo id.");
  }

  const response = await fetch(`${BASE_URL}/id/${photoId}/info`);
  if (!response.ok) {
    throw new Error("Failed to fetch photo details.");
  }

  return response.json();
};