import PropTypes from 'prop-types'
import ListMenusAside from './ListMenusAside'

export default function AsideAdmin({ toggleMenus, manipulateClassList, asideRef }) {
  console.log(toggleMenus);
  return (
    <aside>
      <ul className={`position-aside-admin bg-red-50 w-2/3 h-screen ${toggleMenus ? "-translate-x-0" : "-translate-x-full"} z-50 md:-translate-x-0 md:w-52 lg:w-60`} >
        <ListMenusAside manipulateClassList={manipulateClassList} />
      </ul>
      <div className={`hidden fixed top-0 right-0 w-full h-screen opacity-0 bg-slate-600/50 d-300`} onClick={manipulateClassList} ref={asideRef} />
    </aside>
  )
}

AsideAdmin.propTypes = {
  toggleMenus: PropTypes.bool.isRequired,
  manipulateClassList: PropTypes.func.isRequired,
  asideRef: PropTypes.object.isRequired
}