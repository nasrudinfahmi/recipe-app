import PropTypes from 'prop-types'
import { NAVIGATION } from '../../utils/constant'
import ScrollLink from '../elements/ScrollLink'

export default function Navigations({ isActive }) {
  return (
    <ul className={`${isActive ? 'scale-y-100 opacity-100' : 'opacity-0 scale-y-0'} menus-navigation`}>
      {NAVIGATION.map(navigation => (
        <ScrollLink key={navigation.title} navigation={navigation} isActive={isActive} />
      ))}
    </ul>
  )
}

Navigations.propTypes = {
  isActive: PropTypes.bool
}