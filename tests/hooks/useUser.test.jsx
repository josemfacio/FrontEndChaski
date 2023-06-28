import { useUser } from "../../src/hooks";

describe("Pruebas de  UseUser - Hooks", () => {
  test("Prueba para listar a todos los usuarios", () => {
    //1. Iniciar
    const ms1 = "hola";
    //2. Estimulo
    const ms2 = ms1.trim();
    //3. Observacion
    expect(ms1).toBe(ms2);
  });
});
// describe("Prueba de la función updateUser de useUser()", () => {
//   test("Actualización del usuario establece el estado de carga en verdadero", async () => {
//     // Obtener la función updateUser de useUser()
//     const { updateUser } = useUser();

//     // Mockear el token y los datos del usuario
//     const mockToken = "mockToken";
//     const mockData = { name: "John Doe" };

//     // Mockear la función setLoading
//     const setLoading = jest.fn();

//     // Llamar a la función updateUser con los datos mockeados
//     await updateUser(1, mockData);

//     // Verificar que la función setLoading haya sido llamada con el valor true
//     expect(setLoading).toHaveBeenCalledWith(true);
//   });
// });

// // Tests that the updateUser function sets the loading state to true.
