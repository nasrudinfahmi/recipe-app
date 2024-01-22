import PropTypes from 'prop-types'
import { useCallback, useEffect, useState } from "react"
import BtnRecipe from "../../elements/BtnRecipe"
import RecipeList from "../../fragments/RecipeList"

export default function DetailSect({ recipe }) {
  const [isIngredients, setIsIngredients] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleBtnIngredients = () => setIsIngredients(true)
  const handleBtnInstruction = () => setIsIngredients(false)

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  const ingredients = recipe?.ingredients?.split(', ') || []
  const instructions = JSON.parse(recipe?.instructions?.split(', ')) || []

  return (
    <section>
      <h1 className="text-xl sm:text-2xl lg:text-3xl leading-tight line-clamp-3 mt-2 text-orange-950">
        <strong>{recipe.title}</strong>
      </h1>

      {windowWidth < 640 && (
        <div className="flex mt-5">
          <BtnRecipe onClick={handleBtnIngredients} isActive={isIngredients}>Ingredients</BtnRecipe>
          <BtnRecipe onClick={handleBtnInstruction} isActive={!isIngredients}>Instructions</BtnRecipe>
        </div>
      )}

      {windowWidth < 640 && isIngredients && (
        <article className="mt-6 pl-2">
          <RecipeList title="Ingredients" items={ingredients} />
        </article>
      )}

      {windowWidth < 640 && !isIngredients && (
        <article className="mt-6 pl-2">
          <RecipeList title="Instructions" items={instructions} />
        </article>
      )}

      {windowWidth >= 640 && (
        <div className="flex mt-6 items-start gap-4">
          <article className="basis-2/5">
            <RecipeList title="Ingredients" items={ingredients} />
          </article>

          <article className="basis-3/5 border-l-2 border-l-orange-700 pl-4 relative">
            <RecipeList title="Instructions" items={instructions} />
          </article>
        </div>
      )}
    </section>
  )
}

DetailSect.propTypes = {
  recipe: PropTypes.object.isRequired
}