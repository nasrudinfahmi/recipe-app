import PropTypes from 'prop-types'
import { Link } from "react-router-dom"
import { LINK_DASHBOARD } from '../../utils/constant'

export default function ListMenusAside({ manipulateClassList }) {
  async function handleClickLink(e) {
    const target = e.target.innerHTML
    if (target === 'Keluar') {
      console.log('keluar')
    }
    if (target === 'Hapus Akun') {
      console.log('Hapus Akun')
    }

    manipulateClassList()
  }

  return (
    <>
      {LINK_DASHBOARD.map((link, i) => (
        <li key={i} className={`w-full leading-none my-3 text-lg px-[3%] ${link.title === 'Hapus Akun' && 'absolute bottom-0'}`}>
          <Link onClick={handleClickLink} to={link.path} className="border w-full block p-3 rounded-md">{link.title}</Link>
        </li>
      ))}
    </>
  )
}

ListMenusAside.propTypes = {
  manipulateClassList: PropTypes.func.isRequired
}