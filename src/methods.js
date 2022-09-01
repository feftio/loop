export const mainSteps = [
  {
    name: 'forward',
    body: async (context) => {
      await context.delay(5000)
      return Math.random()
    },
  },
  {
    name: 'left',
    body: async (context) => {
      console.dir(context.methods())
    },
  },
  {
    name: 'right',
    body: (context) => {},
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
