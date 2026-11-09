import Boton from '../Boton/Boton'
import './TarjetaServicio.css'
const money = (n) => '$' + Number(n).toLocaleString('es-AR')
export default function TarjetaServicio({ servicio, onReservar }) {
  return (
    <article className="svc">
      <h3>{servicio.nombre}</h3>
      <p>{servicio.desc}</p>
      <div className="svc__meta">
        <span className="svc__price">{money(servicio.precio)}</span>
        <span className="svc__dur">{servicio.min} min</span>
      </div>
      <Boton onClick={() => onReservar(servicio)}>Reservar</Boton>
    </article>
  )
}
