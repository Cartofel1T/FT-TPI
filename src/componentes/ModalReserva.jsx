import Boton from '../Boton/Boton'
import Campo from '../Campo/Campo'
import { horarios } from '../../datos/horarios'
import './ModalReserva.css'
const money = (n) => '$' + Number(n).toLocaleString('es-AR')
export default function ModalReserva({ servicio, onClose }) {
  return (
    <div className="ov" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2>{servicio.nombre}</h2>
        <p className="modal__dur">{servicio.min} min · {money(servicio.precio)}</p>
        <Campo label="Día" type="date" />
        <div className="f"><span>Horario</span></div>
        <div className="slots">
          {horarios.map((hr, i) => (
            <button key={hr} className={'slot' + (i === 2 ? ' on' : '')} disabled={i === 5}>{hr}</button>
          ))}
        </div>
        <div className="modal__actions">
          <Boton variant="ghost" onClick={onClose}>Cancelar</Boton>
          <Boton onClick={onClose}>Confirmar turno</Boton>
        </div>
      </div>
    </div>
  )
}
