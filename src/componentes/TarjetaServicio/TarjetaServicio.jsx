import Boton from '../Boton/Boton'
import { useSesion } from '../../contexto/SesionContexto'
import { dinero } from '../../utilidades/formato'
import './TarjetaServicio.css'
export default function TarjetaServicio({ servicio, onReservar }) {
  const { usuario } = useSesion()
  return (
    <article className="svc">
      <h3>{servicio.nombre}</h3>
      <p>{servicio.descripcion}</p>
      <div className="svc__meta">
        <span className="svc__price">{dinero(servicio.precio)}</span>
        <span className="svc__dur">{servicio.duracion} min</span>
      </div>
      {usuario
        ? <Boton onClick={() => onReservar(servicio)}>Reservar</Boton>
        : <Boton href="/login">Reservar</Boton>}
    </article>
  )
}