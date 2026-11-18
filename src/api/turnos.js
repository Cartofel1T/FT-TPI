import { pedir } from './cliente'

export const listarTurnos = () => pedir('/turnos')
export const listarEstados = () => pedir('/turnos/estados')
export const horariosDisponibles = (fecha, idServicio) =>
  pedir(`/turnos/disponibles?fecha=${fecha}&id_servicio=${idServicio}`)
export const crearTurno = (id_servicio, fecha_hora) =>
  pedir('/turnos', { metodo: 'POST', cuerpo: { id_servicio, fecha_hora } })
export const cancelarTurno = (id) => pedir(`/turnos/${id}/cancelar`, { metodo: 'PATCH' })
export const cambiarEstado = (id, id_estado) =>
  pedir(`/turnos/${id}/estado`, { metodo: 'PATCH', cuerpo: { id_estado } })
export const eliminarTurno = (id) => pedir(`/turnos/${id}`, { metodo: 'DELETE' })
