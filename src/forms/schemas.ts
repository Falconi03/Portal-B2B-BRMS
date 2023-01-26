import * as yup from 'yup'

import Strings from '@/constants'

export enum LoginFieldNames {
  email = 'email',
  password = 'password',
}

export const LoginSchema = yup.object().shape({
  [LoginFieldNames.email]: yup
    .string()
    .email(Strings.inputs.emailError)
    .required(Strings.inputs.fieldRequired),
  [LoginFieldNames.password]: yup.string().required(Strings.inputs.fieldRequired),
})

export enum ResetPasswordRequestFieldNames {
  email = 'email',
}

export const ResetPasswordRequestSchema = yup.object().shape({
  [ResetPasswordRequestFieldNames.email]: yup
    .string()
    .email(Strings.inputs.emailError)
    .required(Strings.inputs.fieldRequired),
})

export enum ResetPasswordChangeFieldNames {
  password = 'password',
  passwordConfirmation = 'passwordConfirmation',
}

export const ResetPasswordChangeSchema = yup.object().shape({
  [ResetPasswordChangeFieldNames.password]: yup
    .string()
    .required(Strings.inputs.fieldRequired)
    .min(8, Strings.inputs.validation.getMinChar(8))
    .matches(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      Strings.resetPassswordChange.form.password.error,
    ),
  [ResetPasswordChangeFieldNames.passwordConfirmation]: yup
    .string()
    .required(Strings.inputs.fieldRequired)
    .oneOf(
      [yup.ref(ResetPasswordChangeFieldNames.password)],
      Strings.resetPassswordChange.form.passwordConfirmation.error,
    ),
})

export enum CadastroPessoaFieldNames {
  nome = 'nome',
  sobrenome = 'sobrenome',
  cpf = 'cpf',
  endereco = 'endereco',
  numero = 'numero',
  cep = 'cep',
  complemento = 'complemento',
}

export const CadastroPessoaSchema = yup.object().shape({
  [CadastroPessoaFieldNames.nome]: yup.string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
  [CadastroPessoaFieldNames.sobrenome]: yup.string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
  [CadastroPessoaFieldNames.cpf]: yup.string()
    .min(14, Strings.inputs.validation.getMinChar(11))
    .max(14, Strings.inputs.validation.getMaxChar(11))
    .required(Strings.inputs.fieldRequired),
  [CadastroPessoaFieldNames.endereco]: yup.string()
    .max(50, Strings.inputs.validation.getMaxChar(50))
    .required(Strings.inputs.fieldRequired),
  [CadastroPessoaFieldNames.numero]: yup.string()
    .max(10, Strings.inputs.validation.getMaxChar(10))
    .required(Strings.inputs.fieldRequired),
  [CadastroPessoaFieldNames.cep]: yup.string()
    .min(9, Strings.inputs.validation.getMinChar(8))
    .max(9, Strings.inputs.validation.getMaxChar(8))
    .required(Strings.inputs.fieldRequired),
  [CadastroPessoaFieldNames.complemento]: yup.string()
    .nullable()
    .max(20, Strings.inputs.validation.getMaxChar(20)),

})
export enum PutDeleteCadastroFieldNames {
  id = 'id',
  nome = 'nome',
  sobrenome = 'sobrenome',
  cpf = 'cpf',
  endereco = 'endereco',
  numero = 'numero',
  cep = 'cep',
  complemento = 'complemento',
}

export const PutDeleteCadastroSchema = yup.object().shape({
  [PutDeleteCadastroFieldNames.id]: yup.string()
    .required(Strings.inputs.fieldRequired),
  [PutDeleteCadastroFieldNames.nome]: yup.string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
  [PutDeleteCadastroFieldNames.sobrenome]: yup.string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
  [PutDeleteCadastroFieldNames.cpf]: yup.string()
    .min(11, Strings.inputs.validation.getMinChar(11))
    .max(11, Strings.inputs.validation.getMaxChar(11))
    .required(Strings.inputs.fieldRequired),
  [PutDeleteCadastroFieldNames.endereco]: yup.string()
    .max(50, Strings.inputs.validation.getMaxChar(50))
    .required(Strings.inputs.fieldRequired),
  [PutDeleteCadastroFieldNames.numero]: yup.string()
    .max(10, Strings.inputs.validation.getMaxChar(10))
    .required(Strings.inputs.fieldRequired),
  [PutDeleteCadastroFieldNames.cep]: yup.string()
    .min(8, Strings.inputs.validation.getMinChar(8))
    .max(9, Strings.inputs.validation.getMaxChar(8))
    .required(Strings.inputs.fieldRequired),
  [PutDeleteCadastroFieldNames.complemento]: yup.string()
    .nullable()
    .max(20, Strings.inputs.validation.getMaxChar(20)),

})

