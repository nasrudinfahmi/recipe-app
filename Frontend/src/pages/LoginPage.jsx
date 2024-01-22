import AuthSect from '../components/sections/auth/AuthSect'
import FormLogin from '../components/fragments/FormLogin'
import { login } from '../services/RecipeApi'
import { useState } from 'react'
import { useUser } from '../hooks'
import { useNavigate } from 'react-router-dom'
import { emailRegex } from '../utils/utils'

export default function LoginPage() {
  const { handleSetToken } = useUser()
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    try {
      e.preventDefault()
      const [email, password] = e.target
      const dataValues = { email: email.value, password: password.value }

      if (email.value.trim() === '' || password.value.trim() === '') {
        return setError('Data tidak valid!')
      }

      if (!emailRegex.test(email.value)) {
        return setError('Email tidak valid!')
      }

      const response = await login(dataValues)
      handleSetToken(response.accessToken)
      setError('')
      navigate('/')
    } catch (error) {
      setError(error.response.data.message)
    }
  }

  return (
    <main className="w-full h-screen flex bg-orange-100/30">
      <AuthSect title="Masuk ke akun anda" errorMessage={error}>
        <FormLogin onSubmit={handleLogin} />
      </AuthSect>
    </main>
  )
}
