class Context {
  constructor(options) {
    this.options = options
  }

  iterations(methodName) {
    if (typeof methodName === 'string' || methodName instanceof String)
      return this.options.methods[methodName].iterations
    return this.options.iterations
  }

  methods() {
    return this.options.methods
  }

  result(methodName) {
    if (!(methodName in this.options.methods))
      throw new Error(`No methods with name "${methodName}"`)
    return this.options.methods[methodName].result
  }

  stop(methodName) {
    if (methodName === undefined) return (this.options.stop = true)
    if (!(methodName in this.options.methods) && methodName !== undefined)
      throw new Error(`No methods with name "${methodName}"`)
    if (methodName in this.options.methods)
      return (this.options.methods[methodName].callable = false)
  }

  log(message = '') {
    console.dir(this.current().self.name + ': ' + message)
  }

  current() {
    return this.options.current
  }

  store(methodName) {
    if (methodName === undefined) return this.options.store
    return this.options.methods[methodName].store // NEED EXCEPTION
  }

  async delay(millisecond) {
    await new Promise((resolve) => setTimeout(resolve, millisecond))
  }
}

export default Context
