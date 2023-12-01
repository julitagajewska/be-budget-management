import axios, { AxiosResponse } from 'axios'
import { LoginDTO, RegisterDTO } from 'shared-types'

const baseURL = 'http://localhost:8080'

export async function login(data: LoginDTO): Promise<Response> {
  const apiUrl = baseURL + '/auth/login'

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accepts: 'application/json'
      // token: localStorage.getItem('token')
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response
}

export async function register(data: RegisterDTO): Promise<Response> {
  const apiUrl = baseURL + '/auth/register'

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  return response
}
