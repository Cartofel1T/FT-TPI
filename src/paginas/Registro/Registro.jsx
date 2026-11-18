import { useState } from 'react'
import Campo from '../../componentes/Campo/Campo'
import Boton from '../../componentes/Boton/Boton'
import { useSesion } from '../../contexto/SesionContexto'
import '../../estilos/autenticacion.css'
export default function Registro({ onNavigate }) {
  const { registrar } = useSesion()
  const [datos, setDatos] = useState({ nombre: '', email: '', contrasenia: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault()
    setError(''); setEnviando(true)
    try {
      await registrar(datos.nombre, datos.email, datos.contrasenia)
      onNavigate('home')
    } catch (err) {
      setError(err.message); setEnviando(false)
    }
  }

  return (
    <form className="auth" onSubmit={enviar}>
      <h2>Crear cuenta</h2>
      <p className="sub">Registrate para reservar y seguir tus turnos.</p>
      {error && <div className="alerta" role="alert">{error}</div>}
      <Campo label="Nombre completo" autoComplete="name" required value={datos.nombre} onChange={cambiar('nombre')} />
      <Campo label="Correo electrónico" type="email" autoComplete="email" required value={datos.email} onChange={cambiar('email')} />
      <Campo label="Contraseña (mínimo 6 caracteres)" type="password" autoComplete="new-password" required minLength={6} value={datos.contrasenia} onChange={cambiar('contrasenia')} />
      <Boton type="submit" disabled={enviando}>{enviando ? 'Creando…' : 'Crear cuenta'}</Boton>
      <p className="alt">¿Ya tenés cuenta? <button type="button" className="link" onClick={() => onNavigate('login')}>Iniciar sesión</button></p>
    </form>
  )
}