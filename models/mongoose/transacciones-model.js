import { Transacciones } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'
import mongoose from 'mongoose'

await connectDB()

export class TransaccionesModel {
  static async getAll (id, type) {
    if (type === 'mixed') {
      return await Transacciones.find({ activo: 1, usuario_id: id }).sort({ fecha_transac: -1 })
    } else {
      return await Transacciones.find({ activo: 1, usuario_id: id, tipo: type }).sort({ fecha_transac: -1 })
    }
  } 

  /* static async getAll (id) {
    const transacciones = await Transacciones.find({ activo: 1, usuario_id: id })
      .sort({ fecha_transac: -1 })

    // Modificar el campo imagen para incluir solo el primer string del array
    return transacciones.map((transaccion) => {
      const imagen = transaccion.imagen?.[0] || null // Obtener el primer string o null si no hay imagen
      return {
        ...transaccion.toObject(), // Convertir a objeto plano
        imagen // Sobrescribir el campo imagen
      }
    })
  } */

  static async getById ({ id }) {
    return await Transacciones.find({ activo: 1, _id: id })
  }

  static async getByIdLastest (id) {
    return await Transacciones.find({ activo: 1, usuario_id: id })
      .sort({ fecha_transac: -1 })
      .limit(5)
  }

  static async create ({ input }) {
    const transaccion = new Transacciones(input)
    await transaccion.save()
    return transaccion
  }

  static async delete ({ id }) {
    const result = await Transacciones.findByIdAndUpdate(id, { $set: { activo: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const result = await Transacciones.findByIdAndUpdate(id, { $set: input }, { new: true })
    return result || false
  }

  static async updateSync ({ id }) {
    try {
      // Usar Promise.all para procesar todas las actualizaciones simultáneamente
      const results = await Promise.all(
        id.map(async (ids) => {
          const result = await Transacciones.findByIdAndUpdate(ids, { $set: { estado: 1 } })
          return !!result // Devuelve `false` si no se encuentra el ID
        })
      )

      const allSuccessful = results.every((success) => success)

      return allSuccessful
    } catch (error) {
      console.error('Error en update:', error)
      return false
    }
  }

  static async getBalance (id) {
    try {
      const result = await Transacciones.aggregate([
        { $match: { activo: 1, usuario_id: new mongoose.Types.ObjectId(id) } }, // Filtra documentos donde estado = 1 y usuario_id coincide
        {
          $group: {
            _id: null,
            totalIngresos: {
              $sum: { $cond: [{ $eq: ['$tipo', 'ingreso'] }, '$monto', 0] } // Suma solo los montos de tipo ingreso
            },
            totalGastos: {
              $sum: { $cond: [{ $eq: ['$tipo', 'gasto'] }, '$monto', 0] } // Suma solo los montos de tipo gasto
            }
          }
        },
        {
          $project: {
            balance: { $subtract: ['$totalIngresos', '$totalGastos'] } // Resta totalGastos de totalIngresos
          }
        }
      ])

      return result[0]?.balance || false // Devuelve el balance calculado o false si no hay resultado
    } catch (error) {
      console.error('Error al obtener el balance del monto:', error)
      return false
    }
  }

  static async getBalanceType (id, type) {
    try {
      console.log(id, type)

      const result = await Transacciones.aggregate([{ $match: { activo: 1, tipo: type, usuario_id: new mongoose.Types.ObjectId(id) } }, // Filtra documentos donde estado = 1 },
        { $group: { _id: null, totalMonto: { $sum: '$monto' } } }])
      return result[0].totalMonto || false
    } catch (error) {
      return console.error('Error al obtener la sumatoria del monto:', error)
    }
  }
}
