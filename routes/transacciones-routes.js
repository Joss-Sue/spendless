import { Router } from 'express'

import { TransaccionesController } from '../api/transacciones-controller.js'

export const transaccionesRouter = Router()

transaccionesRouter.get('/type/balance/:id/:type', TransaccionesController.getBalanceType)
transaccionesRouter.get('/all/:id/:type', TransaccionesController.getAll)
transaccionesRouter.get('/balance/:id', TransaccionesController.getBalance)
transaccionesRouter.post('/last', TransaccionesController.getByIdLastest)
transaccionesRouter.post('/', TransaccionesController.create)

transaccionesRouter.get('/:id', TransaccionesController.getById)
transaccionesRouter.delete('/:id', TransaccionesController.delete)
transaccionesRouter.patch('/:id', TransaccionesController.update)
