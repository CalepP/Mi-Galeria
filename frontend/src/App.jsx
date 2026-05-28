import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import GaleriaEditor from './pages/GaleriaEditor'
import GaleriaCliente from './pages/GaleriaCliente'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/galeria/:id" element={<GaleriaEditor />} />
        <Route path="/g/:slug" element={<GaleriaCliente />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App