/*  eslint-disable camelcase */
import BaseModel from './base-model'
import { defaultNumber, defaultString, defaultFloat } from './defaults'

export enum EstoqueSaldoDataFieldsEnum {
  codigo = 'codigo',
  descricao = 'descricao',
  percentualIpi = 'percentual_ipi',
  ncm = 'codigo_ncm',
  codigoBarras = 'codigo_barras',
  preco = "preco",
  precoSugerido = 'preco_sugerido',
  saldo = 'saldo',
}

export type EstoqueSaldoDataType = {
  [EstoqueSaldoDataFieldsEnum.codigo]: string | undefined
  [EstoqueSaldoDataFieldsEnum.descricao]: string | undefined
  [EstoqueSaldoDataFieldsEnum.percentualIpi]: number | undefined  
  [EstoqueSaldoDataFieldsEnum.ncm]: string | undefined
  [EstoqueSaldoDataFieldsEnum.codigoBarras]: string | undefined
  [EstoqueSaldoDataFieldsEnum.preco]: number | undefined
  [EstoqueSaldoDataFieldsEnum.precoSugerido]: number | undefined
  [EstoqueSaldoDataFieldsEnum.saldo]: number | undefined
}

export default class EstoqueSaldo extends BaseModel {

  [EstoqueSaldoDataFieldsEnum.codigo]!: string;

  [EstoqueSaldoDataFieldsEnum.descricao]!: string;

  [EstoqueSaldoDataFieldsEnum.percentualIpi]!: number;

  [EstoqueSaldoDataFieldsEnum.ncm]!: string;

  [EstoqueSaldoDataFieldsEnum.codigoBarras]!: string;

  [EstoqueSaldoDataFieldsEnum.preco]!: number;

  [EstoqueSaldoDataFieldsEnum.precoSugerido]!: number;

  [EstoqueSaldoDataFieldsEnum.saldo]!: number;

  constructor(data: Record<string, unknown> = {}) {
    super()

    this[EstoqueSaldoDataFieldsEnum.codigo] = defaultString(data[EstoqueSaldoDataFieldsEnum.codigo])
    this[EstoqueSaldoDataFieldsEnum.descricao] = defaultString(data[EstoqueSaldoDataFieldsEnum.descricao])
    this[EstoqueSaldoDataFieldsEnum.percentualIpi] = defaultFloat(data[EstoqueSaldoDataFieldsEnum.percentualIpi])
    this[EstoqueSaldoDataFieldsEnum.ncm] = defaultString(data[EstoqueSaldoDataFieldsEnum.ncm])
    this[EstoqueSaldoDataFieldsEnum.codigoBarras] = defaultString(data[EstoqueSaldoDataFieldsEnum.codigoBarras])
    this[EstoqueSaldoDataFieldsEnum.preco] = defaultFloat(data[EstoqueSaldoDataFieldsEnum.precoSugerido])
    this[EstoqueSaldoDataFieldsEnum.precoSugerido] = defaultFloat(data[EstoqueSaldoDataFieldsEnum.precoSugerido])
    this[EstoqueSaldoDataFieldsEnum.saldo] = defaultNumber(data[EstoqueSaldoDataFieldsEnum.saldo])
  }
  

  get reservaBrms(): number {
    return this[EstoqueSaldoDataFieldsEnum.saldo]
  }

  /* get b2XTimes(): string {
    return this[EstoqueSaldoDataFieldsEnum.b2XTimes]
  } */
}
