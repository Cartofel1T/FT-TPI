import { Link } from 'wouter'
import Boton from '../Boton/Boton'
import { useSesion } from '../../contexto/SesionContexto'
import './BarraNavegacion.css'
export default function BarraNavegacion() {
  const { usuario, esAdmin, cerrarSesion } = useSesion()
  return (
    <nav className="nav">
      <div className="wrap nav__in">
        <Link href="/" className="logo">NORTE<b> BARBERÍA</b></Link>
        <Link href="/" className="nl">Servicios</Link>
        {usuario ? (
          <>
            <Link href="/panel" className="nl">{esAdmin ? 'Panel de turnos' : 'Mis turnos'}</Link>
            <span className="nav__usuario">{usuario.nombre}{esAdmin && ' (admin)'}</span>
            <Boton variant="ghost" size="sm" href="/" onClick={cerrarSesion}>Cerrar sesión</Boton>
          </>
        ) : (
          <>
            <Link href="/login" className="nl">Iniciar sesión</Link>
            <Boton size="sm" href="/registro">Crear cuenta</Boton>
          </>
        )}
      </div>
    </nav>
  )
}
