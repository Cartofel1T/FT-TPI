import cliente from './cliente'

export const listarServicios = () => cliente.get('/servicios').then((r) => r.data)
export const crearServicio = (datos) => cliente.post('/servicios', datos).then((r) => r.data)
export const actualizarServicio = (id, datos) => cliente.put(`/servicios/${id}`, datos).then((r) => r.data)
export const eliminarServicio = (id) => cliente.delete(`/servicios/${id}`).then((r) => r.data)
