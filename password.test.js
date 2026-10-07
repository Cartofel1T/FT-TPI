import { describe, test, expect } from "vitest";
import { validarPassword, MENSAJES } from "./password.js";

// ─────────────────────────────────────────────────────────────────────
// RESUELTO - dos ejemplos, uno de cada tipo
// ─────────────────────────────────────────────────────────────────────
describe("validarPassword - casos válidos", () => {
  test("acepta una contraseña en el límite inferior de longitud (8)", () => {
    // Arrange
    const password = "Abc1234x"; // exactamente 8 caracteres

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado).toEqual({ valida: true, errores: [] });
  });
});

describe("validarPassword - casos inválidos", () => {
  test("rechaza una contraseña sin mayúsculas", () => {
    const resultado = validarPassword("abc1234x");

    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.MAYUSCULA);
  });
});

// ─────────────────────────────────────────────────────────────────────
// TU TURNO
//
// Como mínimo tienen que estar:
//
//   VALORES LÍMITE de longitud
//     - 7 caracteres  (uno menos que el mínimo)
//     - 8 caracteres  (mínimo, ya resuelto arriba)
//     - 20 caracteres (máximo)
//     - 21 caracteres (uno más que el máximo)
//
//   PARTICIÓN por cada regla de contenido
//     - sin mayúscula (ya resuelto)
//     - sin número
//     - con espacio (al principio, en el medio y al final: ¿son el mismo caso?)
//
//   ACUMULACIÓN de errores
//     - una contraseña que viole 2 reglas devuelve 2 errores
//     - una contraseña que viole las 4 reglas devuelve 4 errores
//
//   CASOS DE LA VIDA REAL
//     - cadena vacía
//     - null / undefined
//     - un número en lugar de un string
//     - una contraseña con ñ o acentos
// ─────────────────────────────────────────────────────────────────────



describe("validarPassword - valores límite de longitud", () => {
  test("acepta una contraseña de 20 caracteres", () => {
    // Arrange
    const password = "A1" + "a".repeat(18); // 20 caracteres

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado).toEqual({ valida: true, errores: [] });
  });

  test("rechaza una contraseña de 7 caracteres", () => {
    // Arrange
    const password = "Abc123x"; // 7 caracteres

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);
  });

  test("rechaza una contraseña de 21 caracteres", () => {
    // Arrange
    const password = "A1" + "a".repeat(19); // 21 caracteres

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);
  });
});

describe("validarPassword - reglas de contenido", () => {
  test("rechaza una contraseña sin números", () => {
    // Arrange
    const password = "Abcdefgh"; 

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.NUMERO);
  });

  test("rechaza una contraseña con un espacio al principio", () => {
    // Arrange
    const password = " Abc1234";

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  });

  test("rechaza una contraseña con un espacio en el medio", () => {
    // Arrange
    const password = "Abc 1234";

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  });

  test("rechaza una contraseña con un espacio al final", () => {
    // Arrange
    const password = "Abc1234 ";

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  });
});

describe("validarPassword - acumulación de errores", () => {
  test("devuelve 2 errores si faltan mayúscula y número", () => {
    // Arrange
    const password = "abcdefgh"; // sin mayuscula y sin numero

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores.length).toBe(2);
    expect(resultado.errores).toContain(MENSAJES.MAYUSCULA);
    expect(resultado.errores).toContain(MENSAJES.NUMERO);
  });

  test("devuelve 4 errores si viola todas las reglas", () => {
    // Arrange
    const password = " a "; // < 8 chars, sin mayuscula, sin numero, con espacios

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores.length).toBe(4);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);
    expect(resultado.errores).toContain(MENSAJES.MAYUSCULA);
    expect(resultado.errores).toContain(MENSAJES.NUMERO);
    expect(resultado.errores).toContain(MENSAJES.ESPACIOS);
  });
});



describe("validarPassword - entradas inesperadas", () => {
  test("rechaza una cadena vacía sin lanzar excepción", () => {
    // Arrange
    const password = "";

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.LONGITUD);
  });

  test("rechaza null sin lanzar excepción", () => {
    // Arrange
    const password = null;

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.TIPO);
  });

  test("rechaza undefined sin lanzar excepción", () => {
    // Arrange
    const password = undefined;

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.TIPO);
  });

  test("rechaza un número sin lanzar excepción", () => {
    // Arrange
    const password = 12345678;

    // Act
    const resultado = validarPassword(password);

    // Assert
    expect(resultado.valida).toBe(false);
    expect(resultado.errores).toContain(MENSAJES.TIPO);
  });
});



describe("validarPassword - caracteres del español", () => {
  test.todo("acepta una contraseña con ñ");
  test.todo("acepta una contraseña con acentos");
});

/*
|
| CASOS EXTRA PARA PRACTICAR (OPCIONALES)
| 
*/

describe("validarPassword - casos extra (opcional)", () => {
  test.todo("acepta una contraseña cuya única mayúscula es acentuada (Á, Ñ)");
  test.todo("rechaza una contraseña con un tab o salto de línea");
});

/* ─────────────────────────────────────────────────────────────────────
   DESAFÍO OPCIONAL
   Reescribí los casos de longitud usando `test.each` con una tabla.
   Fijate cómo la tabla del código queda casi igual a la del documento.
   ───────────────────────────────────────────────────────────────────── */
