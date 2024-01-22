import PropTypes from 'prop-types'
import Input from '../elements/Input'
import BoxMessage from '../elements/BoxMessage'
import BtnSubmit from '../elements/BtnSubmit'

export default function FormContact({ handleSubmit }) {
  return (
    <form className="w-full sm:w-1/2 flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
      <Input type="email" placeholder="contoh@gmail.com" id='email' />
      <BoxMessage />
      <BtnSubmit />
    </form>
  )
}

FormContact.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}