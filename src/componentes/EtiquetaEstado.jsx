import { estados } from '../../datos/turnos'
import './EtiquetaEstado.css'
export default function EtiquetaEstado({ id }) {
  const e = estados.find((x) => x.id === id)
  return <span className={`tag e${id}`}>{e?.nombre}</span>
}
