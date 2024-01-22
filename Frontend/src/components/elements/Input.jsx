import PropTypes from 'prop-types'

export default function Input({ type, placeholder, id }) {
  return (
    <label htmlFor={id}>
      <input
        type={type}
        name={type}
        id={id}
        spellCheck={false}
        placeholder={placeholder}
        className="w-full px-2 py-1 border border-1 border-orange-500 rounded-md bg-orange-50/50" />
    </label>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired
}
