import PropTypes from 'prop-types'

export default function Input({ type, placeholder }) {
  return (
    <label htmlFor={type}>
      <input className="w-full px-2 py-1 border border-1 border-orange-500 rounded-md bg-orange-50/50" spellCheck={false} type={type} name={type} id={type} placeholder={placeholder} />
    </label>
  )
}

Input.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired
}
