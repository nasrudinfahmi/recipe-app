import { useState } from "react";
import FormRegister from "../components/fragments/FormRegister";
import AuthSect from "../components/sections/auth/AuthSect";
import { register } from "../services/RecipeApi";
import { useNavigate } from "react-router-dom";
import { emailRegex } from '../utils/utils'

export default function RegisterPage() {
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRegister = async (e) => {
    try {
      e.preventDefault()
      const [username, email, password, confPassword, img] = e.target
      const formData = new FormData()

      if (!username.value.trim() ||
        !email.value.trim() ||
        !password.value.trim() ||
        !confPassword.value.trim()) {
        return setError("Data tidak valid!")
      }

      if (!emailRegex.test(email.value)) {
        return setError('Email tidak valid!')
      }

      formData.append("username", username.value)
      formData.append("email", email.value)
      formData.append("password", password.value)
      formData.append("confPassword", confPassword.value)
      formData.append("img", img.files[0])

      await register(formData)
      setError("")
      navigate('/login', { replace: true })
    } catch (error) {
      setError(error.response?.data?.message)
    }
  }

  return (
    <main className="w-full h-screen flex bg-orange-100/30">
      <AuthSect title="Daftar Terlebih Dahulu" errorMessage={error}>
        <FormRegister onSubmit={handleRegister} />
      </AuthSect>
    </main>
  )
}
