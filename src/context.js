class Context {
  constructor(config, options) {
    this._config = config
    this._options = options
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
    if (!(methodName in this._options.methods))
      throw new Error(`No methods with name "${methodName}"`)
    return this._options.methods[methodName].result
  }

  stop(methodName) {
    if (methodName === undefined) return (this._options.stop = true)
    if (!(methodName in this._options.methods) && methodName !== undefined)
      throw new Error(`No methods with name "${methodName}"`)
    if (methodName in this._options.methods)
      return (this._options.methods[methodName].callable = false)
  }

  log(message = '') {
    console.dir(this.current().self.name + ': ' + message)
  }

  current() {
    return this._options.current
  }

  store() {
    return this._options.store
  }

  async delay(millisecond) {
    await new Promise((resolve) => setTimeout(resolve, millisecond))
  }
}

export default Context
