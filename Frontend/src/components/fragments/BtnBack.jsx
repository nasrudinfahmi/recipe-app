import { Link } from "react-router-dom";
import BackIcon from '../../assets/Icons/backIcon.svg'

export default function BtnBack() {
  return (
    <div className="absolute left-0 w-12 lg:w-14 h-full bg-gradient-to-r from-slate-950/50 to-transparent lg:opacity-0 lg:group-hover:opacity-100 origin-left transition-opacity">
      <Link
        to={-1}
        preventScrollReset={false}
        aria-label="kembali ke halaman sebelumnya"
        className="absolute w-8 h-8 lg:w-10 left-0 lg:h-10 top-1/2 -translate-y-1/2 bg-white/15 rounded-full lg:opacity-0 lg:group-hover:opacity-100 origin-left transition-opacity"
      >
        <img src={BackIcon}
          className=""
          alt="backIcon.svg"
          width={100}
          height={100} />
      </Link>
    </div>
  )
}
