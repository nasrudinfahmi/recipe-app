import PropTypes from 'prop-types'
import Navbar from './Navbar'

export default function Header({ children, className }) {
  return (
    <header className={`${className} w-full border-b sm:absolute sm:top-0`}>
      <Navbar>
        {children}
      </Navbar>
    </header>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}
