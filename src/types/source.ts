import { Type, Static } from '@sinclair/typebox'

const SourceDataInput = Type.Object({
  question: Type.String(),
  answer: Type.String(),
})

const SourceRecordBodySchema = Type.Object({
  formId: Type.String({ format: 'uuid' }),
  sourceData: Type.Array(SourceDataInput),
})

type SourceRecordBody = Static<typeof SourceRecordBodySchema>

export { SourceRecordBody, SourceRecordBodySchema }
