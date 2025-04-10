import { FastifyInstance } from 'fastify'

import { Form } from '@prisma/client'

import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { IEntityId } from './schemas/common'
import { FormBody, FormBodySchema } from '../types/form'
import { ApiError } from '../errors'

async function formRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'formRoutes' })

  // Get a form by ID
  app.get<{
    Params: IEntityId
    Reply: Form
  }>('/:id', {
    async handler(req, reply) {
      const { params } = req
      const { id } = params
      log.debug('get form by id')
      try {
        const form = await prisma.form.findUniqueOrThrow({ where: { id } })
        reply.send(form)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('failed to fetch form', 400)
      }
    },
  })

  // Create a form
  app.post<{
    Body: FormBody
    Reply: Form
  }>(
    '/',
    {
      schema: {
        body: FormBodySchema,
      },
    },
    async (req, reply) => {
      const { name, fields } = req.body
      try {
        const form = await prisma.form.create({
          data: { name, fields },
        })
        reply.code(201).send(form)
      } catch (err: any) {
        throw new ApiError('Failed to create form', 400)
      }
    }
  )
}

export default formRoutes
