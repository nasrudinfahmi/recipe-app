import PropTypes from 'prop-types'
import BtnIncrement from "../elements/BtnIncrement";
import Input from "../elements/Input";
import InputFile from '../elements/InputFile';

export default function FormAddRecipe({ handleSubmitAddRecipe }) {
  return (
    <form method="post" onSubmit={handleSubmitAddRecipe} className='flex flex-col gap-3'>
      <Input type='text' placeholder='Nama Masakan' />
      <Input type='text' placeholder='Summary' />
      <Input type='text' placeholder='Bahan Utama' />
      <Input type='text' placeholder='Bahan - Bahan' />
      <InputFile />
      <Input type='text' placeholder='Instruksi' />
      <Input type='text' placeholder='Instruksi' />
      <div className='flex gap-2'>
        <BtnIncrement text='Tambah Instruksi' ariaLabel='Tambah Instruksi' className='basis-full bg-orange-500' />
        <BtnIncrement text='Kurangi Instruksi' ariaLabel='Kurangi Instruksi' className='basis-full bg-slate-500' />
      </div>
      <button className='border w-full py-1 sm:py-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-600 text-white rounded-md' type="submit" aria-label='Kirim Formulir Tambah Resep'>Kirim</button>
    </form>
  )
}

FormAddRecipe.propTypes = {
  handleSubmitAddRecipe: PropTypes.func.isRequired
}