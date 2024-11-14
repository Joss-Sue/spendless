import { UsuariosModel } from '../models/mongoose/usuarios-model.js'
import { validate, validatePartial } from './schemas/usuarios-validaciones.js'

export class UsuariosController {
  static async getAll (req, res) {
    const usuarios = await UsuariosModel.getAll()
    res.json(usuarios)
  }

  static async getById (req, res) {
    const { id } = req.params
    const usuario = await UsuariosModel.getById({ id })
    if (usuario) return res.json(usuario)
    res.status(404).json({ message: 'object not found' })
  }

  static async create (req, res) {
    const result = validate(req.body)
    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newObject = await UsuariosModel.create({ input: result.data })
    res.status(201).json(newObject)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await UsuariosModel.delete({ id })
    if (result === false) {
      return res.status(404).json({ message: 'Object not found' })
    }
    return res.json({ message: 'Object deleted' })
  }

  static async update (req, res) {
    const result = validatePartial(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    const updatedUsuario = await UsuariosModel.update({ id, input: result.data })
    return res.json(updatedUsuario)
  }

  static async matchCorreo (req, res) {
    const { email, password } = req.query
    const idUser = await UsuariosModel.matchCorreo({ email, password })
    if (idUser === false) {
      return res.status(204).json({ message: 'Ningun usuario coincide' })
    }
    return res.json(idUser)
  }
}
