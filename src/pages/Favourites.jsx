import React, { useEffect, useState } from "react";
import { loadFromStorage } from "../services/localstorage";
import PhotoCard from "../components/PhotoCard";
import { searchMovies } from "../services/api";
function Favourites (){
  const [movies, setMovies] = useState([]);
    useEffect(() => {
      const fetchMovies = async () => {
        const moviees = await searchMovies();
        setMovies(moviees.Search || []);
      };
      fetchMovies();
    }, []);
    const data=loadFromStorage("favorites", []);
    console.log(data);
  return(
    <div>
        {
          data.map((movieId)=>(
            movies.filter((movie)=>movie.id===movieId)).map((movie)=>(
            <div key={movie.id}>
              <PhotoCard movie={movie} />
            </div>
            )))
        }
    </div>
  )
}
export default Favourites;
