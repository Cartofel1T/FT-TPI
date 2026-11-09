import Boton from '../Boton/Boton'
import './BarraNavegacion.css'
export default function BarraNavegacion({ onNavigate }) {
  return (
    <nav className="nav">
      <div className="wrap nav__in">
        <button className="logo" onClick={() => onNavigate('home')}>NORTE<b> BARBERÍA</b></button>
        <button className="nl" onClick={() => onNavigate('home')}>Servicios</button>
        <button className="nl" onClick={() => onNavigate('panel')}>Panel de turnos</button>
        <button className="nl" onClick={() => onNavigate('login')}>Iniciar sesión</button>
        <Boton size="sm" onClick={() => onNavigate('register')}>Crear cuenta</Boton>
      </div>
    </nav>
  )
}
