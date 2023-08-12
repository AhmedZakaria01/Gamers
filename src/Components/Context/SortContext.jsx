import React from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
export let SortContext = createContext([]);

export default function SortContextProvider(props) {
  const [sort, setSort] = useState([]);

  async function getGamesBySort(x) {
    let response = axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          "sort-by": x,
        },
      }
    );
    let list = { ...sort };
    list = (await response).data;
    setSort(list);
  }

  return (
    <SortContext.Provider value={{ sort, getGamesBySort }}>
      {props.children}
    </SortContext.Provider>
  );
}
