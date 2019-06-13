module.exports = {
  person: class person {
    constructor (x) {
      this.x = x
    }
    eat () {
      console.log('eat')
    }
  },
  includes () {
    return [1, 2, 3, 4, 5].includes(5)
  }
}