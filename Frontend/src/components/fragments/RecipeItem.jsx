import PropTypes from 'prop-types'

export default function RecipeItem({ index, title, item }) {
  const isInstruction = window.innerWidth >= 640 && title === 'Instructions'

  return (
    <li key={index} className={`flex gap-2 mt-1 *:text-orange-900 ${isInstruction && 'instructions'}`}>
      <span className="block">{index + 1}.</span>
      <p>{item}</p>
    </li>
  )
}

RecipeItem.propTypes = {
  index: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}
