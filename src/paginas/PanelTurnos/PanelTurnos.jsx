import { useCallback, useEffect, useRef, useState } from 'react'
import TarjetaEstadistica from '../../componentes/TarjetaEstadistica/TarjetaEstadistica'
import EtiquetaEstado from '../../componentes/EtiquetaEstado/EtiquetaEstado'
import Boton from '../../componentes/Boton/Boton'
import FormularioServicio from '../../componentes/FormularioServicio/FormularioServicio'
import { useSesion } from '../../contexto/SesionContexto'
import { listarTurnos, listarEstados, cambiarEstado, cancelarTurno, eliminarTurno } from '../../api/turnos'
import { listarServicios, crearServicio, actualizarServicio, eliminarServicio } from '../../api/servicios'
import { dinero, fechaCorta, horaDe } from '../../utilidades/formato'
import './PanelTurnos.css'

const CERRADOS = ['Completado', 'Cancelado']

export default function PanelTurnos() {
  const { esAdmin } = useSesion()
  const [turnos, setTurnos] = useState([])
  const [estados, setEstados] = useState([])
  const [servicios, setServicios] = useState([])
  const [filtro, setFiltro] = useState(0)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [aviso, setAviso] = useState('')
  const [editando, setEditando] = useState(null)
  const refFormulario = useRef(null)

  const cargar = useCallback(async () => {
    try {
      const [t, e] = await Promise.all([listarTurnos(), listarEstados()])
      setTurnos(t); setEstados(e)
      if (esAdmin) setServicios(await listarServicios())
    } catch (err) {
      setError(err.message)
    } finally {
      setCargando(false)
    }
  }, [esAdmin])
  useEffect(() => { window.scrollTo(0, 0) }, [])
  useEffect(() => { cargar() }, [cargar])

  // Ejecuta una acción del backend, muestra el resultado y recarga los datos
  const ejecutar = async (accion, mensaje) => {
    setError(''); setAviso('')
    try {
      await accion()
      setAviso(mensaje)
      await cargar()
      return true
    } catch (err) {
      setError(err.message)
      return false
    }
  }

  // Crea un servicio nuevo o, si hay uno en edición, guarda sus cambios
  const guardarServicio = async (datos) => {
    if (!editando) return ejecutar(() => crearServicio(datos), 'Servicio agregado')
    const ok = await ejecutar(() => actualizarServicio(editando.id_servicio, datos), 'Servicio actualizado')
    if (ok) setEditando(null)
    return ok
  }

  const empezarEdicion = (servicio) => {
    setEditando(servicio)
    refFormulario.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const visibles = turnos.filter((t) => !filtro || t.id_estado === filtro)

  return (
    <section>
      <div className="wrap">
        <div className="sh">
          <h2>{esAdmin ? 'Panel de turnos' : 'Mis turnos'}</h2>
          <p>{esAdmin ? 'Controlá la agenda, cambiá estados y administrá el catálogo.' : 'Tus reservas. Podés cancelar las que sigan activas.'}</p>
        </div>
        {error && <div className="alerta" role="alert">{error}</div>}
        {aviso && <div className="alerta alerta--ok" role="status">{aviso}</div>}

        {esAdmin && (
          <div className="stats">
            {estados.map((e) => (
              <TarjetaEstadistica key={e.id_estado} valor={turnos.filter((t) => t.id_estado === e.id_estado).length} etiqueta={e.nombre_estado + 's'} />
            ))}
          </div>
        )}

        <div className="filtros">
          <label htmlFor="filtro">Filtrar por estado</label>
          <select id="filtro" value={filtro} onChange={(e) => setFiltro(Number(e.target.value))}>
            <option value={0}>Todos</option>
            {estados.map((e) => <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>)}
          </select>
        </div>

        <div className="tw">
          {cargando ? <p className="aviso">Cargando turnos…</p> : visibles.length === 0 ? (
            <p className="aviso">No hay turnos para mostrar. Reservá desde el catálogo de servicios.</p>
          ) : (
            <table>
              <thead>
                <tr>{esAdmin && <th>Cliente</th>}<th>Servicio</th><th>Día</th><th>Hora</th><th>Estado</th><th>Acciones</th></tr>
              </thead>
              <tbody>
                {visibles.map((t) => (
                  <tr key={t.id_turno}>
                    {esAdmin && <td>{t.cliente}</td>}
                    <td>{t.servicio}</td>
                    <td>{fechaCorta(t.fecha_hora)}</td>
                    <td>{horaDe(t.fecha_hora)}</td>
                    <td>
                      {esAdmin && t.estado !== 'Cancelado' ? (
                        <select className="estado-select" aria-label="Estado del turno" value={t.id_estado}
                          onChange={(e) => ejecutar(() => cambiarEstado(t.id_turno, Number(e.target.value)), 'Estado actualizado')}>
                          {estados.map((e) => <option key={e.id_estado} value={e.id_estado}>{e.nombre_estado}</option>)}
                        </select>
                      ) : <EtiquetaEstado nombre={t.estado} />}
                    </td>
                    <td>
                      {esAdmin ? (
                        <Boton variant="ghost" size="sm" onClick={() => window.confirm('¿Eliminar este turno?') && ejecutar(() => eliminarTurno(t.id_turno), 'Turno eliminado')}>Eliminar</Boton>
                      ) : !CERRADOS.includes(t.estado) ? (
                        <Boton variant="ghost" size="sm" onClick={() => ejecutar(() => cancelarTurno(t.id_turno), 'Turno cancelado')}>Cancelar turno</Boton>
                      ) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {esAdmin && (
          <div className="panel__cat">
            <div className="sh"><h2 style={{ fontSize: 44 }}>Catálogo</h2></div>
            <div className="tw">
              <table>
                <thead><tr><th>Servicio</th><th>Precio</th><th>Duración</th><th>Acciones</th></tr></thead>
                <tbody>
                  {servicios.map((s) => (
                    <tr key={s.id_servicio}>
                      <td>{s.nombre}</td><td>{dinero(s.precio)}</td><td>{s.duracion} min</td>
                      <td>
                        <Boton variant="ghost" size="sm" onClick={() => empezarEdicion(s)}>Editar</Boton>{' '}
                        <Boton variant="ghost" size="sm" onClick={() => ejecutar(() => eliminarServicio(s.id_servicio), 'Servicio eliminado')}>Eliminar</Boton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div ref={refFormulario}>
              <FormularioServicio inicial={editando} onGuardar={guardarServicio} onCancelar={() => setEditando(null)} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}