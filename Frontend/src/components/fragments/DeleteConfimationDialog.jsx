import PropTypes from 'prop-types'
import { useRef, useState } from 'react'
import { useAxiosInterceptor, useUser } from '../../hooks'
import { deleteRecipe, getOwnRecipes } from '../../services/RecipeApi'
import { useNavigate } from 'react-router-dom'

export default function DeleteConfimationDialog(props) {
  const { recipeReadyToDelete, isDeleteDialogOpen, setIsDeleteDialogOpen, setRecipes } = props

  const [isLoadingDelete, setIsLoadingDelete] = useState(false)

  const modalDialogRef = useRef()
  const navigate = useNavigate()
  const { user } = useUser()
  const axiosJwt = useAxiosInterceptor()

  const onConfirmDelete = async () => {
    setIsLoadingDelete(true)
    const { status, loading } = await deleteRecipe(axiosJwt, recipeReadyToDelete.idRecipe)
    setIsLoadingDelete(loading)

    if (status === 401 || status === 403) {
      return navigate('/login')
    }

    if (status === 200) {
      const { recipes, status } = await getOwnRecipes(axiosJwt, user.idUser)
      if (status === 401 || status === 403) {
        return navigate('/login')
      }
      setRecipes(recipes.datas)
      console.log(`Sukses menghapus resep: ${recipeReadyToDelete?.idRecipe}`)
    }

    setIsDeleteDialogOpen(false)
  }

  const onCancelDelete = () => {
    setIsDeleteDialogOpen(false)
    console.log(`Tidak jadi menghapus resep: ${recipeReadyToDelete?.idRecipe}`)
  }

  const closeModalDialog = (e) => {
    if (!modalDialogRef.current.contains(e.target)) {
      onCancelDelete()
    }
  }

  return (
    <div className={`fixed inset-0 w-full h-full bg-slate-900/70 z-[9999999] ${isDeleteDialogOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-opacity`} onClick={closeModalDialog}>
      <div className={`fixed p-4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-100 shadow-xl rounded-xl w-2/3 sm:w-3/5 md:w-1/2 lg:w-2/5 xl:w-[30%] min-h-fit ${isDeleteDialogOpen ? 'block opacity-100' : 'hidden opacity-0'} transition-opacity`} ref={modalDialogRef}>
        <h1 className='leading-tight font-semibold text-slate-900'>Resep yang dihapus tidak bisa dipulihkan kembali.</h1>
        <h1 className='leading-tight mt-7'>Yakin hapus resep &ldquo;{recipeReadyToDelete?.title}&rdquo; ?</h1>

        <div className='mt-4 flex gap-4'>
          <button
            type="button"
            title='hapus permanen'
            aria-label={"Hapus resep " + recipeReadyToDelete.title}
            disabled={isLoadingDelete}
            className='bg-gradient-to-br from-red-500 to-red-700 hover:from-red-700 hover:to-red-700 rounded-md text-white shadow-sm py-px px-4 border '
            onClick={onConfirmDelete}
          >Hapus
          </button>
          <button
            type="button"
            title='tidak jadi'
            aria-label={"Tidak jadi hapus resep " + recipeReadyToDelete.title}
            onClick={onCancelDelete}
            disabled={isLoadingDelete}
            className='rounded-md bg-slate-50 shadow-sm py-px px-4 border'
          >Tidak
          </button>
        </div>
      </div>
    </div>
  )
}

DeleteConfimationDialog.propTypes = {
  recipeReadyToDelete: PropTypes.objectOf(PropTypes.string).isRequired,
  isDeleteDialogOpen: PropTypes.bool.isRequired,
  setIsDeleteDialogOpen: PropTypes.func.isRequired,
  setRecipes: PropTypes.func.isRequired
}
