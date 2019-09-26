// const parse = require('./response-parse-exports')
// const obj = { 'a': 1, 'b': 2, 'c': '5|4000021|233#5|4000022|62', 'pd': 1004, 'd': 259, 'rId': 0 }
// const res = parse.emeFuben(obj)
// console.log(res)

// Rsa测试
// const rsa = require('js-rsa')
// const keypair = new rsa.RSAKeyPair('', '031773', '6C72D44937D69F5F3A80F428F8C375863F75A1127F196482FD2184066ACFC9B766299F435C895153F35B32F5A80BD743F4D0646D5D8F52BEF63FC7563CA40A562A2AAA6FECF25BD039CACAF5A6724D74198B05E20FCFFA63067F5AD48D2A95349AC2ABED21062BDB2A4BCADB316E88BCB745E566E19600F386F86A40B37C0C51')
// const c = '1d19178860dd8085f2dfc5d25a93b3c5e10f9a08287a27b39354c8ca4967cf02081096771df7be2f81a714a5c6daa15b87191ba2a50f72f9e1782ff8d4566ae1390cbea4795e39900a4b8efba29c7273bee67cc1ce6bffa597a67954d593c1d72d71e09c1ed8894ef7fa946519a7629588f87308926cd4d2eae3edf873cb8d44'
// const m = rsa.decryptedString(keypair, c)
// console.log(m)

// Base64加密
// const CryptoJS = require('crypto-js')
// const word = 'Hello World!'
// const str = CryptoJS.enc.Utf8.parse(word)
// const base64 = CryptoJS.enc.Base64.stringify(str)
// console.log(base64)

// // 解析Base64
// const words = CryptoJS.enc.Base64.parse(base64)
// const parseStr = words.toString(CryptoJS.enc.Utf8)
// console.log(parseStr)

// const moment = require('moment')
// const str = moment(1568126489000).format('YYYY-MM-DD HH:mm:ss')
// console.log(str)

// 测试间隔遍历数组
// const arr = [1, 2, 3, 4, 5, 6]
// let i = 0 // 在外面定义一个变量作为判断的标准
// const timer = setInterval(function() {
//   console.log(arr[i])
//   i++
//   if (i > arr.length - 1) { // 因为i++的原因，所以当i的值大于数组的长度-1的时候，清除定时器
//     clearInterval(timer)
//   }
// }, 1000)

// 测试迷宫地图线路解析
// const parse = require('./response-parse-exports')
// const obj3 = { 'eftMaps': [], 'a': 1, 'b': 0, 'c': 10, 'pd': 1106, 'd': 62, 'e': false, 'f': 0, 'g': 0, 'h': 0, 'rId': 0, 'lineMaps': [{ 'a': 1, 'b': 0, 'c': false, 'evtList': [{ 'a': 200001, 'b': 1, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 2, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200002, 'b': 3, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 4, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 5, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }] }, { 'a': 2, 'b': 0, 'c': false, 'evtList': [{ 'a': 200002, 'b': 1, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200002, 'b': 2, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200004, 'b': 3, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200002, 'b': 4, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 5, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }] }, { 'a': 3, 'b': 0, 'c': false, 'evtList': [{ 'a': 200001, 'b': 1, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200002, 'b': 2, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200003, 'b': 3, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200002, 'b': 4, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 5, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }] }] }
// const obj21 = { 'eftMaps': [], 'a': 2, 'b': 0, 'c': 9, 'pd': 1106, 'd': 63, 'e': true, 'f': 0, 'g': 0, 'h': 0, 'rId': 0, 'lineMaps': [{ 'a': 1, 'b': 3, 'c': true, 'evtList': [{ 'a': 200001, 'b': 1, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 2, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200002, 'b': 3, 'c': '34|0|250#1|0|30000#18|0|1500', 'd': '', 'templateIds': [80500011, 80000001, 80500004, 80500009, 80500007, 80500005], 'e': '', 'f': '', 'g': 0, 'h': '..................', 'i': 149901, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 4, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 5, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }] }, { 'a': 4, 'b': 0, 'c': false, 'evtList': [{ 'a': 200004, 'b': 1, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 2, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 3, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200004, 'b': 4, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 5, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }] }] }
// const obj22 = { 'eftMaps': [], 'a': 3, 'b': 0, 'c': 8, 'pd': 1106, 'd': 64, 'e': true, 'f': 0, 'g': 0, 'h': 0, 'rId': 0, 'lineMaps': [{ 'a': 2, 'b': 3, 'c': true, 'evtList': [{ 'a': 200002, 'b': 1, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200002, 'b': 2, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200009, 'b': 3, 'c': '34|0|250#1|0|30000#18|0|1500', 'd': '', 'templateIds': [80500008, 80000001, 80500005, 80400005, 80300001, 80400001], 'e': '', 'f': '', 'g': 0, 'h': 'wolrxc', 'i': 161432, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200002, 'b': 4, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 5, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }] }, { 'a': 5, 'b': 0, 'c': false, 'evtList': [{ 'a': 200001, 'b': 1, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 2, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200005, 'b': 3, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 4, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }, { 'a': 200001, 'b': 5, 'c': '', 'd': '', 'templateIds': [0, 0, 0, 0, 0, 0], 'e': '', 'f': '', 'g': 0, 'h': '', 'i': 0, 'hps': [0, 0, 0, 0, 0, 0], 'params': [] }] }] }
// const orgiLineMaps = obj3.lineMaps
// const updateLineMaps1 = obj21.lineMaps
// const updateLineMaps2 = obj22.lineMaps
// const lineMaps1 = parse.yzmgUpdateLineMaps(orgiLineMaps, updateLineMaps1)
// const lineMaps2 = parse.yzmgUpdateLineMaps(lineMaps1, updateLineMaps2)
// console.log('lineMaps', lineMaps2)
