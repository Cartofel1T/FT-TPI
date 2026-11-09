import './TarjetaEstadistica.css'
export default function TarjetaEstadistica({ valor, etiqueta }) {
  return <div className="stat"><b>{valor}</b><small>{etiqueta}</small></div>
}
