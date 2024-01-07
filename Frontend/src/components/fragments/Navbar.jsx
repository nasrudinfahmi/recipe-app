import PropTypes from 'prop-types'
import Logo from '../elements/Logo'

export default function Navbar({ children }) {
  return (
    <nav className='navbar-style'>
      <Logo />
      {children}
    </nav>
  )
}

Navbar.propTypes = {
  children: PropTypes.node
}