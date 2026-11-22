import { useEffect, useState } from 'react'
import { Redirect } from 'wouter'
import Portada from '../../componentes/Portada/Portada'
import BarraInformacion from '../../componentes/BarraInformacion/BarraInformacion'
import TarjetaServicio from '../../componentes/TarjetaServicio/TarjetaServicio'
import ModalReserva from '../../componentes/ModalReserva/ModalReserva'
import { listarServicios } from '../../api/servicios'
import './Inicio.css'
export default function Inicio() {
  const [servicios, setServicios] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')
  const [servicio, setServicio] = useState(null)
  const [reservado, setReservado] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
    listarServicios().then(setServicios).catch((e) => setError(e.message)).finally(() => setCargando(false))
  }, [])

  if (reservado) return <Redirect to="/panel" />

  return (
    <>
      <Portada />
      <BarraInformacion />
      <section id="servicios">
        <div className="wrap">
          <div className="sh">
            <h2>Servicios</h2>
            <p>Tocá un servicio para elegir día y horario.</p>
          </div>
          {cargando && <p className="aviso">Cargando servicios…</p>}
          {error && <div className="alerta" role="alert">{error}</div>}
          {!cargando && !error && servicios.length === 0 && <p className="aviso">Todavía no hay servicios cargados.</p>}
          <div className="grid">
            {servicios.map((s) => <TarjetaServicio key={s.id_servicio} servicio={s} onReservar={setServicio} />)}
          </div>
        </div>
      </section>
      {servicio && (
        <ModalReserva
          servicio={servicio}
          onClose={() => setServicio(null)}
          onReservado={() => setReservado(true)}
        />
      )}
    </>
  )
}
