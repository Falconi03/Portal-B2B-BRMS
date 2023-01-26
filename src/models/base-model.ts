import { immerable } from 'immer'

export default class Model {
  [immerable]: boolean

  constructor() {
    this[immerable] = true
  }
}
