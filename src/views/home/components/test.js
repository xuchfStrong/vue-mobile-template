const moment = require('moment')
// const howlong = moment('2020-03-25 21:20:10', 'YYYY-MM-DD hh:mm:ss').fromNow() // 8 年前
// const isbefore = moment('2020-03-25 21:34:00').isBefore(new Date())

const a = moment(new Date())
const b = moment('2020-03-25 22:34:00')
const duration = a.diff(b)

console.log(duration)
