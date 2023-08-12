import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../../Components/Navbar/Navbar.module.css";
import { CategoriesContext } from "../Context/CategoriesContext";
import { PlatformsContext } from "../Context/PlatformsContext";
import { SortContext } from '../Context/SortContext'

export default function Navbar({ userData, removeUserData }) {

   const { getGamesByPlatform } = useContext(PlatformsContext)
   const { getGamesBySort } = useContext(SortContext)
   const { getGamesBycategory } = useContext(CategoriesContext)


   return (
      <>

         <nav className={`rounded-2 navbar navbar-default py-3 navbar-expand-lg w-100 p-0 ${styles.navStyle}`}>
            <div className="container d-flex align-items-center  p-0">
               <div className="logo-section">
                  <img className={styles.logo} src={require('../../images/index_thumbnail.png')} alt="img"></img>
                  <Link className="navbar-brand text-danger" to="">
                     GAME OVER
                  </Link>
               </div>

               <button className=" navbar-toggler bgRedColor" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
               </button>

               <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ms-auto mb-lg-0">


                     {userData ?
                        <>

                           <li className="nav-item">
                              <Link className={`text-secondary nav-link ${styles.links}`} to="all">All</Link>
                           </li>

                           <li className="nav-item dropdown">
                              <Link
                                 className={`text-secondary nav-link dropdown-toggle ${styles.links} `}
                                 to="platforms"
                                 role="button"
                                 data-bs-toggle="dropdown"
                                 aria-expanded="false"
                              >
                                 Platforms
                              </Link>
                              <ul className="dropdown-menu">
                                 <li>
                                    <Link onClick={() => getGamesByPlatform('pc')} className='dropdown-item' to="/platforms/pc">
                                       pc
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => getGamesByPlatform('browser')} className='dropdown-item' to="/platforms/browser">
                                       browser
                                    </Link>
                                 </li>
                              </ul>
                           </li>




                           <li className="nav-item dropdown">
                              <Link
                                 className={`text-secondary nav-link dropdown-toggle dropdown-toggle ${styles.links} `}
                                 to="sort-by"
                                 role="button"
                                 data-bs-toggle="dropdown"
                                 aria-expanded="false"
                              >
                                 sort-by
                              </Link>
                              <ul className="dropdown-menu">
                                 <li>
                                    <Link onClick={() => { getGamesBySort('release-date') }} className="dropdown-item" to="sort-by/release-date">
                                       release-date
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBySort('popularity') }} className="dropdown-item" to="sort-by/popularity">
                                       popularity
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBySort('alphabetical') }} className="dropdown-item" to="sort-by/alphabetical">
                                       alphabetical
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBySort('relevance') }} className="dropdown-item" to="sort-by/relevance">
                                       relevance
                                    </Link>
                                 </li>
                              </ul>
                           </li>





                           <li className="nav-item dropdown">
                              <Link
                                 className={`text-secondary nav-link dropdown-toggle dropdown-toggle ${styles.links} `}
                                 to="categories"
                                 role="button"
                                 data-bs-toggle="dropdown"
                                 aria-expanded="false"
                              >
                                 Categories
                              </Link>
                              <ul className="dropdown-menu">
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('racing') }} className="dropdown-item" to="categories/racing">
                                       racing
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('sports') }} className="dropdown-item" to="categories/sports">
                                       sports
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('social') }} className="dropdown-item" to="categories/social">
                                       social
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('shooter') }} className="dropdown-item" to="categories/shooter">
                                       shooter
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('open-world') }} className="dropdown-item" to="categories/open-world">
                                       open-world
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('zombie') }} className="dropdown-item" to="categories/zombie">
                                       zombie
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('fantasy') }} className="dropdown-item" to="categories/fantasy">
                                       fantasy
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('action-rpg') }} className="dropdown-item" to="categories/action-rpg">
                                       action-rpg
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('action') }} className="dropdown-item" to="categories/action">
                                       action
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('flight') }} className="dropdown-item" to="categories/flight">
                                       flight
                                    </Link>
                                 </li>
                                 <li>
                                    <Link onClick={() => { getGamesBycategory('battle-royale') }} className="dropdown-item" to="categories/battle-royale">
                                       battle-royale
                                    </Link>
                                 </li>
                              </ul>
                           </li>

                        </>
                        : null
                     }

                     <div className="btns-section ">
                        {userData ? <button onClick={() => removeUserData()} className="btn mx-2"><Link className="text-danger" to='/login'>Logout</Link></button>
                           : <>

                           </>}
                     </div>

                  </ul>

               </div>


            </div>
         </nav>
      </>
   );
}
