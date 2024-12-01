import z from 'zod'

const usuarioSchema = z.object({
  nombre: z.string({
    invalid_type_error: 'Nombre must be a string',
    required_error: 'Nombre is required.'
  }).min(1),
  correo: z.string().email({
    invalid_type_error: 'Email must be a string',
    required_error: 'Email is required.'
  }).min(1),
  contrasena: z.string().min(6),
  alias: z.string(),
  direccion: z.string().min(0),
  telefono: z.string().min(0)
})

export function validate (input) {
  return usuarioSchema.safeParse(input)
}

export function validatePartial (input) {
  return usuarioSchema.partial().safeParse(input)
}
