import cliente from './cliente'

export const iniciarSesion = (email, contrasenia) =>
  cliente.post('/auth/login', { email, contrasenia }).then((r) => r.data)

export const registrarse = (nombre, email, contrasenia) =>
  cliente.post('/auth/registro', { nombre, email, contrasenia }).then((r) => r.data)
