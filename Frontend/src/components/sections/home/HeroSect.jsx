import Lottie from "lottie-react";
import cookingAnim from '../../../assets/imgs/cookingAnim.json'
import { Suspense } from "react";

export default function HeroSect() {
  return (
    <section className='w-full xl:h-screen flex flex-col sm:flex-row sm:items-start sm:
    gap-4 sm:pt-16'>
      <div className='sm:w-3/5 lg:w-[65%]'>
        <h1 className='font-extrabold sm:pt-14 md:pt-20 lg:pt-36 lg:text-4xl xl:text-5xl text-3xl leading-8 text-orange-950'>Rahasia Masakan <span className='text-orange-500'>Lezat</span>, Langsung dari Ahlinya.</h1>
        <p className='my-5 leading-snug lg:text-xl text-orange-950 font-semibold'>Rahasia Terbuka! Temukan Resep-Resep Kreatif untuk Pengalaman Memasak Anda.</p>
        <button type="button" className='bg-[#e76f51] text-orange-50 font-semibold px-3 py-1 rounded-xl'>Cari Resep</button>
      </div>
      <div className='order-first sm:order-last sm:w-2/5 lg:w-[45%]'>
        <Suspense fallback={<h1>Loading ...</h1>}>
          <Lottie animationData={cookingAnim} loop={true} />
        </Suspense>
      </div>
    </section>
  )
}
