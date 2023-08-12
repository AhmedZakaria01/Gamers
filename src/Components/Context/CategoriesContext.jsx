import React from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
export let CategoriesContext = createContext([]);

export default function CategoriesContextProvider(props) {
  const [category, setCategory] = useState([]);

  async function getGamesBycategory(x) {
    let response = axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          category: x,
        },
      }
    );
    let list = { ...category };
    list = (await response).data;
    setCategory(list);
  }

  return (
    <CategoriesContext.Provider value={{ category, getGamesBycategory }}>
      {props.children}
    </CategoriesContext.Provider>
  );
}
