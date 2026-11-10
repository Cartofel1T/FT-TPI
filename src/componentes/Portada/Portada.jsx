import Boton from '../Boton/Boton'
import './Portada.css'
export default function Portada({ onNavigate }) {
  return (
    <header className="hero">
      <div className="wrap hero__in">
        <div>
          <h1>Tu turno, sin esperar en la <br /> silla</h1>
          <p>Elegí el servicio, el día y la hora. Cuando llegás, la silla y las herramientas ya están listas.</p>
          <div className="hero__row">
            <a href="#servicios"><Boton>Reservar turno</Boton></a>
            <Boton variant="ghost" onClick={() => onNavigate('login')}>Ya tengo cuenta</Boton>
          </div>
        </div>
      </div>
    </header>
  )
}
