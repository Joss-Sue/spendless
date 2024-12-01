import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  alias: { type: String, required: true },
  direccion: { type: String },
  telefono: { type: String },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  imagen: { type: String },
  fecha_creacion: { type: Date, default: Date.now },
  estado: { type: Number, enum: [0, 1], default: 1 }
})

export const Usuarios = mongoose.model('Usuarios', usuarioSchema)

const transaccionesSchema = new mongoose.Schema({
  monto: { type: Number, required: true },
  tipo: { type: String, enum: ['ingreso', 'gasto'], required: true },
  fecha_transac: { type: Date, default: Date.now },
  descripcion: { type: String },
  usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' },
  imagen: { type: [String], default: [] },
  estado: { type: Number, enum: [0, 1], default: 1 }
})
export const Transacciones = mongoose.model('Transacciones', transaccionesSchema)

export async function calcularBalance (usuarioId) {
  return await Transacciones.aggregate([
    { $match: { tipo: 'gasto', estado: 1 } },
    {
      $group: {
        _id: null,
        totalMonto: {
          $sum: {
            $cond: {
              if: { $eq: ['$tipo', 'ingreso'] },
              then: '$monto',
              else: { $multiply: ['$monto', -1] }
            }
          }
        }
      }
    }
  ])
}
