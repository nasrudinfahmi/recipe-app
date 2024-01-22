import PropTypes from 'prop-types'
import SearchInput from "../../elements/SearchInput";

export default function CardsSect({ children, totalRecipe = 0 }) {

  return (
    <section className="padding-inline min-h-screen pt-4 sm:pt-20 md:pl-60 lg:pl-72 pb-10">
      <h1 className="text-2xl font-bold text-orange-950 my-3">Resep ku ({totalRecipe})</h1>

      <div className="mt-7">
        <SearchInput />
      </div>

      {children}
    </section>
  )
}

CardsSect.propTypes = {
  children: PropTypes.node.isRequired,
  totalRecipe: PropTypes.number
}