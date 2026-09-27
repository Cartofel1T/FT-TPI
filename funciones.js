export function sumar(a, b) {
  return a + b;
}

export function esMayorDeEdad(edad) {
  return edad >= 18;
}

export function saludar(nombre) {
  return `Hola, ${nombre}!`;
}

export function calcularDescuento(cantidad) {
  if (cantidad >= 10) {
    return 0.15;
  }
  return 0;
}

export function calcularTotal(items) {
  return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
}