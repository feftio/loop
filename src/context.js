import Storage from '@/storage'

class Context {
  constructor(config, options) {
    this._config = config
    this._options = options
    this._storage = new Storage()
  }

  iterations(methodName) {
    if (typeof methodName === 'string' || methodName instanceof String)
      return this._options.methods[methodName]
    return this._options.iterations
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

  storage() {
    return this._storage
  }

  async delay(millisecond) {
    await new Promise((resolve) => setTimeout(resolve, millisecond))
  }
}

export default Context
