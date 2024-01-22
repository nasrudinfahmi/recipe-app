import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Input from '../elements/Input'
import BtnSubmit from '../elements/BtnSubmit'

export default function FormLogin({ onSubmit }) {
  return (
    <form method="post" className='flex px-4 pt-6 flex-col gap-3' onSubmit={onSubmit}>
      <Input type='email' placeholder='contoh@gmail.com' id='email' />
      <Input type='password' placeholder='********' id='password' />
      <div className='mt-4'>
        <BtnSubmit />
      </div>
      <p>Belum punya akun ? <Link to="/register" className='text-orange-700'>Register</Link></p>
    </form>
  )
}

FormLogin.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
