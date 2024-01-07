import SearchInput from "../../elements/SearchInput";
import RecipeCard from "../../fragments/Recipecard";

export default function CardsSect() {
  return (
    <section className="padding-inline min-h-screen pt-4 sm:pt-20 md:pl-60 lg:pl-72">
      <h1 className="text-2xl font-bold text-orange-950 my-3">Resep ku (32)</h1>

      <div className="mt-7">
        <SearchInput />
      </div>

      <div className='responsive-my-recipe-wrapper mt-5'>
        <RecipeCard id='1' body='lorem ipsum dolor sit amet' title='nasi goreng cak to' img='img' />
        <RecipeCard id='1' body='lorem ipsum dolor sit amet' title='nasi goreng cak to' img='img' />
        <RecipeCard id='1' body='lorem ipsum dolor sit amet' title='nasi goreng cak to' img='img' />
      </div>
    </section>
  )
}
