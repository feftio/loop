class Storage {
  constructor() {
    this.object = {}
  }

  get(key) {
    if (this.is(key)) return this.object[key]
  }

  set(key, value) {
    this.object[key] = value
    return this
  }

  is(key) {
    return (
      !this.isNull(key) ||
      !this.isUndefined(key) ||
      Object.keys(this.object).indexOf(key) > -1
    )
  }

  isNaN(key) {
    return Number.isNaN(this.object[key])
  }

  isNull(key) {
    return this.object[key] === null
  }

  isUndefined(key) {
    return this.object[key] === undefined
  }
}

export default Storage
