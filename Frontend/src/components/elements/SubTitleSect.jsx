import PropTypes from 'prop-types'

export default function Subtitle({ children }) {
  return <p className="text-center md:text-xl leading-tight text-orange-950 font-semibold">{children}</p>
}

Subtitle.propTypes = {
  children: PropTypes.string.isRequired
}

