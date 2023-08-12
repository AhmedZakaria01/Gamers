import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';

export default function Master({ userData, removeUserData }) {

  return (
    <>
      <div className='w-100 mx-auto'>
        <Navbar userData={userData} removeUserData={removeUserData} />
        <div className='container mx-auto'>
          <Outlet />
        </div>
      </div>

    </>
  )
}
