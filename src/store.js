class Store {
  constructor() {
    this.object = {}
  }

  get(key, defaultValue) {
    if (this.is(key)) return this.object[key]
    return defaultValue
  }

  set(key, value, defaultValue) {
    if (!this.is(key)) {
      this.object[key] = defaultValue
      return this
    }
    this.object[key] = value
    return this
  }

  is(key) {
    if (
      this.isNull(key) ||
      this.isUndefined(key) ||
      Object.keys(this.object).indexOf(key) < 0
    )
      return false
    return true
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

export default Store
