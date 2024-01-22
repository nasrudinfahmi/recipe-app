import { useEffect, useState } from "react";
import RecipeCard from "../components/fragments/Recipecard";
import CardsSect from "../components/sections/dashboard/CardsSect";
import { useAxiosInterceptor, useRecipeFilter, useUser } from "../hooks";
import { getOwnRecipes } from "../services/RecipeApi";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function DashboardPage() {
  const axiosJwt = useAxiosInterceptor()
  const { user } = useUser()
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    (async function () {
      const { recipes, loading, status } = await getOwnRecipes(axiosJwt, user.idUser)
      if (status === 401 || status === 403) return navigate('/login')
      setRecipes(recipes.datas)
      setLoading(loading)
    })()
  }, [])

  const recipeFood = useRecipeFilter(recipes, searchParams)

  return (
    <CardsSect totalRecipe={recipes?.length}>
      {!loading && recipeFood?.length === 0 && (
        <h1 className='w-full h-64 grid place-content-center'>resep tidak ditemukan</h1>
      )}

      <div className="responsive-my-recipe-wrapper mt-5">
        {!loading && recipeFood?.map((recipe, i) => (
          <RecipeCard
            key={i}
            id={recipe.idRecipe}
            body={recipe.summary}
            title={recipe.title}
            img={recipe.img} />
        ))}
      </div>
    </CardsSect>
  )
}
