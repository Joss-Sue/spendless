import z from 'zod'

const transaccionesSchema = z.object({
  usuario_id: z.string({
    invalid_type_error: 'usuario_id must be a string',
    required_error: 'usuario_id is required.'
  }).min(1),
  monto: z.number('Debe ser numerico').int('debe ser entero')
    .positive('La cantidad debe ser un número positivo')
    .max(999999999, 'La cantidad máxima permitida es 999,999,999'), // Puedes ajustar el máximo si es necesario
  tipo: z.enum(['ingreso', 'gasto']),
  descripcion: z.string()
  // imagen: z.string()
})

export function validate (input) {
  return transaccionesSchema.safeParse(input)
}

export function validatePartial (input) {
  return transaccionesSchema.partial().safeParse(input)
}
