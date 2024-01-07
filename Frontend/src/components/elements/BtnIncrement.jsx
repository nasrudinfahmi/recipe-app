import PropTypes from 'prop-types'

export default function BtnIncrement({ text, ariaLabel, className }) {
  return (
    <button className={`${className} px-2 py-1 text-sm sm:text-base rounded-md text-white`} type="button" aria-label={ariaLabel}>{text}</button>
  )
}

BtnIncrement.propTypes = {
  text: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
}
