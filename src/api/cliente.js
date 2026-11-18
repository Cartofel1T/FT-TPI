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

export async function pedir(ruta, { metodo = 'GET', cuerpo } = {}) {
  const sesion = leerSesion()
  const cabeceras = {}
  if (cuerpo) cabeceras['Content-Type'] = 'application/json'
  if (sesion?.token) cabeceras.Authorization = `Bearer ${sesion.token}`

  let respuesta
  try {
    respuesta = await fetch(URL_API + ruta, {
      method: metodo,
      headers: cabeceras,
      body: cuerpo ? JSON.stringify(cuerpo) : undefined,
    })
  } catch {
    throw new Error('no se pudo conectar con el servidor')
  }

  const datos = await respuesta.json().catch(() => null)
  if (!respuesta.ok) {
    if (respuesta.status === 401 && sesion) window.dispatchEvent(new Event('sesion-vencida'))
    throw new Error(capitalizar(datos?.error || 'hubo un error'))
  }
  return datos
}
