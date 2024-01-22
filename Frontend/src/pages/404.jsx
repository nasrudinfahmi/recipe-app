import { Suspense } from 'react'
import notFound from '../assets/imgs/error-404.png'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <main className="flex flex-col w-full h-screen bg-orange-50/30">
      <section className="m-auto flex flex-col">
        <Suspense fallback={<h1>Loading ...</h1>}>
          <img
            src={notFound}
            alt="Not Found"
            className='w-4/5 mx-auto select-none'
            width={1000}
            height={1000} />
        </Suspense>
        <Link
          to={-1}
          className='mt-7 py-1 font-semibold text-orange-950 text-center block border-t'>
          Kembali ke halaman sebelumnya
        </Link>
      </section>
    </main>
  )
}
