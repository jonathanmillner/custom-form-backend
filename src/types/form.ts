import { Type, Static } from '@sinclair/typebox'

const FieldDefinition = Type.Object({
  type: Type.Union([
    Type.Literal('text'),
    Type.Literal('datetime'),
    Type.Literal('boolean'),
  ]),
  question: Type.String(),
  required: Type.Boolean(),
})

const FieldsMap = Type.Record(Type.String(), FieldDefinition)

const FormBodySchema = Type.Object({
  name: Type.String(),
  fields: FieldsMap,
})

type FormBody = Static<typeof FormBodySchema>

export { FormBody, FormBodySchema }
