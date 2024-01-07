import PropTypes from 'prop-types'

export default function BtnRecipe({ children, isActive, onClick }) {
  return (
    <button type="button" className={`${isActive ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-950'} basis-full border py-1`} onClick={onClick} aria-label='button untuk toggle ingredients atau instructions'>
      {children}
    </button>
  )
}

BtnRecipe.propTypes = {
  children: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
}
