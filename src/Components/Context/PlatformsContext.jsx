import React from "react";
import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
export let PlatformsContext = createContext([]);

export default function PlatformsContextProvider(props) {
  const [platform, setPlatform] = useState([]);

  async function getGamesByPlatform(x) {
    let response = axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/games`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          platform: x,
        },
      }
    );
    let list = { ...platform };
    list = (await response).data;
    setPlatform(list);
  }

  return (
    <PlatformsContext.Provider value={{ platform, getGamesByPlatform }}>
      {props.children}
    </PlatformsContext.Provider>
  );

}
