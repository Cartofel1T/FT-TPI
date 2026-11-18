import { createContext, useContext, useEffect, useState } from 'react'
import { leerSesion, guardarSesion, borrarSesion } from '../api/cliente'
import { iniciarSesion, registrarse } from '../api/autenticacion'

const SesionContexto = createContext(null)
export const useSesion = () => useContext(SesionContexto)

export function SesionProvider({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  const cerrarSesion = () => { borrarSesion(); setUsuario(null) }

  useEffect(() => {
    window.addEventListener('sesion-vencida', cerrarSesion)
    return () => window.removeEventListener('sesion-vencida', cerrarSesion)
  }, [])

  const entrar = async (email, contrasenia) => {
    const datos = await iniciarSesion(email.trim(), contrasenia)
    const sesion = { token: datos.token, nombre: datos.nombre, rol: datos.rol }
    guardarSesion(sesion)
    setUsuario(sesion)
    return sesion
  }

  const registrar = async (nombre, email, contrasenia) => {
    await registrarse(nombre.trim(), email.trim(), contrasenia)
    return entrar(email, contrasenia)
  }

  return (
    <SesionContexto.Provider value={{ usuario, esAdmin: usuario?.rol === 'admin', entrar, registrar, cerrarSesion }}>
      {children}
    </SesionContexto.Provider>
  )
}
