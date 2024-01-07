import FormAddRecipe from "../../../fragments/FormAddRecipe";

export default function FormSect() {
  const handleSubmitForm = (e) => {
    try {
      e.preventDefault()
      const [title, summary, main_ingredient, ingredients, img, ...instructions] = e.target
      const recipeValues = {
        title: title.value,
        summary: summary.value,
        main_ingredient: main_ingredient.value,
        ingredients: ingredients.value,
        img: img.files[0],
        instructions: JSON.stringify(instructions.slice(0, instructions.length - 3).map(instruction => instruction.value))
      }
      console.log(recipeValues)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <section className="padding-inline min-h-screen pt-4 sm:pt-20 md:pl-60 lg:pl-72">
      <h1 className="text-2xl font-bold text-orange-950 my-3">Tambah Resep</h1>
      <FormAddRecipe handleSubmitAddRecipe={handleSubmitForm} />
    </section>
  )
}
