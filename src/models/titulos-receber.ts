/*  eslint-disable camelcase */
import BaseModel from './base-model'
import { defaultBoolean, defaultNumber, defaultFloat, defaultString, defaultDate } from './defaults'


export enum TitulosReceberDataFieldsEnum {
  filial = 'filial',
  cnpj = 'cnpj',
  nome  = 'nome',
  prefixo = 'prefixo',
  numero = 'numero',
  parcela = 'parcela',
  valor = 'valor',
  saldo = 'saldo',
  emissao = 'emissao',
  vencimento = 'vencimento',
  baixa = 'baixa',
  danfe = 'danfe',
  xml = 'xml',
  boleto = 'boleto',
}

export type TitulosReceberDataType = {
  [TitulosReceberDataFieldsEnum.filial]: string | undefined
  [TitulosReceberDataFieldsEnum.cnpj]: string | undefined
  [TitulosReceberDataFieldsEnum.nome]: string | undefined
  [TitulosReceberDataFieldsEnum.prefixo]: string | undefined
  [TitulosReceberDataFieldsEnum.numero]: string | undefined
  [TitulosReceberDataFieldsEnum.parcela]: string | undefined
  [TitulosReceberDataFieldsEnum.valor]: number | undefined
  [TitulosReceberDataFieldsEnum.saldo]: number | undefined
  [TitulosReceberDataFieldsEnum.emissao]: Date | undefined 
  [TitulosReceberDataFieldsEnum.vencimento]: Date | undefined
  [TitulosReceberDataFieldsEnum.baixa]: string| undefined
  [TitulosReceberDataFieldsEnum.danfe]: string| undefined
  [TitulosReceberDataFieldsEnum.xml]: string| undefined
  [TitulosReceberDataFieldsEnum.boleto]: string| undefined
}

export default class TitulosReceber extends BaseModel {
    [TitulosReceberDataFieldsEnum.filial]!: string;
    [TitulosReceberDataFieldsEnum.cnpj]!: string;
    [TitulosReceberDataFieldsEnum.nome]!: string;
    [TitulosReceberDataFieldsEnum.prefixo]!: string;
    [TitulosReceberDataFieldsEnum.numero]!: string;
    [TitulosReceberDataFieldsEnum.parcela]!: string;
    [TitulosReceberDataFieldsEnum.valor]!: number;
    [TitulosReceberDataFieldsEnum.saldo]!: number;
    [TitulosReceberDataFieldsEnum.emissao]!: Date | string;
    [TitulosReceberDataFieldsEnum.vencimento]!: Date | string;
    [TitulosReceberDataFieldsEnum.baixa]!: string;
    [TitulosReceberDataFieldsEnum.danfe]!: string;
    [TitulosReceberDataFieldsEnum.xml]!: string;
    [TitulosReceberDataFieldsEnum.boleto]!: string;

  constructor(data: Record<string, unknown>) {
    super()

    this[TitulosReceberDataFieldsEnum.filial] = defaultString(data[TitulosReceberDataFieldsEnum.filial])
    this[TitulosReceberDataFieldsEnum.cnpj] = defaultString(data[TitulosReceberDataFieldsEnum.cnpj])
    this[TitulosReceberDataFieldsEnum.nome] = defaultString(data[TitulosReceberDataFieldsEnum.nome])
    this[TitulosReceberDataFieldsEnum.prefixo] = defaultString(data[TitulosReceberDataFieldsEnum.prefixo])
    this[TitulosReceberDataFieldsEnum.numero] = defaultString(data[TitulosReceberDataFieldsEnum.numero])
    this[TitulosReceberDataFieldsEnum.parcela] = defaultString(data[TitulosReceberDataFieldsEnum.parcela])
    this[TitulosReceberDataFieldsEnum.valor] = defaultFloat(data[TitulosReceberDataFieldsEnum.valor])
    this[TitulosReceberDataFieldsEnum.saldo] = defaultFloat(data[TitulosReceberDataFieldsEnum.saldo])
    this[TitulosReceberDataFieldsEnum.emissao] = defaultDate(data[TitulosReceberDataFieldsEnum.emissao])
    this[TitulosReceberDataFieldsEnum.vencimento] = defaultDate(data[TitulosReceberDataFieldsEnum.vencimento])
    this[TitulosReceberDataFieldsEnum.baixa] = defaultString(data[TitulosReceberDataFieldsEnum.baixa])
    this[TitulosReceberDataFieldsEnum.danfe] = defaultString(data[TitulosReceberDataFieldsEnum.danfe])
    this[TitulosReceberDataFieldsEnum.xml] = defaultString(data[TitulosReceberDataFieldsEnum.xml])
    this[TitulosReceberDataFieldsEnum.boleto] = defaultString(data[TitulosReceberDataFieldsEnum.boleto])
  }

  get reservaBrms(): number {
    return this[TitulosReceberDataFieldsEnum.valor]
  }

  //get b2XTimes(): string {
  //  return this[TitulosReceberDataFieldsEnum.emissao]
  //}
}

export enum TitulosPagosDataFieldsEnum {
  dias = 'dias',
}

export interface TitulosPagosDataType {
  [TitulosPagosDataFieldsEnum.dias]: string | undefined
}

export class TitulosPagosPayload extends BaseModel {
  [TitulosPagosDataFieldsEnum.dias]!: string

  constructor(dias: string) {
    super()
    this[TitulosPagosDataFieldsEnum.dias] = dias
  }

  toJSON(): TitulosPagosDataType | Record<string, unknown> {
    return {
      [TitulosPagosDataFieldsEnum.dias]: this[
        TitulosPagosDataFieldsEnum.dias
      ],
    }
  }
}
export enum TitulosAbertosDataFieldsEnum {
  dias = 'dias',
}

export interface TitulosAbertosDataType {
  [TitulosAbertosDataFieldsEnum.dias]: string | undefined
}

export class TitulosAbertosPayload extends BaseModel {
  [TitulosAbertosDataFieldsEnum.dias]!: string

  constructor(dias: string) {
    super()
    this[TitulosAbertosDataFieldsEnum.dias] = dias
  }

  toJSON(): TitulosAbertosDataType | Record<string, unknown> {
    return {
      [TitulosAbertosDataFieldsEnum.dias]: this[
        TitulosAbertosDataFieldsEnum.dias
      ],
    }
  }
}