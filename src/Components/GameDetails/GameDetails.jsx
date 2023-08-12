import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameDetails = () => {
  let params = useParams();

  const [GameDetails, setGameDetails] = useState([]);

  async function getGameDetails(x) {
    let response = axios.get(
      `https://free-to-play-games-database.p.rapidapi.com/api/game`,
      {
        headers: {
          "X-RapidAPI-Key":
            "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
          "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
        },
        params: {
          id: params.id,
        },
      }
    );
    let list = { ...GameDetails };
    list = (await response).data;
    setGameDetails(list);
  }


  useEffect(() => {
    getGameDetails(params);
  }, []);

  return (
    <div className="row d-flex align-items-center p-2">
      <section className="col-lg-6 my-3">
        <img
          className="w-100"
          src={GameDetails.thumbnail}
          alt="Game img"
        />
      </section>
      <section className="col-md-6 my-3">
        <h2 className="pb-4 text-danger ">{GameDetails.title}</h2>
        <p className="fs-5 text-light ">
          Description : <br />{" "}
          <span className="fs-6 text-secondary">
            {GameDetails.short_description}
          </span>
        </p>
        <p className="fs-5 text-light ">
          Genre :{" "}
          <span className="fs-6 text-secondary">{GameDetails.genre}</span>
        </p>
        <p className="fs-5 text-light ">
          Platform :{" "}
          <span className="fs-6 text-secondary">
            {GameDetails.platform}
          </span>
        </p>
        <p className="fs-5 text-light ">
          Release Date :{" "}
          <span className="fs-6 text-secondary">
            {GameDetails.release_date}
          </span>
        </p>
        <p className="fs-5 text-light ">
          Developer :{" "}
          <span className="fs-6 text-secondary">
            {GameDetails.developer}
          </span>
        </p>
        <button className="btn btn-secondary w-25">
          <a href={`${GameDetails.game_url}`} className="text-light">
            Visit
          </a>
        </button>
      </section>
    </div>
  );
};

export default GameDetails;
