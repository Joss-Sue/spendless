import mongoose from 'mongoose'

import { uri } from './env.js'

let isConnected = false

export const connectDB = async () => {
  if (isConnected) {
    return
  }

  try {
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    })
    isConnected = true // Actualizar el estado de la conexión
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Error connecting to MongoDB:', error)
    throw new Error('Could not connect to MongoDB')
  }
}

export default connectDB
