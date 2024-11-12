import { Router } from 'express'

import { UsuariosController } from '../controllers/usuarios-controller.js'

export const usuariosRouter = Router()

usuariosRouter.get('/', UsuariosController.getAll)
usuariosRouter.post('/', UsuariosController.create)

usuariosRouter.get('/:id', UsuariosController.getById)
usuariosRouter.delete('/:id', UsuariosController.delete)
usuariosRouter.patch('/:id', UsuariosController.update)
