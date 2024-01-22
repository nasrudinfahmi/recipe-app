import PropTypes from 'prop-types'
import BtnIncrement from "../elements/BtnIncrement";
import Input from "../elements/Input";
import InputFile from '../elements/InputFile';
import { useCallback, useEffect, useRef, useState } from 'react';

export default function FormAddRecipe({ handleSubmitAddRecipe, defaultTotalInstructions, recipe }) {
  const [instructionLength, setInstructionsLength] = useState(defaultTotalInstructions)
  const recipeFormRef = useRef()

  useEffect(() => {
    if (recipe?.idRecipe) {
      const instructionRecipes = JSON.parse(recipe.instructions)
      setInstructionsLength(instructionRecipes.length)

      const [labelTitle, labelSummary, labelMain_ingre, labelIngredients, , ...labelInstructions] = recipeFormRef.current.children
      const instructionsFields = labelInstructions.slice(0, labelInstructions.length - 2).map(instruction => instruction.children[0])

      for (let i = 0; i < instructionLength; i++) {
        instructionsFields[i].value = instructionRecipes[i]
      }

      labelTitle.children[0].value = recipe.title
      labelSummary.children[0].value = recipe.summary
      labelMain_ingre.children[0].value = recipe.main_ingredient
      labelIngredients.children[0].value = recipe.ingredients
    }
  }, [recipe, defaultTotalInstructions])

  const handleAddInstruction = useCallback(() => {
    return setInstructionsLength((prev) => prev + 1)
  }, [])

  const handleRemoveInstruction = useCallback(() => {
    if (instructionLength <= 1) return;
    return setInstructionsLength((prev) => prev - 1)
  }, [instructionLength])

  return (
    <form onSubmit={handleSubmitAddRecipe} className='flex flex-col gap-3' ref={recipeFormRef}>
      <Input type='text' placeholder='Nama Masakan' id='masakan' />
      <Input type='text' placeholder='Summary' id='summary' />
      <Input type='text' placeholder='Bahan Utama' id='main-ingredient' />
      <Input type='text' placeholder='Bahan - Bahan' id='ingredients' />
      <InputFile />
      {Array.from({ length: instructionLength }).map((_, index) => (
        <Input
          key={index}
          type='text'
          placeholder={`Instruksi ke ${index + 1}`}
          id={`instructions${index + 1}`} />
      ))}
      <div className='flex gap-2'>
        <BtnIncrement text='Tambah Instruksi' ariaLabel='Tambah Instruksi' className='basis-full bg-orange-500 border text-white' onClick={handleAddInstruction} />
        <BtnIncrement text='Kurangi Instruksi' ariaLabel='Kurangi Instruksi' className='basis-full bg-white text-orange-950 border' onClick={handleRemoveInstruction} />
      </div>
      <button className='border w-full py-1 sm:py-2 bg-orange-600 hover:bg-orange-700 active:bg-orange-600 text-white rounded-md' type="submit" aria-label='Kirim Formulir Tambah Resep'>Kirim</button>
    </form>
  )
}

FormAddRecipe.propTypes = {
  handleSubmitAddRecipe: PropTypes.func.isRequired,
  defaultTotalInstructions: PropTypes.number.isRequired,
  recipe: PropTypes.object,
}