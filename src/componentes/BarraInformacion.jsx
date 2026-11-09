import './BarraInformacion.css'
export default function BarraInformacion() {
  return (
    <div className="info">
      <div className="wrap info__in">
        <span><strong>Horario: </strong>lunes a sábado, 10:00 a 19:00</span>
        <span><strong>Domingos: </strong>cerrado</span>
        <span><strong>Turnos: </strong>cada 30 minutos</span>
      </div>
    </div>
  )
}