export enum AdministradoraFieldNames {
  nome = 'nome',
}

export const AdministradoraSchema = yup.object().shape({
  [AdministradoraFieldNames.nome]: yup
    .string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
})

export enum PutDelAdministradoraFieldNames {
  id = 'id',
  nome = 'nome',
}

export const PutDelAdministradoraSchema = yup.object().shape({
  [PutDelAdministradoraFieldNames.id]: yup.string()
    .required(Strings.inputs.fieldRequired),
  [PutDelAdministradoraFieldNames.nome]: yup
    .string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
})

export enum BandeiraFieldNames {
  nome = 'nome',
}

export const BandeiraSchema = yup.object().shape({
  [BandeiraFieldNames.nome]: yup
    .string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
})

export enum PutDelBandeiraFieldNames {
  id = 'id',
  nome = 'nome',
}

export const PutDelBandeiraSchema = yup.object().shape({
  [PutDelBandeiraFieldNames.id]: yup.string()
    .required(Strings.inputs.fieldRequired),
  [PutDelBandeiraFieldNames.nome]: yup
    .string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
})
export enum FilialFieldNames {
  cnpj = 'cnpj',
  razao_social = 'razao_social',
  nome_fantasia = 'nome_fantasia',
}

export const FilialSchema = yup.object().shape({
  [FilialFieldNames.cnpj]: yup
    .string()
    .min(18, Strings.inputs.validation.getMinChar(14))
    .max(18, Strings.inputs.validation.getMaxChar(14))
    .required(Strings.inputs.fieldRequired),
  [FilialFieldNames.razao_social]: yup
    .string()
    .max(100, Strings.inputs.validation.getMaxChar(100))
    .required(Strings.inputs.fieldRequired),
  [FilialFieldNames.nome_fantasia]: yup
    .string()
    .max(100, Strings.inputs.validation.getMaxChar(100))
    .required(Strings.inputs.fieldRequired),
})

export enum PutDelFilialFieldNames {
  id = 'id',
  cnpj = 'cnpj',
  razao_social = 'razao_social',
  nome_fantasia = 'nome_fantasia',
}

export const PutDelFilialSchema = yup.object().shape({
  [PutDelFilialFieldNames.id]: yup.string()
    .required(Strings.inputs.fieldRequired),
  [PutDelFilialFieldNames.cnpj]: yup
    .string()
    .min(14, Strings.inputs.validation.getMinChar(14))
    .max(14, Strings.inputs.validation.getMaxChar(14))
    .required(Strings.inputs.fieldRequired),
  [PutDelFilialFieldNames.razao_social]: yup
    .string()
    .max(100, Strings.inputs.validation.getMaxChar(100))
    .required(Strings.inputs.fieldRequired),
  [PutDelFilialFieldNames.nome_fantasia]: yup
    .string()
    .max(100, Strings.inputs.validation.getMaxChar(100))
    .required(Strings.inputs.fieldRequired),
})
export enum ECFieldNames {
  nome = 'nome',
  id_filial = 'filial',
  id_administradora = 'administradora',
  ativo = 'ativo'
}

export const ECSchema = yup.object().shape({
  [ECFieldNames.nome]: yup
    .string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
  [ECFieldNames.id_filial]: yup
    .string()
    .required(),
  [ECFieldNames.id_administradora]: yup
    .string()
    .required(),
  [ECFieldNames.ativo]: yup
    .boolean()
    .oneOf([true, false]),
})

export enum PutDelECFieldNames {
  id = 'id',
  nome = 'nome',
  id_filial = 'id_filial',
  id_administradora = 'id_administradora',
}

export const PutDelECSchema = yup.object().shape({
  [PutDelECFieldNames.id]: yup.string()
    .required(),
  [PutDelECFieldNames.nome]: yup
    .string()
    .max(15, Strings.inputs.validation.getMaxChar(15))
    .required(Strings.inputs.fieldRequired),
  [PutDelECFieldNames.id_filial]: yup
    .string()
    .required(Strings.inputs.fieldRequired),
  [PutDelECFieldNames.id_administradora]: yup
    .string()
    .required(Strings.inputs.fieldRequired),
})

export enum TamanhosFieldNames {
  S = 'S',
  M = 'M',
  L = 'L',
  XL = 'XL',
}

export const TamanhosSchema = yup.object().shape({
  [TamanhosFieldNames.S]: yup.number(),
  [TamanhosFieldNames.M]: yup.number(),
  [TamanhosFieldNames.L]: yup.number(),
  [TamanhosFieldNames.XL]: yup.number(),
})