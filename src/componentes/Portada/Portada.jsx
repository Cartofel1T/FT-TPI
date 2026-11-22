import Boton from '../Boton/Boton'
import { useSesion } from '../../contexto/SesionContexto'
import './Portada.css'
export default function Portada() {
  const { usuario } = useSesion()
  return (
    <header className="hero">
      <div className="wrap hero__in">
        <div>
          <h1>Tu turno, sin esperar en la silla</h1>
          <p>Elegí el servicio, el día y la hora. Cuando llegás, la silla y las herramientas ya están listas.</p>
          <div className="hero__row">
            <a href="#servicios"><Boton>Reservar turno</Boton></a>
            {!usuario && <Boton variant="ghost" href="/login">Ya tengo cuenta</Boton>}
          </div>
        </div>
      </div>
    </header>
  )
}
