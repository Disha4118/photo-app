export const API_BASE_URL = "https://picsum.photos/v2";

export const MOVIE_TYPES = {
  ALL: "all",
  MOVIE: "movie",
  SERIES: "series",
  EPISODE: "episode",
};

export const YEARS = [
  "all",
  ...Array.from({ length: 35 }, (_, i) => (2024 - i).toString()),
];

export const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/600x400?text=No+Image";
