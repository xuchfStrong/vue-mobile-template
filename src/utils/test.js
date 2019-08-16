const moment = require('moment')

moment().format('YYYY-MM-DD HH:mm:ss') // 当前时间
moment().add(9, 'hours').format('YYYY-MM-DD HH:mm:ss') // 9小时后
moment().add(7, 'days').format('YYYY-MM-DD HH:mm:ss') // 7天后
moment().add(-7, 'days').format('YYYY-MM-DD HH:mm:ss') // 7天前
moment().format('d') // 今天星期几
moment().format('X') // unix时间戳
moment('20120620', 'YYYYMMDD').fromNow() // 相对当前是多久前
moment().day(0).format('YYYY-MM-DD') // 获取本周第6天
moment().weekday(5).format('YYYY-MM-DD HH:mm:ss') // 获取本周5
moment().weekday(-6).format('YYYY-MM-DD') // 获取上周一
console.log(
  moment().endOf('day').fromNow()
)
