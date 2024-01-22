import { useState } from 'react'
// import Navbar from '../fragments/Navbar'
import Navigations from '../fragments/Navigations'
import { Outlet } from 'react-router-dom'
import BtnHamburger from '../elements/BtnHamburger'
import Header from '../fragments/Header'

export default function HomeLayout() {
  const [isNavActive, setIsNavActive] = useState(false)
  const handleClickHamburger = () => setIsNavActive(prev => !prev)

  return (
    <>
      <Header className='bg-white'>
        <Navigations isActive={isNavActive} />
        <div className='sm:hidden'>
          <BtnHamburger handleClickHamburger={handleClickHamburger} />
        </div>
      </Header>

      <Outlet />
    </>
  )
}

