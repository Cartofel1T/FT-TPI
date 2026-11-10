import Campo from '../../componentes/Campo/Campo'
import Boton from '../../componentes/Boton/Boton'
import '../../estilos/autenticacion.css'
export default function Registro({ onNavigate }) {
  return (
    <div className="auth">
      <h2>Crear cuenta</h2>
      <p className="sub">Registrate para reservar y seguir tus turnos.</p>
      <Campo label="Nombre completo" autoComplete="name" />
      <Campo label="Correo electrónico" type="email" autoComplete="email" />
      <Campo label="Contraseña" type="password" autoComplete="new-password" />
      <Boton onClick={() => onNavigate('home')}>Crear cuenta</Boton>
      <p className="alt">¿Ya tenés cuenta? <button className="link" onClick={() => onNavigate('login')}>Iniciar sesión</button></p>
    </div>
  )
}
