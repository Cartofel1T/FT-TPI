import { pedir } from './cliente'

export const iniciarSesion = (email, contrasenia) =>
  pedir('/auth/login', { metodo: 'POST', cuerpo: { email, contrasenia } })

export const registrarse = (nombre, email, contrasenia) =>
  pedir('/auth/registro', { metodo: 'POST', cuerpo: { nombre, email, contrasenia } })
