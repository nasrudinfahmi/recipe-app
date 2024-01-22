import { useEffect, useRef, useState } from 'react'
import AsideAdmin from '../fragments/AsideAdmin'
import { Outlet, useNavigate } from 'react-router-dom'
import BtnHamburger from '../elements/BtnHamburger'
import Header from '../fragments/Header'
import { refreshToken } from '../../services/RecipeApi'
import { useUser } from '../../hooks'
import Loading from './Loading'

export default function DashboardLayout() {
  const [isMenuAsideActive, setIsMenuAsideActive] = useState(false)
  const asideRef = useRef()
  const navigate = useNavigate()
  const { handleSetToken } = useUser()
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    (async function () {
      const token = await refreshToken()
      if (!token) navigate('/login', { replace: true })
      handleSetToken(token)
      setLoading(false)
    })()
  }, [])

  if (loading) return <Loading />

  return (
    <>
      <Header className='md:pl-[200px] lg:pl-[222px] bg-white z-[30]'>
        <div className='md:hidden'>
          <BtnHamburger handleClickHamburger={manipulateClassList} />
        </div>
      </Header>

      <main className='bg-orange-50/20'>
        <AsideAdmin asideRef={asideRef} toggleMenus={isMenuAsideActive} manipulateClassList={manipulateClassList} />
        <Outlet />
      </main>
    </>
  )
}

