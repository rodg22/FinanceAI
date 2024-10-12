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
  fecha: "string con formato dd/mm/yyyy",
  quienPago: "RODRIGO o MARA",
  cuenta: "string dentro de las opciones de cuenta",
  monto: "es un numero",
  observaciones: "string con observaciones",
};

export const dataToSend = (text: string) =>
  `Dame el objeto Data resultante a partir del string: ${text}. Opciones de cuenta:${JSON.stringify(
    accountOptions
  )} Ejemplo del formato de respuesta: ${JSON.stringify(exampleData)}`;
