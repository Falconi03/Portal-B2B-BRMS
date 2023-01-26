/*  eslint-disable camelcase */
import BaseModel from './base-model'
import { defaultString } from './defaults'

export enum GeneralSettingsDataFieldsEnum {
  contactInfo = 'contact_info',
}

export type GeneralSettingsDataType = {
  [GeneralSettingsDataFieldsEnum.contactInfo]: string | undefined
}

export default class GeneralSettings extends BaseModel {
  [GeneralSettingsDataFieldsEnum.contactInfo]!: string

  constructor(data: Record<string, unknown> = {}) {
    super()

    this[GeneralSettingsDataFieldsEnum.contactInfo] = defaultString(
      data[GeneralSettingsDataFieldsEnum.contactInfo],
    )
  }

  get contactInfo(): string {
    return this[GeneralSettingsDataFieldsEnum.contactInfo]
  }
}
