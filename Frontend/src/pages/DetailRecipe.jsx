import DetailSect from "../components/sections/DetailRecipe/DetailSect"

export default function DetailRecipe() {
  return (
    <>
      <header>
        <div className="w-full h-[30vh] sm:h-[35vh] lg:h-[45vh] bg-orange-100" />
      </header>
      <main className="padding-inline pt-4 pb-8 bg-orange-50/50">
        <DetailSect />
      </main>
    </>
  )
}
