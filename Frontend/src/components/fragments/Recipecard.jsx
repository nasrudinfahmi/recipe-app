import PropTypes from 'prop-types'
import { Suspense } from 'react'
import { Link } from 'react-router-dom';

export default function RecipeCard({ id, title, body, img }) {
  return (
    <Link to={`/recipe/${id}`}>
      <article className="rounded-lg border border-orange-200 overflow-hidden shadow-md hover:shadow-lg">
        <header className='w-full h-36'>
          <Suspense fallback={<h1>Loading ...</h1>} key={id}>
            <img src={img} alt="image" width={200} height={200} className='w-full h-full object-cover object-center' />
          </Suspense>
        </header>
        <div className="px-2 pt-3 pb-4 bg-orange-50">
          <h2 className="font-bold leading-tight line-clamp-2 mt-2 mb-3 text-orange-950">{title}</h2>
          <p className="line-clamp-5 leading-tight text-sm sm:text-base text-orange-900">{body}</p>
        </div>
      </article>
    </Link>
  )
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  img: PropTypes.string
}