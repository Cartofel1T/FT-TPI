import axios from 'axios'

const URL_API = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
const CLAVE_SESION = 'norte_sesion'

export const leerSesion = () => {
  try { return JSON.parse(localStorage.getItem(CLAVE_SESION)) } catch { return null }
}
export const guardarSesion = (sesion) => {
  try { localStorage.setItem(CLAVE_SESION, JSON.stringify(sesion)) } catch { }
}
export const borrarSesion = () => {
  try { localStorage.removeItem(CLAVE_SESION) } catch { }
}

const capitalizar = (texto) => texto.charAt(0).toUpperCase() + texto.slice(1)

const cliente = axios.create({ baseURL: URL_API })

cliente.interceptors.request.use((config) => {
  const sesion = leerSesion()
  if (sesion?.token) config.headers.Authorization = `Bearer ${sesion.token}`
  return config
})

cliente.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (!error.response) {
      return Promise.reject(new Error('no se pudo conectar con el servidor'))
    }
    if (error.response.status === 401 && leerSesion()) {
      window.dispatchEvent(new Event('sesion-vencida'))
    }
    const mensaje = error.response.data?.error || 'hubo un error'
    return Promise.reject(new Error(capitalizar(mensaje)))
  }
)

export default cliente
