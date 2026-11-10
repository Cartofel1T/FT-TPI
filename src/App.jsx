import { useState } from 'react'
import BarraNavegacion from './componentes/BarraNavegacion/BarraNavegacion';
import PieDePagina from './componentes/PieDePagina/PieDePagina';
import ModalReserva from './componentes/ModalReserva/ModalReserva';
import Inicio from './paginas/Inicio/Inicio';
import IniciarSesion from './paginas/IniciarSesion/IniciarSesion';
import Registro from './paginas/Registro/Registro';
import PanelTurnos from './paginas/PanelTurnos/PanelTurnos';

export default function App() {
  const [view, setView] = useState('home')
  const [servicio, setServicio] = useState(null)
  const go = (v) => { setView(v); window.scrollTo(0, 0) }
  return (
    <>
      <BarraNavegacion onNavigate={go} />
      {view === 'home' && <Inicio onNavigate={go} onReservar={setServicio} />}
      {view === 'login' && <IniciarSesion onNavigate={go} />}
      {view === 'register' && <Registro onNavigate={go} />}
      {view === 'panel' && <PanelTurnos />}
      <PieDePagina />
      {servicio && <ModalReserva servicio={servicio} onClose={() => setServicio(null)} />}
    </>
  )
}
