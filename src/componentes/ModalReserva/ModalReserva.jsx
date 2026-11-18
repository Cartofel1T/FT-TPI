import { useEffect, useState } from 'react'
import Boton from '../Boton/Boton'
import Campo from '../Campo/Campo'
import { horariosDisponibles, crearTurno } from '../../api/turnos'
import { dinero, hoyISO, esDomingo } from '../../utilidades/formato'
import './ModalReserva.css'

export default function ModalReserva({ servicio, onClose, onReservado }) {
  const [fecha, setFecha] = useState('')
  const [horarios, setHorarios] = useState([])
  const [hora, setHora] = useState('')
  const [cargando, setCargando] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setHora(''); setHorarios([]); setError('')
    if (!fecha || esDomingo(fecha)) return
    let activo = true
    setCargando(true)
    horariosDisponibles(fecha, servicio.id_servicio)
      .then((d) => activo && setHorarios(d))
      .catch((e) => activo && setError(e.message))
      .finally(() => activo && setCargando(false))
    return () => { activo = false }
  }, [fecha, servicio.id_servicio])

  const confirmar = async () => {
    setEnviando(true); setError('')
    try {
      await crearTurno(servicio.id_servicio, `${fecha} ${hora}:00`)
      onReservado()
    } catch (e) {
      setError(e.message); setEnviando(false)
    }
  }

  return (
    <div className="ov" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <h2>{servicio.nombre}</h2>
        <p className="modal__dur">{servicio.duracion} min · {dinero(servicio.precio)}</p>
        <Campo label="Día" type="date" min={hoyISO()} value={fecha} onChange={(e) => setFecha(e.target.value)} />
        {fecha && esDomingo(fecha) && <div className="alerta">Los domingos estamos cerrados. Elegí otro día.</div>}
        {cargando && <p className="aviso">Buscando horarios…</p>}
        {horarios.length > 0 && (
          <>
            <div className="f"><span>Horario</span></div>
            <div className="slots">
              {horarios.map((h) => (
                <button key={h.hora} className={'slot' + (hora === h.hora ? ' on' : '')} disabled={!h.disponible} onClick={() => setHora(h.hora)}>
                  {h.hora}
                </button>
              ))}
            </div>
            {!horarios.some((h) => h.disponible) && <div className="alerta">No quedan horarios libres ese día.</div>}
          </>
        )}
        {error && <div className="alerta" role="alert">{error}</div>}
        <div className="modal__actions">
          <Boton variant="ghost" onClick={onClose}>Cancelar</Boton>
          <Boton disabled={!fecha || !hora || enviando} onClick={confirmar}>{enviando ? 'Reservando…' : 'Confirmar turno'}</Boton>
        </div>
      </div>
    </div>
  )
}