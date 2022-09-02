const content = document.getElementById('content')
const changeContentButton = document.getElementById('changeContentButton')
const stopButton = document.getElementById('stopButton')
const video = { start: () => console.log('video played') }
const audio = { start: () => console.log('audio played') }

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}
const messages = ['Too Far', 'forward', 'left', 'right', 'No Face']

export const mainSteps = [
  {
    name: 'head_position',
    body: async (context) => {
      const store = context.store()
      let message = getRandomElement(messages)
      if (store.currentStep !== message) {
        store.currentStep = message
        store.stepCalled = false
      }
    },
  },
  {
    name: 'forward',
    body: async (context) => {
      content.innerText = `Forward: ${Math.random()}`
    },
    condition: (ctx) => {
      const store = ctx.store()
      const current = ctx.current()
      if (store.currentStep === current.name && !store.stepCalled) {
        store.stepCalled = true
        return true
      }
      return false
    },
    delay: 1000,
  },
  {
    name: 'left',
    body: async (context) => {
      content.innerText = `Left: ${Math.random()}`
    },
    condition: (ctx) => {
      const store = ctx.store()
      const current = ctx.current()
      if (store.currentStep === current.name && !store.stepCalled) {
        store.stepCalled = true
        return true
      }
      return false
    },
    delay: 1000,
  },
  {
    name: 'right',
    body: (context) => {
      content.innerText = `Right: ${Math.random()}`
    },
    condition: (ctx) => {
      const store = ctx.store()
      const current = ctx.current()
      if (store.currentStep === current.name && !store.stepCalled) {
        store.stepCalled = true
        return true
      }
      return false
    },
    delay: 1000,
  },
]

export const deferredSteps = [
  {
    name: 'far',
    body: (context) => {
      // console.dir(context)
    },
  },
  {
    name: 'close',
    body: (context) => {
      // console.dir(con o9p text)
    },
  },
]
