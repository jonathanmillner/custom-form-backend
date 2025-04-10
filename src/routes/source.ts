import { FastifyInstance } from 'fastify'
import { SourceRecord } from '@prisma/client'
import prisma from '../db/db_client'
import { ApiError } from '../errors'

async function sourceRoutes(app: FastifyInstance) {
  // Create a source record with nested source data
  app.post<{
    Body: { formId: string; sourceData: { question: string; answer: string }[] }
    Reply: SourceRecord
  }>('/', async (req, reply) => {
    const { formId, sourceData } = req.body
    try {
      const sourceRecord = await prisma.sourceRecord.create({
        data: {
          formId,
          sourceData: { create: sourceData },
        },
        include: { sourceData: true },
      })
      reply.code(201).send(sourceRecord)
    } catch (err: any) {
      throw new ApiError('Failed to create source record', 400)
    }
  })
}

export default sourceRoutes
