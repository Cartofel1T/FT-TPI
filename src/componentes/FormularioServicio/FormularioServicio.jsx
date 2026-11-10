import Campo from '../Campo/Campo'
import Boton from '../Boton/Boton'
import './FormularioServicio.css'
export default function FormularioServicio() {
  return (
    <form className="nuevo-servicio" onSubmit={(e) => e.preventDefault()}>
      <Campo label="Nombre del servicio" placeholder="Ej: Corte fade" />
      <Campo label="Precio ($)" type="number" min="0" placeholder="8000" />
      <Campo label="Duración (min)" type="number" min="0" placeholder="30" />
      <Boton type="submit">Agregar servicio</Boton>
    </form>
  )
}
