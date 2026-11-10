import Portada from '../../componentes/Portada/Portada'
import BarraInformacion from '../../componentes/BarraInformacion/BarraInformacion'
import TarjetaServicio from '../../componentes/TarjetaServicio/TarjetaServicio'
import { servicios } from '../../datos/servicios'
import './Inicio.css'
export default function Inicio({ onNavigate, onReservar }) {
  return (
    <>
      <Portada onNavigate={onNavigate} />
      <BarraInformacion />
      <section id="servicios">
        <div className="wrap">
          <div className="sh">
            <h2>Servicios</h2>
            <p>Tocá un servicio para elegir día y horario.</p>
          </div>
          <div className="grid">
            {servicios.map((s) => <TarjetaServicio key={s.id} servicio={s} onReservar={onReservar} />)}
          </div>
        </div>
      </section>
    </>
  )
}
