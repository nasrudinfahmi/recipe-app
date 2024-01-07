import Title from '../../elements/TitleSect'
import Subtitle from '../../elements/SubTitleSect'
import FormRecipe from '../../fragments/FormRecipe'
import RecipeCard from '../../fragments/Recipecard';

export default function RecipeSect() {
  const handleFormRecipe = (e) => {
    let mainIngre;
    if (e.target.name === 'category') {
      mainIngre = e.target.value
    }
    console.log(mainIngre)
  }

  return (
    <section className='min-h-screen mt-32' id='recipe'>
      <Title>Resep</Title>
      <Subtitle>Temukan Beragam Resep Praktis dan Lezat untuk Setiap Kesempatan</Subtitle>
      <div className='mt-8'>
        <FormRecipe handleFormRecipe={handleFormRecipe} />
      </div>

      <div className='responsive-recipe-wrapper mt-16'>
        <RecipeCard id='1' body='lorem ipsum dolor sit amet' title='nasi goreng cak to' img='img' />
        <RecipeCard id='1' body='lorem ipsum dolor sit amet' title='nasi goreng cak to' img='img' />
        <RecipeCard id='1' body='lorem ipsum dolor sit amet' title='nasi goreng cak to' img='img' />
      </div>
    </section>
  )
}
