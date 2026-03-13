import React,{useState} from "react";
import { useDebounce } from "../hooks/useDebounce";
import { searchMovies } from "../services/api";
import PhotoGrid from "../components/PhotoGrid";
export default function Home() {
  return <>
    <PhotoGrid className="m-4"/>
    <h1>hi</h1>
  </>
}