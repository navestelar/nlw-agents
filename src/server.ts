import { fastify } from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from "fastify-type-provider-zod";
import { fastifyCors } from "@fastify/cors";
import { env } from "./env.ts";
import { sql } from './db/connection.ts'
import { getRoomsRoute } from "./http/routes/get-rooms.ts";

const app = fastify()

app.register(fastifyCors, {
   origin: 'http://localhost:5173',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.get('/health', () => {
  return 'OK'
})

app.register(getRoomsRoute)

app.listen({ port: env.PORT ? Number(env.PORT) : 3333 })
  .then((port) => console.log(`HTTP server running on ${port}`))