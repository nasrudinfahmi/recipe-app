import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import LoadingTbody from './LoadingTbody'

function TbodyTable({ recipes, loading, openDialogDeleteRecipe, openDialogEditRecipe }) {
  if (loading) return <LoadingTbody />
  return (
    <tbody>
      {!loading && recipes?.map((recipe, i) => (
        <tr key={i} className="*:text-center *:leading-tight divide-x odd:bg-white even:bg-orange-50">
          <td className="table-columns flex">
            <Link
              to={`/recipe/${recipe.idRecipe}`}
              title='lihat resep'
              aria-label={`Lihat resep ${recipe.title}`}
              className="m-auto w-12 h-12 sm:w-16 sm:h-16 rounded-lg">
              <img className="aspect-square object-cover object-center w-full h-full rounded-lg" width={100} height={100} src={recipe.img} alt={recipe.title + 'image'} />
            </Link>
          </td>
          <td className="table-columns">{recipe.title}</td>
          <td className="table-columns">{recipe.main_ingredient}</td>
          <td className="table-columns">
            <div className="flex gap-1 px-2">
              <button
                title='Hapus resep'
                aria-label={`hapus resep ${recipe.title}`}
                className="table-btn-action bg-orange-600 text-white"
                onClick={() => openDialogDeleteRecipe(recipe.idRecipe, recipe.title)}>
                delete
              </button>
              <button
                title='ubah resep'
                aria-label={`ubah resep ${recipe.title}`}
                className="table-btn-action bg-white"
                onClick={() => openDialogEditRecipe(recipe.idRecipe)}>
                ubah
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  )
}

TbodyTable.propTypes = {
  recipes: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  openDialogDeleteRecipe: PropTypes.func.isRequired,
  openDialogEditRecipe: PropTypes.func.isRequired,
}

export default TbodyTable
