import PropTypes from 'prop-types'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeleteConfimationDialog from './DeleteConfimationDialog'
import { getOwnRecipes, getRecipeById } from '../../services/RecipeApi'
import { useAxiosInterceptor, useUser } from '../../hooks'
import TbodyTable from './TbodyTable'
import EditRecipeDialog from './EditRecipeDialog'

export default function TableRecipes({ loading, recipeFood, setRecipes }) {
  const [recipeReadyToDelete, setRecipeReadyToDelete] = useState({})
  const [recipeReadyToEdit, setRecipeReadyToEdit] = useState({})
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isFormEditRecipeDialogOpen, setIsFormEditRecipeDialogOpen] = useState(false)

  const axiosJwt = useAxiosInterceptor()
  const navigate = useNavigate()
  const { user } = useUser()

  const openDialogDeleteRecipe = (idRecipe, title) => {
    setRecipeReadyToDelete({ idRecipe, title })
    setIsDeleteDialogOpen(true)
  }

  const openDialogEditRecipe = async (idRecipe) => {
    const { recipe, status } = await getRecipeById(axiosJwt, idRecipe)
    if (status === 401 || status === 403) return navigate('/login')
    if (status === 404) return setIsFormEditRecipeDialogOpen(false)
    setIsFormEditRecipeDialogOpen(true)
    setRecipeReadyToEdit(recipe)
  }

  const onSuccessEditRecipe = async (status) => {
    if (status === 200) {
      const { recipes, status } = await getOwnRecipes(axiosJwt, user.idUser)
      if (status === 401 || status === 403) {
        return navigate('/login')
      }
      setRecipes(recipes.datas)
      console.log(`Sukses edit resep: ${recipeReadyToEdit?.idRecipe}`)
    }
    setIsFormEditRecipeDialogOpen(false)
  }

  return (
    <>
      <DeleteConfimationDialog
        recipeReadyToDelete={recipeReadyToDelete}
        setRecipes={setRecipes}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen} />

      <EditRecipeDialog
        recipeReadyToEdit={recipeReadyToEdit}
        setRecipeReadyToEdit={setRecipeReadyToEdit}
        isFormEditRecipeDialogOpen={isFormEditRecipeDialogOpen}
        setIsFormEditRecipeDialogOpen={setIsFormEditRecipeDialogOpen}
        onSuccessEditRecipe={onSuccessEditRecipe}
      />

      <table className="mt-6 border w-full table-auto rounded-md overflow-hidden shadow">
        <thead className="bg-orange-50">
          <tr className="border-b divide-x">
            <th className="table-columns">img</th>
            <th className="table-columns">title</th>
            <th className="table-columns">bahan utama</th>
            <th className="table-columns">actions</th>
          </tr>
        </thead>
        <TbodyTable recipes={recipeFood} loading={loading} openDialogDeleteRecipe={openDialogDeleteRecipe} openDialogEditRecipe={openDialogEditRecipe} />
      </table>
    </>
  )
}

TableRecipes.propTypes = {
  loading: PropTypes.bool.isRequired,
  recipeFood: PropTypes.arrayOf(PropTypes.object),
  setRecipes: PropTypes.func.isRequired
}
