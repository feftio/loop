import Context from '@/context'
import { renderMethods, httpMethods } from './methods'

const defaultConfig = {
  delay: 1000,
  // delayBetweenMethods: 1000,
  methods: {},
}

const prepareOptions = (config) => {
  const options = {
    current: null,
    stop: false,
    iterations: 0,
    methods: {},
  }
  for (const methodName in config.methods) {
    options.methods[methodName] = {
      self: config.methods[methodName],
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
          await this.config.methods[methodName](this.context)
        else this.config.methods[methodName](this.context)
        this.options.current.iterations++
        this.options.current = null
        if (this.options.stop) break
        // await this.context.delay(this.config.delayBetweenMethods)
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
    delay: 4000,
    methods: {
      init: function (context) {
        context.current().callable = false
        stopButton.addEventListener('click', () => {
          context.stop()
        })
      },
      checkClose: function (context) {},
      ...httpMethods,
      ...renderMethods,
    },
  })
  await loop.start()
}

main()
