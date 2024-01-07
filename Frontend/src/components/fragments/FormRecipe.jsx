import PropTypes from 'prop-types'
import RadioBtn from "../elements/RadioBtn";
import SearchInput from '../elements/SearchInput';

export default function FormRecipe({ handleFormRecipe }) {
  return (
    <form onChange={(e) => handleFormRecipe(e)} method="get" className="flex flex-col mt-16">
      <div className='w-full grid gap-3 grid-cols-[repeat(auto-fit,minmax(100px,1fr))]'>
        <RadioBtn text="Semua" defaultChecked={true} />
        <RadioBtn text="Ayam" />
        <RadioBtn text="Bebek" />
        <RadioBtn text="Sapi" />
        <RadioBtn text="Kambing" />
        <RadioBtn text="Udang" />
      </div>
      <div className='mt-10 md:w-2/3 xl:w-1/2 md:mx-auto'>
        <SearchInput />
      </div>
    </form>
  )
}

FormRecipe.propTypes = {
  handleFormRecipe: PropTypes.func.isRequired
}