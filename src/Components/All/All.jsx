import axios from "axios";
import { func } from "joi";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function All() {
  const [allGames, setAllGames] = useState([]);
  useEffect(() => {
    let getAllGames = async () => {
      let result = await axios.get(
        "https://free-to-play-games-database.p.rapidapi.com/api/games",
        {
          headers: {
            "X-RapidAPI-Key":
              "b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68",
            "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
          },
        }
      );

      let games = { ...allGames };
      games = result.data;
      setAllGames(games);
    };

    getAllGames();

  }, []);

  return (
    <>

      {allGames.length > 0 ?

        <div className="row g-3 ">
          {allGames.slice(0, 100).map((item, index) => (
            <div className="col-sm-12 col-md-4 col-lg-3 col-xxl-2" key={index}>
              <Link
                to={`/details/${item.id}`}

                className={`item mx-auto`}
              >
                <img className="w-100 rounded" src={item.thumbnail} alt="" />
                <div className="d-flex justify-content-between align-items-center py-1">
                  <h5 className="text-light fw-light  py-2 mx-auto ">
                    {item.title.slice(0, 18)}
                  </h5>
                </div>

              </Link>
            </div>
          ))}
        </div>
        :


        <div className='position-fixed top-0 start-0 bottom-0 end-0 d-flex align-items-center justify-content-center'>
          <i className=' fas fa-spinner fa-spin fs-4 text-danger'></i>
        </div>

      }

    </>
  );
}
