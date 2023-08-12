import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CategoriesContext } from '../Context/CategoriesContext'

export default function Platforms() {
    const { category } = useContext(CategoriesContext)

    return (
        <>
            {category.length > 0 ?

                <section className='content'>
                    <div className="container">
                        <div className="row g-3">
                            {category.map((game, key) =>
                                <div className="col-sm-12 col-md-3" key={key}>

                                    <Link
                                        to={`/details/${game.id}`}
                                        key={game.id}
                                        className={`item   mx-auto `} >

                                        <div className="game bg-game">
                                            <div className="img">
                                                <img className='w-100 rounded' src={game.thumbnail} alt="" />
                                            </div>
                                            <div className='d-flex justify-content-between align-items-center py-1'>
                                                <h5 className='text-light fw-light  py-2 mx-auto '>{game.title.slice(0, 18)}</h5>
                                            </div>
                                        </div>

                                    </Link>

                                </div>
                            )}
                        </div>
                    </div>
                </section>
                :
                <div className='position-fixed top-0 start-0 bottom-0 end-0 d-flex align-items-center justify-content-center'>
                    <i className=' fas fa-spinner fa-spin fs-4 text-danger'></i>
                </div>

            }

        </>
    );
}
