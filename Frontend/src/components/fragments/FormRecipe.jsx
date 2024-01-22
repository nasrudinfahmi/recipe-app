import RadioBtn from "../elements/RadioBtn";
import SearchInput from '../elements/SearchInput';
import { useSearchParams } from 'react-router-dom';

export default function FormRecipe() {
  const [searchParams, setSearchParams] = useSearchParams();
  const mainIngredient = searchParams.get('mainIngre');

  const handleFormRecipe = (e) => {
    if (e.target.name === 'category') {
      if (e.target.value === 'Semua') {
        setSearchParams({})
      } else {
        setSearchParams({ mainIngre: e.target.value })
      }
    }
  }

  return (
    <form onChange={(e) => handleFormRecipe(e)} onSubmit={(e) => e.preventDefault()} method="get" className="flex flex-col mt-16">
      <div className='w-full grid gap-3 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]'>
        <RadioBtn text="Semua" defaultChecked={mainIngredient === 'Semua' || !mainIngredient} />
        <RadioBtn text="Ayam" defaultChecked={mainIngredient === "Ayam"} />
        <RadioBtn text="Bebek" defaultChecked={mainIngredient === "Bebek"} />
        <RadioBtn text="Sapi" defaultChecked={mainIngredient === "Sapi"} />
        <RadioBtn text="Kambing" defaultChecked={mainIngredient === "Kambing"} />
        <RadioBtn text="Udang" defaultChecked={mainIngredient === "Udang"} />
      </div>
      <div className='mt-10 md:w-2/3 xl:w-1/2 md:mx-auto'>
        <SearchInput />
      </div>
    </form>
  )
}
