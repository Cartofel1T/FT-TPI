import { useEffect, useState } from 'react'
import Campo from '../Campo/Campo'
import Boton from '../Boton/Boton'
import './FormularioServicio.css'

const vacio = { nombre: '', precio: '', duracion: '', descripcion: '' }

export default function FormularioServicio({ inicial = null, onGuardar, onCancelar }) {
  const [datos, setDatos] = useState(vacio)
  const [enviando, setEnviando] = useState(false)
  const cambiar = (campo) => (e) => setDatos({ ...datos, [campo]: e.target.value })

  useEffect(() => {
    setDatos(inicial ? {
      nombre: inicial.nombre,
      precio: String(inicial.precio),
      duracion: String(inicial.duracion),
      descripcion: inicial.descripcion ?? '',
    } : vacio)
  }, [inicial])

  const enviar = async (e) => {
    e.preventDefault()
    setEnviando(true)
    const guardado = await onGuardar({
      nombre: datos.nombre.trim(),
      descripcion: datos.descripcion.trim(),
      precio: Number(datos.precio),
      duracion: Number(datos.duracion),
    })
    if (guardado && !inicial) setDatos(vacio)
    setEnviando(false)
  }

  return (
    <form className="nuevo-servicio" onSubmit={enviar}>
      <Campo label="Nombre del servicio" placeholder="Ej: Corte fade" required value={datos.nombre} onChange={cambiar('nombre')} />
      <Campo label="Precio ($)" type="number" min="0" placeholder="8000" required value={datos.precio} onChange={cambiar('precio')} />
      <Campo label="Duración (min)" type="number" min="1" placeholder="30" required value={datos.duracion} onChange={cambiar('duracion')} />
      <Campo label="Descripción (opcional)" value={datos.descripcion} onChange={cambiar('descripcion')} />
      <div className="nuevo-servicio__acciones">
        <Boton type="submit" disabled={enviando}>
          {enviando ? 'Guardando…' : inicial ? 'Guardar cambios' : 'Agregar servicio'}
        </Boton>
        {inicial && <Boton type="button" variant="ghost" onClick={onCancelar}>Cancelar edición</Boton>}
      </div>
    </form>
  )
}