import cliente from './cliente'

export const listarTurnos = () => cliente.get('/turnos').then((r) => r.data)
export const listarEstados = () => cliente.get('/turnos/estados').then((r) => r.data)
export const horariosDisponibles = (fecha, idServicio) =>
  cliente.get('/turnos/disponibles', { params: { fecha, id_servicio: idServicio } }).then((r) => r.data)
export const crearTurno = (id_servicio, fecha_hora) =>
  cliente.post('/turnos', { id_servicio, fecha_hora }).then((r) => r.data)
export const cancelarTurno = (id) => cliente.patch(`/turnos/${id}/cancelar`).then((r) => r.data)
export const cambiarEstado = (id, id_estado) =>
  cliente.patch(`/turnos/${id}/estado`, { id_estado }).then((r) => r.data)
export const eliminarTurno = (id) => cliente.delete(`/turnos/${id}`).then((r) => r.data)
