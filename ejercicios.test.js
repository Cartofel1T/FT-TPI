import { describe, test, it, expect } from 'vitest';
import {
  sumar,
  esMayorDeEdad,
  saludar,
  calcularDescuento,
  calcularTotal
} from './funciones.js';

describe("iniciales", () => {
  test("devuelve las iniciales de un nombre y dos apellidos", () => {
    // Arrange
    const nombreCompleto = "juan perez gomez";
    // Act
    const resultado = iniciales(nombreCompleto);
    // Assert
    expect(resultado).toBe("J.P.G.");
  });

  test("funciona con un nombre de una sola palabra", () => {
    expect(iniciales("ana")).toBe("A.");
  });

  test("ignora los espacios de mas", () => {
    // le meto espacios extra al principio, medio y final
    expect(iniciales("  ana   maria  ")).toBe("A.M.");
  });

  test("devuelve una cadena vacia si el nombre esta vacio", () => {
    // caso extremo
    expect(iniciales("")).toBe("");
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