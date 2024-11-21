import express, { json } from 'express' // require -> commonJS
import { usuariosRouter } from './routes/usuarios-routes.js'
import { transaccionesRouter } from './routes/transacciones-routes.js'
import { sesionRouter } from './routes/sesion-routes.js'
// import { corsMiddleware } from './middleware/cors.js'

const app = express()
app.use(express.json({ limit: '10mb' }))
//app.use(express.urlencoded({limit: '50mb'}))

//app.use(corsMiddleware())
app.disable('x-powered-by') // deshabilitar el header X-Powered-By: Express
app.get('/', (req, res) => res.send('Express on Vercel'))
app.use('/usuarios', usuariosRouter)
app.use('/transacciones', transaccionesRouter)
app.use('/sesion', sesionRouter)

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
