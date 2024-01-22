import PropTypes from 'prop-types'

export default function AuthSect({ children, title, errorMessage }) {
  return (
    <section className="m-auto py-4 w-3/4 sm:w-3/5 md:w-1/2 lg:w-1/3 min-h-min shadow-md bg-orange-100 border border-orange-500 rounded-md">
      <h1 className='px-4 pb-3 text-lg font-semibold border-b border-orange-500'>{title}</h1>
      <p className='text-center pt-3 text-red-600 font-semibold'>{errorMessage}</p>
      {children}
    </section>
  )
}

AuthSect.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  errorMessage: PropTypes.string.isRequired
}
