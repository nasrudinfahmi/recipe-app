import Title from '../../elements/TitleSect'
import Subtitle from '../../elements/SubTitleSect'
import FormRecipe from '../../fragments/FormRecipe'
import RecipeCard from '../../fragments/Recipecard';
import { useEffect, useMemo, useState } from 'react';
import { getRecipes, getRecipesByTitleOrMainIngre } from '../../../services/RecipeApi';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAxiosInterceptor } from '../../../hooks';

export default function RecipeSect() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams();
  const axiosJwt = useAxiosInterceptor()
  const navigate = useNavigate()

  useEffect(() => {
    (async function () {
      const mainIngre = searchParams.get('mainIngre')
      const title = searchParams.get('title')

      if (!title && !mainIngre) {
        const { recipes, loading } = await getRecipes()
        setRecipes(recipes)
        setLoading(loading)
      }

      if (!title && mainIngre) {
        const { recipes, loading, status } = await getRecipesByTitleOrMainIngre(axiosJwt, 'mainIngre', mainIngre)
        if (status === 401 || status === 403) return navigate('/login')
        setRecipes(recipes)
        setLoading(loading)
      }

      if (!mainIngre && title) {
        const { recipes, loading, status } = await getRecipesByTitleOrMainIngre(axiosJwt, 'title', title)
        if (status === 401 || status === 403) return navigate('/login')
        setRecipes(recipes)
        setLoading(loading)
      }
    })()
  }, [searchParams])

  const recipeFood = useMemo(() => recipes, [recipes])

  return (
    <section className='min-h-screen mt-32' id='recipe'>
      <Title>Resep</Title>
      <Subtitle>Temukan Beragam Resep Praktis dan Lezat untuk Setiap Kesempatan</Subtitle>
      <div className='mt-8'>
        <FormRecipe />
      </div>

      {loading && <span className='block w-7 h-7 md:w-9 md:h-9 rounded-full mt-16 border-2 border-t-orange-500 animate-loading' />}
      {!recipeFood && <h1 className='w-full h-64 grid place-content-center'>resep tidak ditemukan</h1>}
      <div className='responsive-recipe-wrapper mt-16'>
        {!loading && recipeFood?.map((recipe, index) => (
          <RecipeCard key={index} id={recipe.idRecipe} body={recipe.summary} title={recipe.title} img={recipe.img} />
        ))}
      </div>
    </section>
  )
}
