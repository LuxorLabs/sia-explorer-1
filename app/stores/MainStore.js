import { observable } from 'mobx'

export class MainStore {
  @observable counter = 0
  @observable stats = {}
  @observable address = ''
}
