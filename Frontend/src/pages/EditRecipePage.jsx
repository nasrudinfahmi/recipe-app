import { useEffect, useState } from "react";
import CardsSect from "../components/sections/dashboard/CardsSect";
import { useAxiosInterceptor, useRecipeFilter, useUser } from "../hooks";
import { getOwnRecipes } from "../services/RecipeApi";
import TableRecipes from "../components/fragments/TableRecipes";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function EditRecipePage() {
  const axiosJwt = useAxiosInterceptor()
  const { user } = useUser()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    (async function () {
      const { recipes, loading, status } = await getOwnRecipes(axiosJwt, user.idUser)
      if (status === 401 || status === 403) {
        return navigate('/login')
      }
      setRecipes(recipes.datas)
      setLoading(loading)
    })()
  }, [])

  const recipeFood = useRecipeFilter(recipes, searchParams)

  return (
    <CardsSect totalRecipe={recipes?.length}>
      <div className="w-full min-h-min overflow-x-auto">
        <TableRecipes loading={loading} recipeFood={recipeFood} setRecipes={setRecipes} />
      </div>
    </CardsSect>
  )
}
