class Context {
  constructor(config, options) {
    this.config = config
    this.options = options
  }

  config() {
    return this.config
  }

  options() {
    return this.options
  }

  stop() {
    this.options.stop = True
  }

  async delay() {
    await new Promise((resolve) => setTimeout(resolve, millisecond))
  }
}
