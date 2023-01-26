import { isFinite, isPlainObject } from 'lodash'

import BaseModel from './base-model'

export const snakeToCamel = (key: string): string =>
  key.replace(/([_][a-z])/gi, $1 => $1.toUpperCase().replace('_', ''))

export const defaultString = (value: unknown): string => {
  if (value && typeof (value as string)?.toString === 'function') {
    return (value as string).toString()
  }
  return ''
}

export const defaultNumber = (value: unknown): number => {
  if (value && typeof (value as string)?.toString === 'function') {
    const num = parseInt((value as string).toString(), 10)
    if (isFinite(num)) {
      return num
    }
  }
  return 0
}

export const defaultFloat = (value: unknown): number => {
  if (value && typeof (value as string)?.toString === 'function') {
    const num = parseFloat((value as string).toString())
    if (isFinite(num)) {
      return num
    }
  }
  return 0
}

export const defaultBoolean = (value: unknown): boolean => !!value

export const defaultDate = (value: unknown): Date | string => {
  if (value && typeof (value as string)?.toString === 'function') {
    return new Date((value as string).toString()).toISOString() 
  }
  return new Date()
}

export const defaultArray = <V>(value: unknown): Array<V> => {
  let list = []
  if (Array.isArray(value)) {
    list = value
  } else if (value) {
    list = [value]
  }
  return list as Array<V>
}

export function defaultEnum<EnumType>(
  value: unknown,
  enumObj: Record<string, unknown>,
  defaultValue: EnumType,
): EnumType {
  if (value && Object.values(enumObj).includes(value)) {
    return value as EnumType
  }
  return defaultValue
}

export function defaultObject<O>(value: unknown, defaultObj?: O | undefined): O {
  let obj = isPlainObject(value) || (value instanceof BaseModel && value) ? value : {}
  if (defaultObj) {
    obj = Object.assign(defaultObj, obj)
  }
  return obj as O
}

export function defaultCamelCaseObject<T>(value: Record<string, unknown>): T {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {}
  if (value) {
    Object.keys(value).forEach(key => {
      const currentValue = value[key]
      obj[snakeToCamel(key)] = currentValue
      if (Array.isArray(currentValue)) {
        obj[snakeToCamel(key)] = currentValue.map(x => defaultObject(x))
      } else if (typeof currentValue === 'object') {
        obj[snakeToCamel(key)] = defaultObject(currentValue)
      } else if (currentValue === 'true' || currentValue === 'false') {
        obj[snakeToCamel(key)] = JSON.parse(currentValue)
      }
    })
  }
  return obj
}

export function emptyStringToUndefined(value: unknown): string | undefined {
  if (typeof value === 'string' && value.length > 0) {
    return value as string
  }
  return undefined
}

export function emptyArrayToUndefined<T>(value: unknown): Array<T> | undefined {
  if (Array.isArray(value) && value.length > 0) {
    return value as Array<T>
  }
  return undefined
}

export default {
  defaultBoolean,
  defaultCamelCaseObject,
  defaultEnum,
  defaultFloat,
  defaultNumber,
  defaultObject,
  defaultString,
  emptyStringToUndefined,
  emptyArrayToUndefined,
}
