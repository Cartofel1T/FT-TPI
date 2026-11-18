import { useState } from 'react'
import BarraNavegacion from './componentes/BarraNavegacion/BarraNavegacion'
import PieDePagina from './componentes/PieDePagina/PieDePagina'
import ModalReserva from './componentes/ModalReserva/ModalReserva'
import Inicio from './paginas/Inicio/Inicio'
import IniciarSesion from './paginas/IniciarSesion/IniciarSesion'
import Registro from './paginas/Registro/Registro'
import PanelTurnos from './paginas/PanelTurnos/PanelTurnos'
import { useSesion } from './contexto/SesionContexto'

export default function App() {
  const { usuario } = useSesion()
  const [vista, setVista] = useState('home')
  const [servicio, setServicio] = useState(null)

  const ir = (v) => { setVista(v); window.scrollTo(0, 0) }
  const reservar = (s) => (usuario ? setServicio(s) : ir('login'))
  const actual = vista === 'panel' && !usuario ? 'login' : vista

  return (
    <>
      <BarraNavegacion onNavigate={ir} />
      {actual === 'home' && <Inicio onNavigate={ir} onReservar={reservar} />}
      {actual === 'login' && <IniciarSesion onNavigate={ir} />}
      {actual === 'register' && <Registro onNavigate={ir} />}
      {actual === 'panel' && <PanelTurnos />}
      <PieDePagina />
      {servicio && (
        <ModalReserva
          servicio={servicio}
          onClose={() => setServicio(null)}
          onReservado={() => { setServicio(null); ir('panel') }}
        />
      )}
    </>
  )
}