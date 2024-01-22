import PropTypes from 'prop-types'

export default function BtnIncrement({ text, ariaLabel, className, onClick }) {
  return (
    <button className={`${className} px-2 py-1 text-sm sm:text-base rounded-md`} type="button" aria-label={ariaLabel} onClick={onClick}>{text}</button>
  )
}

BtnIncrement.propTypes = {
  text: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired
}
