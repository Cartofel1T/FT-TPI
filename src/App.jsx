import { Route, Switch, Redirect } from 'wouter'
import BarraNavegacion from './componentes/BarraNavegacion/BarraNavegacion'
import PieDePagina from './componentes/PieDePagina/PieDePagina'
import Inicio from './paginas/Inicio/Inicio'
import IniciarSesion from './paginas/IniciarSesion/IniciarSesion'
import Registro from './paginas/Registro/Registro'
import PanelTurnos from './paginas/PanelTurnos/PanelTurnos'
import { useSesion } from './contexto/SesionContexto'

export default function App() {
  const { usuario } = useSesion()

  return (
    <>
      <BarraNavegacion />
      <Switch>
        <Route path="/"><Inicio /></Route>
        <Route path="/login"><IniciarSesion /></Route>
        <Route path="/registro"><Registro /></Route>
        <Route path="/panel">
          {usuario ? <PanelTurnos /> : <Redirect to="/login" />}
        </Route>
        <Route><Redirect to="/" /></Route>
      </Switch>
      <PieDePagina />
    </>
  )
}