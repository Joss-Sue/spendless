import { Transacciones } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'
import mongoose from 'mongoose'

await connectDB()

export class TransaccionesModel {
  static async getAll (id, type) {
    console.log(id, type)
    if (type === 'mixed') {
      return await Transacciones.find({ estado: 1, usuario_id: id })
    } else {
      return await Transacciones.find({ estado: 1, usuario_id: id, tipo: type })
    }
  }

  static async getById ({ id }) {
    console.log(id)

    return await Transacciones.find({ estado: 1, _id: id })
  }

  static async create ({ input }) {
    const transaccion = new Transacciones(input)
    await transaccion.save()
    return transaccion
  }

  static async delete ({ id }) {
    const result = await Transacciones.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const result = await Transacciones.findByIdAndUpdate(id, { $set: input }, { new: true })
    return result || false
  }

  static async getBalance (id) {
    try {
      console.log(id)

      const result = await Transacciones.aggregate([{ $match: { estado: 1, usuario_id: new mongoose.Types.ObjectId(id) } }, // Filtra documentos donde estado = 1 },
        { $group: { _id: null, totalMonto: { $sum: '$monto' } } }])
      return result[0].totalMonto || false
    } catch (error) {
      return console.error('Error al obtener la sumatoria del monto:', error)
    }
  }

  static async getBalanceType (id, type) {
    try {
      console.log(id, type)

      const result = await Transacciones.aggregate([{ $match: { estado: 1, tipo: type, usuario_id: new mongoose.Types.ObjectId(id) } }, // Filtra documentos donde estado = 1 },
        { $group: { _id: null, totalMonto: { $sum: '$monto' } } }])
      return result[0].totalMonto || false
    } catch (error) {
      return console.error('Error al obtener la sumatoria del monto:', error)
    }
  }
}
