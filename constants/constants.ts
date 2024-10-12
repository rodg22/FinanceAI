const accountOptions = [
  "ADQUISICIONES",
  "AGUA",
  "ARBA",
  "CELULAR",
  "COMBUSTIBLE",
  "COMIDA",
  "COMIDA(paseo)",
  "DONACIONES",
  "ESTUDIO/CAPACITACIONES",
  "GASTOS DEL AUTO",
  "INGRESOFIJO",
  "INGRESOVARIABLE",
  "LEÑA",
  "LIMPIEZA E HIGIENE",
  "MONOTRIBUTO",
  "MUNICIPAL",
  "OCIO/HOBBY",
  "PASIVOS DEUDA TC1",
  "PEAJES",
  "PELUQUERÍA",
  "PERREITAS",
  "REGALOS",
  "REPARACIONES HOGAR",
  "ROPA",
  "SALUD",
  "SERVICIOS",
  "VIAJES",
] as const;

const exampleData = {
  fecha: "formato dd/mm/yyyy",
  quienPago: "RODRIGO o MARA, no hay otra opción",
  cuenta: "string dentro de las opciones de cuenta",
  monto: "es un numero sin caracteres especiales",
  observaciones: "string con observaciones",
};

export const dataToSend = (text: string) =>
  `Dame el objeto Data resultante a partir del string: ${text}. Opciones de cuenta:${JSON.stringify(
    accountOptions
  )} Formato requerido si no hay error: ${JSON.stringify(
    exampleData
  )}. Si info es insuficiente devuelve {"error": "Info insuficiente"}`;

export const mockedData = [
  "01/01/2000",
  "RODRIGO",
  "COMIDA",
  "1999",
  "Mocked observation",
];
