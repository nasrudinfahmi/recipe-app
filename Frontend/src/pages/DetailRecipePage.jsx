import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAxiosInterceptor } from "../hooks"
import { getRecipeById } from "../services/RecipeApi"
import DetailRecipeLayout from "../components/layouts/DetailRecipeLayout"
import Loading from "../components/layouts/Loading"
import NotFound from "./404"

export default function DetailRecipePage() {
  const { idRecipe } = useParams()
  const axiosJwt = useAxiosInterceptor()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    (async function () {
      const { recipe, loading, status } = await getRecipeById(axiosJwt, idRecipe)
      if (status === 401 || status === 403) {
        return navigate('/login', { replace: true })
      }
      setRecipe(recipe)
      setLoading(loading)
    })()
  }, [idRecipe, navigate])

  if (loading) return <Loading />
  if (!recipe && !loading) return <NotFound />

  return (
    <>
      {recipe && !loading && (
        <DetailRecipeLayout recipe={recipe} />
      )}
    </>
  )
}
