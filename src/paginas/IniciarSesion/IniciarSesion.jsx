import { useEffect, useState } from 'react'
import { Link, Redirect } from 'wouter'
import Campo from '../../componentes/Campo/Campo'
import Boton from '../../componentes/Boton/Boton'
import { useSesion } from '../../contexto/SesionContexto'
import '../../estilos/autenticacion.css'
export default function IniciarSesion() {
  const { usuario, entrar } = useSesion()
  const [datos, setDatos] = useState({ email: '', contrasenia: '' })
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  useEffect(() => { window.scrollTo(0, 0) }, [])
  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value })

  const enviar = async (e) => {
    e.preventDefault()
    setError(''); setEnviando(true)
    try {
      await entrar(datos.email, datos.contrasenia)
    } catch (err) {
      setError(err.message); setEnviando(false)
    }
  }

  if (usuario) return <Redirect to={usuario.rol === 'admin' ? '/panel' : '/'} />

  return (
    <form className="auth" onSubmit={enviar}>
      <h2>Iniciar sesión</h2>
      <p className="sub">Entrá para reservar o gestionar turnos.</p>
      {error && <div className="alerta" role="alert">{error}</div>}
      <Campo label="Correo electrónico" type="email" autoComplete="email" required value={datos.email} onChange={cambiar('email')} />
      <Campo label="Contraseña" type="password" autoComplete="current-password" required value={datos.contrasenia} onChange={cambiar('contrasenia')} />
      <Boton type="submit" disabled={enviando}>{enviando ? 'Entrando…' : 'Iniciar sesión'}</Boton>
      <p className="alt">¿Todavía no tenés cuenta? <Link href="/registro" className="link">Crear cuenta</Link></p>
    </form>
  )
}