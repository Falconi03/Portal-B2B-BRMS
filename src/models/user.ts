/*  eslint-disable camelcase */
import BaseModel from './base-model'
import { defaultNumber, defaultString } from './defaults'

export enum LoginPayloadDataFieldsEnum {
  email = 'email',
  password = 'password',
}

export interface LoginPayloadDataType {
  [LoginPayloadDataFieldsEnum.email]: string | undefined
  [LoginPayloadDataFieldsEnum.password]: string | undefined
}

export class LoginPayload extends BaseModel {
  [LoginPayloadDataFieldsEnum.email]!: string;

  [LoginPayloadDataFieldsEnum.password]!: string

  constructor(email: string, password: string) {
    super()
    this[LoginPayloadDataFieldsEnum.email] = email
    this[LoginPayloadDataFieldsEnum.password] = password
  }

  toJSON(): LoginPayloadDataType | Record<string, unknown> {
    return {
      [LoginPayloadDataFieldsEnum.email]: this[LoginPayloadDataFieldsEnum.email],
      [LoginPayloadDataFieldsEnum.password]: this[LoginPayloadDataFieldsEnum.password],
    }
  }
}

export enum ResetPasswordRequestPayloadDataFieldsEnum {
  email = 'email',
}

export interface ResetPasswordRequestPayloadDataType {
  [ResetPasswordRequestPayloadDataFieldsEnum.email]: string | undefined
}

export class ResetPasswordRequestPayload extends BaseModel {
  [ResetPasswordRequestPayloadDataFieldsEnum.email]!: string

  constructor(email: string) {
    super()
    this[ResetPasswordRequestPayloadDataFieldsEnum.email] = email
  }

  toJSON(): ResetPasswordRequestPayloadDataType | Record<string, unknown> {
    return {
      [ResetPasswordRequestPayloadDataFieldsEnum.email]: this[
        ResetPasswordRequestPayloadDataFieldsEnum.email
      ],
    }
  }
}

export enum ResetPasswordChangePayloadDataFieldsEnum {
  token = 'token',
  password = 'password',
}

export interface ResetPasswordChangePayloadDataType {
  [ResetPasswordChangePayloadDataFieldsEnum.token]: string | undefined
  [ResetPasswordChangePayloadDataFieldsEnum.password]: string | undefined
}

export class ResetPasswordChangePayload extends BaseModel {
  [ResetPasswordChangePayloadDataFieldsEnum.token]!: string;

  [ResetPasswordChangePayloadDataFieldsEnum.password]!: string

  constructor(token: string, password: string) {
    super()
    this[ResetPasswordChangePayloadDataFieldsEnum.token] = token
    this[ResetPasswordChangePayloadDataFieldsEnum.password] = password
  }

  toJSON(): ResetPasswordChangePayloadDataType | Record<string, unknown> {
    return {
      [ResetPasswordChangePayloadDataFieldsEnum.token]: this[
        ResetPasswordChangePayloadDataFieldsEnum.token
      ],
      [ResetPasswordChangePayloadDataFieldsEnum.password]: this[
        ResetPasswordChangePayloadDataFieldsEnum.password
      ],
    }
  }
}

export enum UserDataFieldsEnum {
  id = 'pk',
  firstName = 'first_name',
  lastName = 'last_name',
  email = 'email',
  token = 'token',
  refresh = 'refresh',
  access = 'access',
}

export type UserDataType = {
  [UserDataFieldsEnum.id]: number | undefined
  [UserDataFieldsEnum.email]: string | null | undefined
  [UserDataFieldsEnum.firstName]: string | null | undefined
  [UserDataFieldsEnum.lastName]: string | null | undefined
  [UserDataFieldsEnum.token]:
    | {
        [UserDataFieldsEnum.refresh]: string
        [UserDataFieldsEnum.access]: string
      }
    | undefined
    | null
}

export default class User extends BaseModel {
  [UserDataFieldsEnum.id]!: number;

  [UserDataFieldsEnum.email]!: string;

  [UserDataFieldsEnum.firstName]!: string;

  [UserDataFieldsEnum.lastName]!: string;

  [UserDataFieldsEnum.token]!: {
    [UserDataFieldsEnum.refresh]: string
    [UserDataFieldsEnum.access]: string
  }

  constructor(data: Record<string, unknown> = {}) {
    super()
    this[UserDataFieldsEnum.id] = defaultNumber(data[UserDataFieldsEnum.id])
    this[UserDataFieldsEnum.email] = defaultString(data[UserDataFieldsEnum.email])
    this[UserDataFieldsEnum.firstName] = defaultString(data[UserDataFieldsEnum.firstName])
    this[UserDataFieldsEnum.lastName] = defaultString(data[UserDataFieldsEnum.lastName])
    this[UserDataFieldsEnum.email] = defaultString(data[UserDataFieldsEnum.email])
    this[UserDataFieldsEnum.token] = {
      [UserDataFieldsEnum.refresh]: defaultString(data[UserDataFieldsEnum.refresh]),
      [UserDataFieldsEnum.access]: defaultString(data[UserDataFieldsEnum.access]),
    }
  }

  get id(): number {
    return this[UserDataFieldsEnum.id]
  }

  get firstName(): string {
    return this[UserDataFieldsEnum.firstName]
  }

  get lastName(): string {
    return this[UserDataFieldsEnum.lastName]
  }
}
