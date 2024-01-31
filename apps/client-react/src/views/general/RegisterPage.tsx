import React, { RefObject, useEffect, useRef, useState } from 'react'
import { ArrowLeft, Envelope, Lock, User, UserOutlined } from '../../components/icons'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api'
import Input from '../../components/inputs/Input'
import Button from '../../components/buttons/Button'

type MessageType = {
  type: 'success' | 'error'
  message: string
}

const RegisterPage = () => {
  // NAVIGATION
  const navigate = useNavigate()

  // FORM DATA
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // MESSAGES
  const [error, setError] = useState('')

  // SUCCESS POPUP
  const [open, setOpen] = useState(false)

  // DATA CHANGE HANDLERS
  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setUsername(input)
    console.log(input)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setEmail(input)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setPassword(input)
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setConfirmPassword(input)
  }

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setOpen(true)
    try {
      console.log(username, email, password)
      const response = await register({
        username,
        email,
        password
      })

      setError('')

      setUsername('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')

      setOpen(true)
    } catch (err) {
      setError('Coś poszło nie tak. Nie udało się zarejestrować użytkownika.') // Set an error message
    }
  }

  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let handler = (e: MouseEvent) => {
      if (popupRef.current !== null) {
        if (!popupRef.current.contains(e.target as Node)) {
          setOpen(false)
          // console.log('clicked away')
        }
      }
    }

    document.addEventListener('mousedown', handler)

    return () => {
      document.removeEventListener('mousedown', handler)
    }
  })

  return (
    <div className="flex flex-row w-full h-full bg-neutral-200">
      <div className="bg-gradient-to-tr from-primary-800 to-primary-700 w-3/5"></div>

      <div className="bg-white w-2/5 shadow-2xl shadow-primary-900 flex flex-col justify-center items-center px-20">
        <form
          className="flex flex-col justify-center items-start w-full gap-8"
          onSubmit={handleRegister}
        >
          <h1 className="text-transparent leading-7 py-1 text-3xl font-slab font-extrabold bg-clip-text bg-gradient-to-tr from-primary-700 to-primary-600">
            Witaj <br />
            ponownie!
          </h1>

          <div className="flex flex-col justify-center items-start w-full gap-3 mt-4">
            <Input
              label={'Nazwa użytkownika'}
              type={'text'}
              placeholder={'Podaj nazwę użytkownika ...'}
              Icon={UserOutlined}
              handleChange={handleUsernameChange}
              value={username}
            />

            <Input
              label={'Adres e-mail'}
              type={'email'}
              placeholder={'Podaj adres e-mail ...'}
              Icon={Envelope}
              handleChange={handleEmailChange}
              value={email}
            />

            <Input
              label={'Hasło'}
              type={'password'}
              placeholder={'Podaj hasło ...'}
              Icon={Lock}
              handleChange={handlePasswordChange}
              value={password}
            />

            <Input
              label={'Potwierdź hasło'}
              type={'password'}
              placeholder={'Potwierdź hasło ...'}
              Icon={Lock}
              handleChange={handleConfirmPasswordChange}
              value={confirmPassword}
            />
          </div>

          <div className="flex flex-col w-full justify-center items-center gap-4 mt-4">
            <Button type="submit" text="Zarejestruj się" size="large" fullWidth />
            <div className="flex flex-row justify-center items-center gap-2">
              <span className="text-sm font-bold text-background-700">Masz już konto?</span>
              <Link to="/login" className="text-sm font-bold text-primary-600">
                Zaloguj się
              </Link>
            </div>
          </div>

          <span className="text-red-500 text-sm">{error}</span>
        </form>
      </div>

      {/* POPUP */}
      {open && (
        <div className="relative">
          <div className="w-screen h-screen fixed z-10 top-0 left-0 bg-black bg-opacity-25 flex flex-col justify-center items-center">
            <div
              ref={popupRef}
              className="bg-background-50 left-auto rounded-lg shadow-md px-8 py-6 flex flex-col justify-start gap-4"
            >
              <h1 className="font-extrabold text-lg text-primary-700">Zarejestrowano!</h1>
              <span className="">
                Rejestracja przebiegła pomyślnie - Twoje konto zostało utworzone.
              </span>
              <div className="w-full flex flex-row justify-end gap-4">
                <button
                  onClick={() => setOpen(false)}
                  className="bg-transparent flex flex-row justify-center items-center gap-2 hover:bg-primary-600 hover:bg-opacity-10 text-primary-700 transition-all ease-in-out duration-300 hover:cursor-pointer rounded-lg px-8 py-[6px] text-sm font-[600]"
                >
                  <ArrowLeft className="text-xl" />
                  Powrót
                </button>
                <button
                  onClick={() => navigate('/login')}
                  className="bg-primary-600 hover:bg-primary-700 text-text-50 transition-all ease-in-out duration-300 hover:cursor-pointer rounded-lg px-8 py-[6px] text-sm"
                >
                  Zaloguj się
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegisterPage
