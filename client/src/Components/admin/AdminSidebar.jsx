import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const AdminSidebar = () => {

  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  }

  const adminNavLinks = [
    { name: 'Dashboard', to: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', to: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', to: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', to: '/admin/list-bookings', icon: ListCollapseIcon },
  ]

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13
    max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
      
      {/* Profile */}
      <img 
        className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' 
        src={user.imageUrl} 
        alt="sidebar"
      />
      <p className='mt-2 text-base max-md:hidden'>
        {user.firstName} {user.lastName}
      </p>

      {/* Nav Links */}
      <div className='w-full'>
        {adminNavLinks.map((link, index) => (
          <NavLink 
            key={index}
            to={link.to}
            className={({ isActive }) => 
              `relative flex items-center max-md:justify-center gap-2 
              w-full py-2.5 min-md:pl-10 first:mt-6 text-gray-400
              ${isActive ? 'bg-primary/15 text-white group border-r-2 border-red-700' :''}`
            }
          >
            <link.icon className='w-5 h-5' />
            <p className='max-md:hidden'>{link.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
