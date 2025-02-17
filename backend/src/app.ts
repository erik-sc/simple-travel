import express from 'express'
import dotenv from 'dotenv'
import { createRoutes } from './infrastructure/startup/createRoutes'
import cors from 'cors'
import { startup } from './infrastructure/startup/startup'

dotenv.config()

const run = async () => {

  const app = express()

  app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }))

  const services = startup();

  app.use(express.json())
  app.use(createRoutes(services))

  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
  })
}

run()
