import express, { json } from 'express' // require -> commonJS
import { usuariosRouter } from './routes/usuarios-routes.js'
import { transaccionesRouter } from './routes/transacciones-routes.js'
// import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.use(json())
// app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express

app.use('/usuarios', usuariosRouter)
app.use('/transacciones', transaccionesRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
