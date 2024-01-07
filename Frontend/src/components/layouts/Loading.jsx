export default function Loading() {
  return (
    <section className="w-full h-screen overflow-hidden fixed top-0 left-0 z-[9999] bg-orange-50/60 grid place-content-center">
      <div className="border-gray-300 h-10 w-10 sm:h-20 sm:w-20 animate-spin rounded-full border-4 sm:border-8 border-t-orange-500" />
    </section>
  )
}
