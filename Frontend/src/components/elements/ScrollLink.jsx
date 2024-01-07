import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function ScrollLink({ navigation, isActive }) {
  return (
    <>
      {navigation.title === 'Dashboard' ? (
        <li>
          <Link to={navigation.href} aria-label={navigation.label} className={`${isActive ? "opacity-100" : "opacity-0"} navigation`}>{navigation.title}</Link>
        </li>
      ) : (
        <li>
          <a href={navigation.href} aria-label={navigation.label} className={`${isActive ? "opacity-100" : "opacity-0"} navigation`}>{navigation.title}</a>
        </li>
      )}
    </>
  )
}

ScrollLink.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.string).isRequired,
  isActive: PropTypes.bool.isRequired
}

