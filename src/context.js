import Store from '@/store'

class Context {
  constructor(config, options) {
    this._config = config
    this._options = options
    this._store = new Store()
  }

  iterations(methodName) {
    if (typeof methodName === 'string' || methodName instanceof String)
      return this._options.methods[methodName]
    return this._options.iterations
  }

  methods() {
    return this._config.methods
  }

  result(methodName) {
    return this._options.methods[methodName].result
  }

  stop() {
    this._options.stop = true
  }

  log(message = '') {
    console.dir(this.current().self.name + ': ' + message)
  }

  current() {
    return this._options.current
  }

  store(key, value, defaultValue) {
    if (key !== undefined && value === undefined)
      return this._store.get(key, defaultValue)
    if (key !== undefined && value !== undefined)
      return this._store.set(key, value)
    return this._store
  }

  async delay(millisecond) {
    await new Promise((resolve) => setTimeout(resolve, millisecond))
  }
}

export default Context
