import PropTypes from 'prop-types'
import { Link, useNavigate } from "react-router-dom"
import { LINK_DASHBOARD } from '../../utils/constant'
import { deleteAccount, logout } from '../../services/RecipeApi'
import { useAxiosInterceptor, useUser } from '../../hooks/index'
import deleteProfileIcon from '../../assets/Icons/profile-delete.svg'
import logoutIcon from '../../assets/Icons/logout.svg'

export default function ListMenusAside({ manipulateClassList }) {
  const { user } = useUser()
  const axiosJwt = useAxiosInterceptor()
  const navigate = useNavigate()

  function handleClickLink() {
    manipulateClassList()
  }

  const handleLogout = async () => {
    try {
      await logout(axiosJwt)
      navigate('/login', { replace: true })
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(axiosJwt, { email: user.email })
      navigate('/register', { replace: true })
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {LINK_DASHBOARD.map((link, i) => (
        <li key={i} className='list-style-admin'>
          <Link aria-label={link.title} title={link.title} onClick={handleClickLink} to={link.path} className="border w-full flex items-center gap-2 p-3 rounded-md bg-neutral-50/40 hover:shadow-sm hover:bg-orange-500/10">
            <img src={link.icon} alt={`icon ${link.title}`} width={27} height={27} />
            <span>{link.title}</span>
          </Link>
        </li>
      ))}
      <li className='list-style-admin'>
        <button aria-label='keluar' title='keluar' className='w-full border p-3 rounded-md text-left flex items-center gap-2 bg-neutral-50/40 hover:shadow-sm hover:bg-orange-500/10' onClick={handleLogout}>
          <img src={logoutIcon} alt="keluar" width={27} height={27} />
          <span>Keluar</span>
        </button>
      </li>
      <li className='list-style-admin absolute bottom-0'>
        <button aria-label='hapus akun' title='hapus akun' className='w-full border p-3 rounded-md text-left flex items-center gap-2 bg-neutral-50/40 hover:shadow-sm hover:bg-orange-500/10' onClick={handleDeleteAccount}>
          <img src={deleteProfileIcon} alt="hapus akun icon" width={27} height={27} />
          <span>Hapus akun</span>
        </button>
      </li>
    </>
  )
}

ListMenusAside.propTypes = {
  manipulateClassList: PropTypes.func.isRequired
}