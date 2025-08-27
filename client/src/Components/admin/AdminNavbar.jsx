import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../../assets/assets'

const AdminNavbar = () => {
  return (
    <div><div className='flex items-center justify-between px-6 
    md:px-5 h-25 border-b border-gray-300/30'>
        <Link to="/">
            <img src={assets.MainLogo} alt="Logo" className='w-75 h-auto' />
        </Link>
    </div></div>
  )
}

export default AdminNavbar