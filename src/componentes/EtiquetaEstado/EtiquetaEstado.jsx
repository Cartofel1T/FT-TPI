import './EtiquetaEstado.css'
export default function EtiquetaEstado({ nombre }) {
  return <span className={`tag estado-${nombre.toLowerCase()}`}>{nombre}</span>
}