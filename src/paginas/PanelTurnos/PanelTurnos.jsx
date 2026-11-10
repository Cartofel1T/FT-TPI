import TarjetaEstadistica from '../../componentes/TarjetaEstadistica/TarjetaEstadistica'
import EtiquetaEstado from '../../componentes/EtiquetaEstado/EtiquetaEstado'
import Boton from '../../componentes/Boton/Boton'
import FormularioServicio from '../../componentes/FormularioServicio/FormularioServicio'
import { turnos, estados } from '../../datos/turnos'
import { servicios } from '../../datos/servicios'
import './PanelTurnos.css'
const money = (n) => '$' + Number(n).toLocaleString('es-AR')
export default function PanelTurnos() {
  return (
    <section>
      <div className="wrap">
        <div className="sh">
          <h2>Panel de turnos</h2>
          <p>Controlá la agenda, cambiá estados y administrá el catálogo.</p>
        </div>
        <div className="stats">
          {estados.map((e) => (
            <TarjetaEstadistica key={e.id} valor={turnos.filter((t) => t.estado === e.id).length} etiqueta={e.nombre + 's'} />
          ))}
        </div>
        <div className="tw">
          <table>
            <thead><tr><th>Cliente</th><th>Servicio</th><th>Día</th><th>Hora</th><th>Estado</th><th>Acciones</th></tr></thead>
            <tbody>
              {turnos.map((t) => (
                <tr key={t.id}>
                  <td>{t.cliente}</td><td>{t.servicio}</td><td>{t.dia}</td><td>{t.hora}</td>
                  <td><EtiquetaEstado id={t.estado} /></td>
                  <td><Boton variant="ghost" size="sm">Eliminar</Boton></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="panel__cat">
          <div className="sh"><h2 style={{ fontSize: 44 }}>Catálogo</h2></div>
          <div className="tw">
            <table>
              <thead><tr><th>Servicio</th><th>Precio</th><th>Duración</th><th>Acciones</th></tr></thead>
              <tbody>
                {servicios.map((s) => (
                  <tr key={s.id}>
                    <td>{s.nombre}</td><td>{money(s.precio)}</td><td>{s.min} min</td>
                    <td><Boton variant="ghost" size="sm">Eliminar</Boton></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <FormularioServicio />
        </div>
      </div>
    </section>
  )
}