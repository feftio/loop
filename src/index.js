import Context from '@/context'
import { mainSteps, deferredSteps } from './methods'

const defaultConfig = {
  delay: 1000,
  methods: [],
  store: {},
}

// new Proxy(method.store || {}, {
//   get: (object, property, proxy) => object[property],
//   set: (object, property, value, proxy) => (object[property] = value),
// }),

const prepareOptions = (config) => {
  const options = {
    delay: config.delay,
    current: null,
    stop: false,
    iterations: 0,
    methods: {},
    store: config.store || {},
  }
  config.methods.forEach((method) => {
    options.methods[method.name] = {
      name: method.name,
      body: typeof method.body === 'function' ? method.body : () => {},
      iterations: 0,
      callable: true,
      async: method.body.constructor.name === 'AsyncFunction',
      result: undefined,
      delay: typeof method.delay === 'number' ? method.delay : 0,
      condition:
        typeof method.condition === 'function' ? method.condition : () => true,
      store: method.store || {},
    }
  })
  return options
}

class Loop {
  constructor(config) {
    this.options = prepareOptions({ ...defaultConfig, ...config })
    this.context = new Context(this.options)
  }

  async start() {
    while (true) {
      if (this.options.stop) break
      if (this.options.iterations > 0)
        await this.context.delay(this.options.delay)

      for (const methodName in this.options.methods) {
        let method = (this.options.current = this.options.methods[methodName])
        if (!method.callable || !method.condition(this.context)) continue

        await this.context.delay(method.delay)

        if (method.async) method.result = await method.body(this.context)
        else method.result = method.body(this.context)

        method.iterations++
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

export default Loop

async function main() {
  const loop = new Loop({
    delay: 0,
    methods: [...mainSteps, ...deferredSteps],
    store: {
      stepCalled: false,
      currentStep: 'forward',
    },
  })
  await loop.start()
}

main()
