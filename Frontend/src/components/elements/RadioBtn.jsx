import PropTypes from 'prop-types'

export default function RadioBtn({ text, defaultChecked = false }) {
  return (
    <label htmlFor={text} className="relative block cursor-pointer">
      <input type="radio" name="category" id={text} value={text} className="hidden absolute peer" defaultChecked={defaultChecked} />
      <span className="block w-full py-px sm:py-1 rounded-md border bg-orange-50/50 border-orange-500 peer-checked:font-semibold peer-checked:text-orange-50 peer-checked:bg-orange-500 text-center">{text}</span>
    </label>
  )
}

RadioBtn.propTypes = {
  text: PropTypes.string.isRequired,
  defaultChecked: PropTypes.bool
}
