import { console } from 'inspector'
import { TransaccionesModel } from '../models/mongoose/transacciones-model.js'
import { validate, validatePartial } from './schemas/transacciones-validaciones.js'

export class TransaccionesController {
  static async getAll (req, res) {
    const { id, type } = req.params
    console.log(id, type)
    const transacciones = await TransaccionesModel.getAll(id, type)
    res.json(transacciones)
  }

  static async getById (req, res) {
    const { id } = req.params
    console.log(id)
    const usuario = await TransaccionesModel.getById({ id })
    if (usuario) return res.json(usuario)
    res.status(404).json({ message: 'object not found' })
  }

  static async getByIdLastest (req, res) {
    const { id } = (req.body)
    console.log(id)
    const transacciones = await TransaccionesModel.getByIdLastest(id)
    if (transacciones) return res.json(transacciones)
    return res.status(400).json({ message: 'object not found' })
  }

  static async getBalance (req, res) {
    const { id } = req.params
    console.log(id)
    const balance = await TransaccionesModel.getBalance(id)
    if (balance) return res.json(balance)
    res.status(404).json({ message: 'object not found' })
  }

  static async getBalanceType (req, res) {
    const { id, type } = req.params
    console.log(id, type)
    const balance = await TransaccionesModel.getBalanceType(id, type)
    if (balance) return res.json(balance)
    res.status(404).json({ message: 'object not found' })
  }

  static async create (req, res) {
    const result = validate(req.body)
    if (!result.success) {
    // 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newObject = await TransaccionesModel.create({ input: result.data })
    res.status(201).json(newObject)
  }

  static async delete (req, res) {
    const { id } = req.params
    const result = await TransaccionesModel.delete({ id })
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
    const updatedUsuario = await TransaccionesModel.update({ id, input: result.data })
    return res.json(updatedUsuario)
  }
}
