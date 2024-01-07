import PropTypes from 'prop-types'
import HamburgerMenu from '../../assets/Icons/hamburgerMenu.svg'

export default function BtnHamburger({ handleClickHamburger }) {
  return (
    <button type="button" aria-label='hamburger menu' onClick={handleClickHamburger}>
      <img src={HamburgerMenu} alt="hamburger menu" width={30} height={30} />
    </button>
  )
}

BtnHamburger.propTypes = {
  handleClickHamburger: PropTypes.func.isRequired
}
