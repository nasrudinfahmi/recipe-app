import PropTypes from 'prop-types'
import { Suspense, useEffect } from "react";
import BtnBack from "../fragments/BtnBack";
import DetailSect from "../sections/DetailRecipe/DetailSect";
import { refreshToken } from '../../services/RecipeApi';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks';

export default function DetailRecipeLayout({ recipe }) {
  const navigate = useNavigate()
  const { handleSetToken } = useUser()

  useEffect(() => {
    (async function () {
      const token = await refreshToken()
      if (!token) navigate('/login', { replace: true })
      handleSetToken(token)
    })()
  }, [handleSetToken, navigate])

  return (
    <>
      <header className="relative group">
        <Suspense fallback={<h1>Loading ...</h1>}>
          <BtnBack />
          <img
            className="w-full h-[30vh] sm:h-[35vh] lg:h-[45vh] object-cover object-center"
            src={recipe?.img} alt={recipe.title + 'image'}
            width={1000}
            height={700}
          />
        </Suspense>
      </header>
      <main className="padding-inline min-h-screen pt-4 pb-8 bg-orange-50/50">
        <DetailSect recipe={recipe} />
      </main>
    </>
  )
}

DetailRecipeLayout.propTypes = {
  recipe: PropTypes.object.isRequired
}