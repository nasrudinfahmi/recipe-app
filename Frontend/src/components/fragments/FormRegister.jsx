import PropTypes from 'prop-types'
import Input from '../elements/Input'
import BtnSubmit from '../elements/BtnSubmit'
import { Link } from 'react-router-dom'

export default function FormRegister({ onSubmit }) {
  return (
    <form method="post" className='flex px-4 pt-6 flex-col gap-3' onSubmit={onSubmit}>
      <Input type='text' placeholder='username' id='username' />
      <Input type='email' placeholder='contoh@gmail.com' id='email' />
      <Input type='password' placeholder='password' id='password' />
      <Input type='password' placeholder='conf password' id='confPassword' />
      <Input type='file' placeholder='img' id='img' />
      <div className='mt-4'>
        <BtnSubmit />
      </div>
      <p>Belum punya akun ? <Link to="/login" className='text-orange-700'>Login</Link></p>
    </form>
  )
}

FormRegister.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
