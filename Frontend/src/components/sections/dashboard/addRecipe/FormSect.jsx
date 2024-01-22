import FormAddRecipe from "../../../fragments/FormAddRecipe";
import { useNavigate } from 'react-router-dom'
import { useAxiosInterceptor, useUser } from '../../../../hooks/index'
import { addRecipe } from "../../../../services/RecipeApi";
import { useState } from "react";

export default function FormSect() {
  const { user } = useUser()
  const axiosJwt = useAxiosInterceptor()
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const [title, summary, main_ingredient, ingredients, img, ...instructions] = e.target
    let instructionsValues = JSON.stringify(instructions.slice(0, instructions.length - 3).map(instruction => instruction.value.trim() !== '' ? instruction.value.trim() : null).filter(instruction => instruction !== null))

    if (instructionsValues === "[]") instructionsValues = ""
    const formdata = new FormData()
    formdata.append('idUser', user.idUser)
    formdata.append('title', title.value)
    formdata.append('summary', summary.value)
    formdata.append('main_ingredient', main_ingredient.value)
    formdata.append('ingredients', ingredients.value)
    formdata.append('img', img.files[0])
    formdata.append('instructions', instructionsValues)

    const { status, response } = await addRecipe(axiosJwt, formdata)
    console.log(response?.data?.message);

    if (status === 401 || status === 403) return navigate('/login')
    if (status !== 201) return setErrorMessage(response?.data?.message)
    if (status === 201) return navigate('/dashboard')
  }

  return (
    <section className="relative padding-inline pb-12 min-h-screen pt-4 sm:pt-20 md:pl-60 lg:pl-72">
      <h1 className="text-2xl font-bold text-center text-orange-950 mt-3 mb-8">Tambah Resep</h1>
      {errorMessage && (
        <span className="block w-full text-center text-lg mb-5 text-red-500 font-semibold">{errorMessage}</span>
      )}
      <FormAddRecipe handleSubmitAddRecipe={handleSubmitForm} defaultTotalInstructions={4} />
    </section>
  )
}
