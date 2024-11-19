import { Usuarios } from './Schemas/schemas-mongo.js'
import connectDB from './config/db.js'

await connectDB()

export class UsuariosModel {
  static async getAll () {
    return await Usuarios.find({ estado: 1 })
  }

  static async getOne (correoParam) {
    return await Usuarios.findOne({ correo: correoParam })
  }

  static async getById ({ id }) {
    return await Usuarios.findById(id)
  }

  static async create ({ input }) {
    const usuario = new Usuarios(input)
    await usuario.save()
    return usuario
  }

  static async delete ({ id }) {
    const result = await Usuarios.findByIdAndUpdate(id, { $set: { estado: 0 } })
    return result || false
  }

  static async update ({ id, input }) {
    const result = await Usuarios.findByIdAndUpdate(id, { $set: input }, { new: true })
    return result || false
  }

  static async matchCorreo ({ email, password }) {
    const usuario = await Usuarios.findOne({ correo: email, contrasena: password, estado: 1 })
    return usuario || false
  }
}
