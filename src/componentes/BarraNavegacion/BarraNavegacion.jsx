import Boton from '../Boton/Boton'
import { useSesion } from '../../contexto/SesionContexto'
import './BarraNavegacion.css'
export default function BarraNavegacion({ onNavigate }) {
  const { usuario, esAdmin, cerrarSesion } = useSesion()
  return (
    <nav className="nav">
      <div className="wrap nav__in">
        <button className="logo" onClick={() => onNavigate('home')}>NORTE<b> BARBERÍA</b></button>
        <button className="nl" onClick={() => onNavigate('home')}>Servicios</button>
        {usuario ? (
          <>
            <button className="nl" onClick={() => onNavigate('panel')}>{esAdmin ? 'Panel de turnos' : 'Mis turnos'}</button>
            <span className="nav__usuario">{usuario.nombre}{esAdmin && ' (admin)'}</span>
            <Boton variant="ghost" size="sm" onClick={() => { cerrarSesion(); onNavigate('home') }}>Cerrar sesión</Boton>
          </>
        ) : (
          <>
            <button className="nl" onClick={() => onNavigate('login')}>Iniciar sesión</button>
            <Boton size="sm" onClick={() => onNavigate('register')}>Crear cuenta</Boton>
          </>
        )}
      </div>
    </nav>
  )
}