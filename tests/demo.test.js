describe("Pruebas de <Usuario/>", () => {
  test("Prueba que no debe fallar", () => {
    //1. Iniciar
    const ms1 = "hola";
    //2. Estimulo
    const ms2 = ms1.trim();
    //3. Observacion
    expect(ms1).toBe(ms2);
  });
});
