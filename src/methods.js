export const initMethods = {
  initVideoStreaming: function (context) {
    context.store().count++
    context.log('count inc...')
  },
  delay: async function (context) {
    await context.delay(5000)
  },
}

export const renderMethods = {
  changeUI: function (context) {},
}

export const httpMethods = {
  send: function (context) {
    console.dir(context.current())
    return String(Math.random())
  },
}
