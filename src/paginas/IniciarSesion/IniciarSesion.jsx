import { useState } from 'react'
import Campo from '../../componentes/Campo/Campo'
import Boton from '../../componentes/Boton/Boton'
import { useSesion } from '../../contexto/SesionContexto'
import '../../estilos/autenticacion.css'
export default function IniciarSesion({ onNavigate }) {
  const { entrar } = useSesion()
  const [datos, setDatos] = useState({ email: '', contrasenia: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault()
    setError(''); setEnviando(true)
    try {
      const sesion = await entrar(datos.email, datos.contrasenia)
      onNavigate(sesion.rol === 'admin' ? 'panel' : 'home')
    } catch (err) {
      setError(err.message); setEnviando(false)
    }
  }

  return (
    <form className="auth" onSubmit={enviar}>
      <h2>Iniciar sesión</h2>
      <p className="sub">Entrá para reservar o gestionar turnos.</p>
      {error && <div className="alerta" role="alert">{error}</div>}
      <Campo label="Correo electrónico" type="email" autoComplete="email" required value={datos.email} onChange={cambiar('email')} />
      <Campo label="Contraseña" type="password" autoComplete="current-password" required value={datos.contrasenia} onChange={cambiar('contrasenia')} />
      <Boton type="submit" disabled={enviando}>{enviando ? 'Entrando…' : 'Iniciar sesión'}</Boton>
      <p className="alt">¿Todavía no tenés cuenta? <button type="button" className="link" onClick={() => onNavigate('register')}>Crear cuenta</button></p>
    </form>
  )
}