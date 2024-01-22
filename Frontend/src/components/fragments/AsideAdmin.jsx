import PropTypes from 'prop-types'
import ListMenusAside from './ListMenusAside'
import { useUser } from '../../hooks';
import defaultAvatar from '../../assets/imgs/defaultAvatar.svg'
import { Link } from 'react-router-dom';

export default function AsideAdmin({ toggleMenus, manipulateClassList, asideRef }) {
  const { user } = useUser()
  const avatar = user.img ? user.img : defaultAvatar

  return (
    <aside>
      <ul className={`position-aside-admin bg-orange-50 shadow-lg w-2/3 h-screen ${toggleMenus ? "-translate-x-0" : "-translate-x-full"} z-[100] md:-translate-x-0 md:w-52 lg:w-60`} >
        <Link to="/dashboard" aria-label='profil saya' title='profil saya' className='px-[3%] mb-6 flex gap-2 item-center'>
          <img className='basis-11 h-11 shrink-0 rounded-full' src={avatar} alt="default avatar" width={44} height={44} />
          <div className='basis-4/5 shrink-1 *:leading-tight overflow-hidden'>
            <p className='font-semibold text-orange-950 line-clamp-1'>{user.username}</p>
            <p className='mt-0.5 w-full text-sm text-slate-600 line-clamp-1'>Edit Profil</p>
          </div>
        </Link>
        <ListMenusAside manipulateClassList={manipulateClassList} />
      </ul>
      <div className={`z-[99] hidden fixed top-0 right-0 w-full h-screen opacity-0 bg-slate-600/50 d-300`} onClick={manipulateClassList} ref={asideRef} />
    </aside>
  )
}

AsideAdmin.propTypes = {
  toggleMenus: PropTypes.bool.isRequired,
  manipulateClassList: PropTypes.func.isRequired,
  asideRef: PropTypes.object.isRequired
}