const contentDiv = document.getElementById('content')

export const renderMethods = {
  changeUI: function (context) {
    const storage = context.storage()
    if (storage.is('data')) {
      contentDiv.innerText = storage.get('data')
      console.log('data in storage')
    }
  },
}

export const httpMethods = {
  send: function (context) {
    if (context.iterations() % 2 === 0) {
      context.storage().set('data', String(Math.random()))
    }
    context.log(context.current().iterations)
  },
}
