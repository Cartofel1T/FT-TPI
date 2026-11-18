import { pedir } from './cliente'

export const listarServicios = () => pedir('/servicios')
export const crearServicio = (datos) => pedir('/servicios', { metodo: 'POST', cuerpo: datos })
export const eliminarServicio = (id) => pedir(`/servicios/${id}`, { metodo: 'DELETE' })
