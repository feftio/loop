import Context from '@/context'
import { renderMethods, httpMethods, initMethods } from './methods'

const defaultConfig = {
  delay: 1000,
  methods: {},
  store: {},
}

const prepareOptions = (config) => {
  const options = {
    current: null,
    stop: false,
    iterations: 0,
    methods: {},
    store: new Proxy(config.store, {
      get: (object, property) => object[property],
      set: (object, property, value, proxy) => (object[property] = value),
    }),
  }
  for (const methodName in config.methods) {
    options.methods[methodName] = {
      self: config.methods[methodName],
      iterations: 0,
      callable: true,
      async: config.methods[methodName].constructor.name === 'AsyncFunction',
      result: null,
    }
  }
  return options
}

class Loop {
  constructor(config) {
    this.config = { ...defaultConfig, ...config }
    this.options = prepareOptions(this.config)
    this.context = new Context(this.config, this.options)
  }

  async start() {
    while (true) {
      if (this.options.stop) break
      if (this.options.iterations > 0)
        await this.context.delay(this.config.delay)

      for (const methodName in this.config.methods) {
        this.options.current = this.options.methods[methodName]
        if (!this.options.methods[methodName].callable) continue
        if (this.options.methods[methodName].async)
          this.options.methods[methodName].result = await this.config.methods[
            methodName
          ](this.context)
        else
          this.options.methods[methodName].result = this.config.methods[
            methodName
          ](this.context)
        this.options.current.iterations++
        this.options.current = null
        if (this.options.stop) break
      }
      this.options.iterations++
    }
    console.log('method start() was finished')
  }

  stopLoop() {
    this.options.stop = true
  }
}

async function main() {
  const content = document.getElementById('content')
  const changeContentButton = document.getElementById('changeContentButton')
  const stopButton = document.getElementById('stopButton')
  const video = { start: () => console.log('video played') }
  const audio = { start: () => console.log('audio played') }

  const loop = new Loop({
    delay: 2000,
    methods: {
      ...initMethods,
      ...httpMethods,
      ...renderMethods,
    },
    store: {
      count: 0,
    },
  })
  await loop.start()
}

main()
