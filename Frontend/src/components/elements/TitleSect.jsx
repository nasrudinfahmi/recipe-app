import PropTypes from 'prop-types'

export default function Title({ children }) {
  return <h1 className="mb-8 text-4xl font-bold text-center text-orange-900">{children}</h1>
}

Title.propTypes = {
  children: PropTypes.string.isRequired
}