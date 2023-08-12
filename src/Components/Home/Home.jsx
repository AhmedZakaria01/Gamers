import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import homeImage from '../../images/welcome-1.jpg'
export default function Home() {
  console.log();
  const [trendingGames, setTrendingGames] = useState([])
  useEffect(() => {
    return () => {
      getTrendingGames()
    }
  }, [])

  let getTrendingGames = async () => {
    let response = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games',
      {
        headers: {
          'X-RapidAPI-Key':
            'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      })
    const result = response.data.slice(2, 14)
    let games = { ...trendingGames }
    games = result
    setTrendingGames(games)


  }

  return (


    <>
      <div className="container-fluid p-0 ">
        <div className="row m-0 w-100 position-relative">

          <div className={`${styles.header} bg-dark mx-auto  text-center py-5 `}>
            <div className={`${styles.layer}`}></div>
            <h2 className='fs-1 my-3'>Find & track the best <span className='fs-1 text-danger'>Free-To-Play</span> games!</h2>
            <h6 className='  my-3 '>Track what you've played and search for what to play next! Plus get free premium loot!</h6>
            <Link to='all' className={`btn btn-warning my-3 fw-bold  ${styles.headerBtn}`}> Browse Games </Link>
          </div>
        </div>



        <section className='py-3'>

          <div className='row g-4'>
            {trendingGames.length < 0 ? trendingGames.map((item, index) =>
              <div key={index} className={`item col-md-4 col-lg-4  mx-auto`}>
                <img className='w-100 rounded' src={item.thumbnail} alt="" />
                <div className='d-flex justify-content-between align-items-center py-1'>
                  <h5 className='text-light fw-light  py-2 mx-auto '>{item.title.slice(0, 18)}</h5>
                </div>
              </div>
            ) : <div>
              <div className='text-danger text-center mb-5'>
                <h2 className='text-light'>Welcome Gamers To Our Website  </h2>
                <h3 className='text-light'>Sign Up And Lets Get Started <span className='text-danger fs-1'>&#9829;</span> </h3>
              </div>
              <img src={homeImage} alt='' className='w-100 rounded-4 opacity-50'></img>
            </div>}
          </div>
        </section>
      </div>
    </>
  )
}
