import { Router } from 'express'

import { UsuariosController } from '../api/usuarios-controller.js'

export const sesionRouter = Router()

sesionRouter.post('/', UsuariosController.matchCorreo)
// sesionRouter.post('/', UsuariosController.create)
