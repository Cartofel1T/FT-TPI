import Campo from '../../componentes/Campo/Campo'
import Boton from '../../componentes/Boton/Boton'
import '../../estilos/autenticacion.css'
export default function IniciarSesion({ onNavigate }) {
  return (
    <div className="auth">
      <h2>Iniciar sesión</h2>
      <p className="sub">Entrá para reservar o gestionar turnos.</p>
      <Campo label="Correo electrónico" type="email" autoComplete="email" />
      <Campo label="Contraseña" type="password" autoComplete="current-password" />
      <Boton onClick={() => onNavigate('home')}>Iniciar sesión</Boton>
      <p className="alt">¿Todavía no tenés cuenta? <button className="link" onClick={() => onNavigate('register')}>Crear cuenta</button></p>
    </div>
  )
}
