export const dinero = (n) => '$' + Number(n).toLocaleString('es-AR')

export const fechaCorta = (fechaHora) =>
  new Date(fechaHora.replace(' ', 'T')).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
export const horaDe = (fechaHora) => fechaHora.slice(11, 16)

export const hoyISO = () => {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}
export const esDomingo = (iso) => {
  const [a, m, d] = iso.split('-').map(Number)
  return new Date(a, m - 1, d).getDay() === 0
}
