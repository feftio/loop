const defaultConfig = {
  delay: 1000,
  methods: {},
}

const prepareOptions = (config) => {
  const options = {
    stop: false,
    iterations: 0,
    methods: {},
  }
  for (const methodName in config.methods) {
    options.methods[methodName] = {
      iterations: 0,
      callable: true,
      async: config.methods[methodName].constructor.name === 'AsyncFunction',
    }
  }
  return options
}

class Loop {
  constructor(config) {
    this.config = { ...defaultConfig, ...config }
    this.options = prepareOptions(this.config)
    this.context = Context(config, options)
    // this.context = {
    //   options: () => this.options,
    //   config: () => this.config,
    //   stop: () => (this.stop = true),
    //   delay: async (millisecond) =>
    //     await new Promise((resolve) => setTimeout(resolve, millisecond)),
    //   iterations: () => this.iterations,
    // }
  }

  async start() {
    while (true) {
      if (this.options.stop) break
      if (this.options.iterations > 0)
        await this.context.delay(this.config.delay)

      for (let methodName in this.config.methods) {
        console.log(`loop.${methodName}()`)

        if (this.options.methods[methodName].async === true) {
          await this.config.methods[methodName](this.context)
        } else {
          this.config.methods[methodName](this.context)
        }

        this.options.methods[methodName].iterations++
        if (this.stop) break
      }
      this.options.iterations++
    }
    console.log('method start() was finished')
  }

  stopLoop() {
    this.stop = true
  }
}

async function main() {
  const loop = new Loop({
    delay: 5000,
    methods: {
      send: function (context) {
        context.data = String(Math.random())
        console.log(`Get random number from server: ${context.data}`)
      },
      changeUI: function (context) {
        console.log(context.iterations())
        console.dir(context)
        console.dir(context.config())
        console.dir(context.options())
      },
    },
  })
  await loop.start()
}

main()
