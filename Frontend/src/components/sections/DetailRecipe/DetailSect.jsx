import { useCallback, useEffect, useState } from "react"
import BtnRecipe from "../../elements/BtnRecipe"
import RecipeList from "../../fragments/RecipeList"

export default function DetailSect() {
  const [isIngredients, setIsIngredients] = useState(true)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  const handleBtnIngredients = () => setIsIngredients(true)
  const handleBtnInstruction = () => setIsIngredients(false)

  const handleResize = useCallback(() => {
    setWindowWidth(window.innerWidth)
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.addEventListener('resize', handleResize)
  }, [handleResize])

  const ingredients = [
    'nasi', '5 bawang merah', '4 bawang putih', 'kecap manis', 'saos', 'garam', 'penyedap rasa', 'cabai', 'bawang goreng', 'ayam', 'udang', 'telor', 'kecap asin'
  ]

  const instructions = [
    'Tuangkan minyak secukupnya di panci',
    'Masukkan bawang putih, bawang merah, kemudian tumis hingga harum',
    'Masukkan nasi ke panci, aduk sebentar',
    'Masukkan kecap manis, kecap asin, garam, dan saos tiram',
    'Masukkan penyedap rasa',
    'Jika sudah matang sajikan di atas piring',
    'Tambkan telor mata sapi dan potongan ayam suwir diatasnya',
    'Terakhir tambahkan bawang goreng diatasnya sesuai selera'
  ]

  return (
    <section>
      <h1 className="text-xl sm:text-2xl lg:text-3xl leading-tight line-clamp-3 mt-2 text-orange-950">
        <strong>Nasi goreng cak har</strong>
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
