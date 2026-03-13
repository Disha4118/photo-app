import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center pl-6 pr-6">
      <Link to="/" className="text-2xl font-bold mr-4">
        photoApp
      </Link>
      <SearchBar />
      <Link to="/favourites" className="mt-2">
        Favourites
      </Link>
      <Link to="/watchlist" className="mt-2">
        WatchList
      </Link>
      
    </header>
  );
}