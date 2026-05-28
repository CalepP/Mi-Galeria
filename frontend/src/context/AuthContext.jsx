import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

const API = 'http://localhost:3001/api'

export function AuthProvider({ children }) {
  const [fotografo, setFotografo] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const datos = localStorage.getItem('fotografo')
    if (token && datos) {
      setFotografo(JSON.parse(datos))
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    setCargando(false)
  }, [])

  const login = async (email, password) => {
    const { data } = await axios.post(`${API}/auth/login`, { email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('fotografo', JSON.stringify(data.fotografo))
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    setFotografo(data.fotografo)
    return data
  }

  const registro = async (nombre, email, password) => {
    const { data } = await axios.post(`${API}/auth/registro`, { nombre, email, password })
    localStorage.setItem('token', data.token)
    localStorage.setItem('fotografo', JSON.stringify(data.fotografo))
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
    setFotografo(data.fotografo)
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('fotografo')
    delete axios.defaults.headers.common['Authorization']
    setFotografo(null)
  }

  return (
    <AuthContext.Provider value={{ fotografo, login, registro, logout, cargando }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)