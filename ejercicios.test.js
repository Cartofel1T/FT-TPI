import { describe, test, it, expect } from 'vitest';
import { 
  sumar, 
  esMayorDeEdad, 
  saludar, 
  calcularDescuento, 
  calcularTotal 
} from './funciones.js';

describe('calcularDescuento', () => {
  it('aplicar el 15% a partir de 10 unidades', () => {
    // arrange (preparacin)
    const cantidad = 10;

    // act accion/ajecucion
    const resultado = calcularDescuento(cantidad);

    // assert (afirmacion/Verificacion)
    expect(resultado).toBe(0.15);
  });
});

describe('calcularTotal', () => {
  test('Suma el precio de todos los productos del carrito', () => {
    // arrange (preparacion - preparo el escenario)
    const items = [
      { nombre: 'Alfajores', precio: 20, cantidad: 1 },
      { nombre: 'Jugo', precio: 50, cantidad: 2 }
    ];

    // act (actuador - lo que se va a ejecutar)
    const total = calcularTotal(items);

    // assert (afirmacion/Verificacion)
    expect(total).toBe(120);
  });
});

describe('Pruebas de Funciones Esenciales', () => {

  // ejer 1
  test('devuelve 8 cuando se suma 5 y 3', () => {
    const num1 = 3;
    const num2 = 5;
    const cantidadTotal = sumar(num1, num2);
    expect(cantidadTotal).toBe(8);
  });

  // ejer 2
  test('devuelve 0 cuando se suman dos 0', () => {
    const num1 = 0;
    const num2 = 0;
    const total = sumar(num1, num2);
    expect(total).toBe(0);
  });

  // ejer 3
  test('devuelve true cuando la edad es 20', () => {
    const edad = 20;
    const cantidadEdad = esMayorDeEdad(edad);
    expect(cantidadEdad).toBe(true);
  });

  // ejer 4
  test('devuelve false cuando la edad es 17', () => {
    const edad = 17;
    const cantidadEdad = esMayorDeEdad(edad);
    expect(cantidadEdad).toBe(false);
  });

  // ejer 5
  test('devuelve "Hola, Ana!" cuando el nombre es "Ana"', () => {
    const nombre = 'Ana';
    const nom = saludar(nombre);
    expect(nom).toBe('Hola, Ana!');
  });

});

// bien: Separar en tests independientes en lugar de probar multiples acciones en un solo test
describe('Manejo del Carrito', () => {

  test('agregar producto', () => {
    // coded de prueba para agregar
  });

  test('eliminar producto', () => {
    // code de prueba para eliminar
  });

});