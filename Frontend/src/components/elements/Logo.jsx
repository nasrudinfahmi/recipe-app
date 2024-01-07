import { Link } from "react-router-dom";
import ImgLogo from '../../assets/Logo/icon.svg'

export default function Logo() {
  return (
    <Link to='/' className='flex items-center justify-center' aria-label="Lezat's Logo">
      <img
        className='scale-75'
        src={ImgLogo}
        alt="logo"
        width={55}
        height={55} />
      <span className='font-bold text-3xl pr-2 text-orange-800'>Lezat</span>
    </Link>
  )
}
