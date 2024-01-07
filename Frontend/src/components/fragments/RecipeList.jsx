import PropTypes from 'prop-types'
import RecipeItem from './RecipeItem'

export default function RecipeList({ title, items }) {
  return (
    <>
      <h1 className="text-xl font-semibold mb-4 text-orange-950">{title}</h1>
      <ul className="pb-5">
        {items.map((item, i) => (
          <RecipeItem key={i} index={i} title={title} item={item} />
        ))}
      </ul>
    </>
  )
}

RecipeList.propTypes = {
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired
}
