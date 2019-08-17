const parse = require('./response-parse')

const obj = { 'pd': 1088, 'buywlTimes': 0, 'sqLevel': 0, 'wlTimes': 3, 'wlLevel': 0, 'buyjgTimes': 3, 'jgTimes': 0, 'sqTimes': 3, 'jgLevel': 2, 'buysqTimes': 0, 'rId': 0 }
// const str = '32s|0|1404'
const res = parse.emmFubenInfo(obj)
console.log(res)
