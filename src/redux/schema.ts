import { normalize, NormalizedSchema, schema } from 'normalizr'

import { EstoqueSaldo, GeneralSettings, User, TitulosReceber } from '@/models'

//inicio
const userSchema = new schema.Entity(
  'user',
  {},
  {
    processStrategy: user => new User(user),
  },
)

const userNormalizer = (user: User): NormalizedSchema<{ user: { [id: string]: User } }, string> =>
  normalize(user, userSchema)
//fim

//inicio
const generalSettingsSchema = new schema.Entity(
  'generalSettings',
  {},
  {
    processStrategy: generalSettings => new GeneralSettings(generalSettings),
  },
)

const generalSettingsNormalizer = (generalSettings: GeneralSettings,): NormalizedSchema<{ generalSettings: { [id: string]: GeneralSettings } }, string> =>
  normalize(generalSettings, generalSettingsSchema)
//fim

//inicio
const estoqueSaldoSchema = new schema.Entity(
  'estoqueSaldo',
  {},
  {
    processStrategy: estoqueSaldo => new EstoqueSaldo(estoqueSaldo),
  },
)

const estoqueSaldoNormalizer = (estoqueSaldo: EstoqueSaldo,): NormalizedSchema<{ estoqueSaldo: { [id: string]: EstoqueSaldo } }, string> =>
  normalize(estoqueSaldo, estoqueSaldoSchema)
//fim

//inicio
const titulosReceberSchema = new schema.Entity(
  'titulosReceber',
  {},
  {
    processStrategy: titulosReceber => new TitulosReceber(titulosReceber),
  },
)

const titulosReceberNormalizer = (titulosReceber: TitulosReceber,): NormalizedSchema<{ titulosReceber: { [id: string]: TitulosReceber } }, string> =>
  normalize(titulosReceber, titulosReceberSchema)
//fim

export { titulosReceberNormalizer, estoqueSaldoNormalizer, userNormalizer, generalSettingsNormalizer }
