import PropTypes from 'prop-types'
import FormAddRecipe from './FormAddRecipe'
import { useEffect, useRef, useState } from 'react'
import { useAxiosInterceptor, useUser } from '../../hooks'
import { editRecipe } from '../../services/RecipeApi'

export default function EditRecipeDialog({
  recipeReadyToEdit,
  setRecipeReadyToEdit,
  isFormEditRecipeDialogOpen,
  setIsFormEditRecipeDialogOpen,
  onSuccessEditRecipe
}) {

  const { user } = useUser()
  const modalDialogEditRef = useRef()
  const btnCloseRef = useRef()
  const axiosJwt = useAxiosInterceptor()

  const [defaultFieldsInstructions, setDefaultFieldsInstructions] = useState(
    recipeReadyToEdit.instructions ? JSON.parse(recipeReadyToEdit.instructions).length : 4
  );

  useEffect(() => {
    if (recipeReadyToEdit.instructions) {
      const instruction = JSON.parse(recipeReadyToEdit.instructions)
      setDefaultFieldsInstructions(instruction.length)
    }
  }, [recipeReadyToEdit, defaultFieldsInstructions])

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const [title, summary, main_ingredient, ingredients, img, ...instructions] = e.target
    let instructionsValues = JSON.stringify(instructions.slice(0, instructions.length - 3).map(instruction => instruction.value.trim() !== '' ? instruction.value.trim() : null).filter(instruction => instruction !== null))

    const formdata = new FormData()
    formdata.append('idUser', user.idUser)
    formdata.append('title', title.value)
    formdata.append('summary', summary.value)
    formdata.append('main_ingredient', main_ingredient.value)
    formdata.append('ingredients', ingredients.value)
    formdata.append('img', img.files[0])
    formdata.append('instructions', instructionsValues)

    const { status } = await editRecipe(axiosJwt, recipeReadyToEdit.idRecipe, formdata)
    if (status === 200) return await onSuccessEditRecipe(status)
  }

  const closeModalDialog = (e) => {
    if (!modalDialogEditRef.current.contains(e.target)
      || btnCloseRef.current.contains(e.target)) {
      setIsFormEditRecipeDialogOpen(false)
      setRecipeReadyToEdit({})
    }
  }

  return (
    <div className={`fixed inset-0 min-h-screen flex justify-center items-center bg-slate-900/70 z-[9999999999] ${isFormEditRecipeDialogOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-opacity`} onClick={closeModalDialog}>
      <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-50 shadow-xl rounded-xl w-[95%] sm:w-4/5 md:w-2/3 lg:w-3/5 xl:w-1/2 min-h-fit max-h-[70vh] p-5 overflow-x-auto ${isFormEditRecipeDialogOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-opacity`} ref={modalDialogEditRef}>

        <div className='flex w-full justify-between items-start gap-5 mb-5'>
          <span className='flex gap-2 items-start'>
            <img className='rounded-md' src={recipeReadyToEdit?.img} alt="gambar resep" width={100} height={100} />
            <h1 className='font-semibold text-lg leading-tight line-clamp-3'>Ubah resep {recipeReadyToEdit.title}</h1>
          </span>
          <button
            title='Tutup modal edit resep'
            aria-label='Tutup modal edit resep'
            type="button"
            className='border shrink-0 rounded-md w-8 h-8 lg:w-10 lg:h-10 grid place-content-center font-bold text-red-500 hover:text-red-600 active:text-red-600 hover:border-slate-300 hover:shadow-sm'
            ref={btnCloseRef}
            onClick={closeModalDialog}>
            X
          </button>
        </div>
        <FormAddRecipe recipe={recipeReadyToEdit} handleSubmitAddRecipe={handleSubmitForm} defaultTotalInstructions={defaultFieldsInstructions} setDefaultFieldsInstructions={setDefaultFieldsInstructions} />
      </div>
    </div>
  )
}

EditRecipeDialog.propTypes = {
  recipeReadyToEdit: PropTypes.object.isRequired,
  setRecipeReadyToEdit: PropTypes.func.isRequired,
  isFormEditRecipeDialogOpen: PropTypes.bool.isRequired,
  setIsFormEditRecipeDialogOpen: PropTypes.func.isRequired,
  onSuccessEditRecipe: PropTypes.func.isRequired
}