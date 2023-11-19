import { User } from '@/types/User'

import axios from 'axios'

const API_URL = 'http://localhost:8080'

export async function login(email: string, password: string) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password
    })

    // Assuming your server returns the response data directly
    return response.data
  } catch (error) {
    // If the server returns an error response, you can still access the response data
    if (axios.isAxiosError(error) && error.response) {
      return error.response
    }
  }
}

export async function register() {
  try {
    const response = await axios.get(`${API_URL}/auth/register`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to get all users
export async function getAllUsers() {
  try {
    const response = await axios.get(`${API_URL}/users`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to get a single user by ID
export async function getUserById(id: string): Promise<User> {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to create a new user
export async function createUser(username: string, email: string): Promise<User> {
  try {
    const response = await axios.post(`${API_URL}/users`, {
      username,
      email
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to edit a user by ID
export async function editUser(id: string, username: string, email: string): Promise<User> {
  try {
    const response = await axios.patch(`${API_URL}/users/${id}`, {
      username,
      email
    })
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Function to delete a user by ID
export async function deleteUser(id: string) {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
