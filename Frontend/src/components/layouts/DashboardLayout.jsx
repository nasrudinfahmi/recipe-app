import { useRef, useState } from 'react'
import AsideAdmin from '../fragments/AsideAdmin'
import { Outlet } from 'react-router-dom'
import BtnHamburger from '../elements/BtnHamburger'
import Header from '../fragments/Header'

export default function DashboardLayout() {
  const [isMenuAsideActive, setIsMenuAsideActive] = useState(false)
  const asideRef = useRef()

  function manipulateClassList() {
    const target = asideRef.current.classList;

    setIsMenuAsideActive(prev => !prev)
    if (window.innerWidth < 768) {
      if (target.contains('hidden')) {
        target.remove('hidden')
        setTimeout(() => {
          target.replace('opacity-0', 'opacity-100')
        }, 100);
      } else {
        target.replace('opacity-100', 'opacity-0')
        setTimeout(() => {
          target.add('hidden')
        }, 200);
      }
    } else {
      setIsMenuAsideActive(false)
      if (target.contains('opacity-100')) {
        target.add('hidden')
        target.replace('opacity-100', 'opacity-0')
      }
    }
  }

  return (
    <>
      <Header className='md:pl-[200px] lg:pl-[222px]'>
        <div className='md:hidden'>
          <BtnHamburger handleClickHamburger={manipulateClassList} />
        </div>
      </Header>

      <main>
        <AsideAdmin asideRef={asideRef} toggleMenus={isMenuAsideActive} manipulateClassList={manipulateClassList} />
        <Outlet />
      </main>
    </>
  )
}

