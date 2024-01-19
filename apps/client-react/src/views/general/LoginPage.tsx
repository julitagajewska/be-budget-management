import { useState } from 'react'
import { Envelope } from '../../components/icons'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/inputs/Input'
import { Lock } from '../../components/icons'
import Button from '../../components/buttons/Button'
import { login } from '../../api/auth'

const LoginPage = () => {
  // NAVIGATION
  const navigate = useNavigate()

  // FORM VALUES
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value
    setEmail(newEmail)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value
    setPassword(newPassword)
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // const response = await login({ email, password })
    // const data = await response.json()

    // if (response.status === 201) {
    //   console.log(data)
    // } else {
    //   console.log(data.message)
    //   setError(data.message)
    // }

    try {
      const response = await login({ email, password })
      const data = await response.json()

      console.log(response.status)
      console.log(data)

      if (data.token) {
        navigate('/')
      }
    } catch (error: any) {
      setError(error.message)
      console.log()
    }
  }

  return (
    <div className="flex flex-row w-full h-full bg-neutral-200">
      <div className="bg-gradient-to-tr from-primary-800 to-primary-700 w-3/5"></div>

      <div className="bg-white w-2/5 shadow-2xl shadow-primary-900 flex flex-col justify-center items-center px-20">
        <form
          className="flex flex-col justify-center items-start w-full gap-8"
          onSubmit={handleLogin}
        >
          <h1 className="text-transparent leading-7 py-1 text-3xl font-slab font-extrabold bg-clip-text bg-gradient-to-tr from-primary-700 to-primary-600">
            Witaj <br />
            ponownie!
          </h1>

          <div className="flex flex-col justify-center items-start w-full gap-3 pt-4">
            <span className="text-red-600">{error}</span>
            {/* <Input
              label={'Adres e-mail'}
              type={'email'}
              placeholder={'Podaj adres e-mail ...'}
              Icon={Envelope}
              handleChange={handleEmailChange}
            /> */}

            <div className="flex flex-col relative w-full gap-2">
              {/* <Input
                label={'Hasło'}
                type={'password'}
                placeholder={'Podaj hasło ...'}
                Icon={Lock}
                handleChange={handlePasswordChange}
              /> */}
              <div className="flex flex-row w-full justify-between items-center">
                <div className="flex flex-row gap-2">
                  <input type="checkbox" id="remember-me-checkbox" />
                  <label
                    htmlFor="remember-me-checkbox"
                    className="text-sm font-bold text-background-700"
                  >
                    Zapamiętaj
                  </label>
                </div>
                <a href="#" className="text-sm font-bold text-primary-600">
                  Nie pamietasz hasła?
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-full justify-center items-center gap-4 mt-4">
            <Button type="submit" text="Zaloguj się" size="large" fullWidth />
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="text-sm font-bold text-background-700">Nie masz konta?</span>
              <Link to="/register" className="text-sm font-bold text-primary-600">
                Zarejestruj się
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
