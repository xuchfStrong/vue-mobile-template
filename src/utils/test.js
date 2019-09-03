// const parse = require('./response-parse')

// const obj = { 'pd': 1088, 'buywlTimes': 0, 'sqLevel': 0, 'wlTimes': 3, 'wlLevel': 0, 'buyjgTimes': 3, 'jgTimes': 0, 'sqTimes': 3, 'jgLevel': 2, 'buysqTimes': 0, 'rId': 0 }
// const res = parse.emmFubenInfo(obj)
// console.log(res)

const rsa = require('js-rsa')
const keypair = new rsa.RSAKeyPair('', '031773', '6C72D44937D69F5F3A80F428F8C375863F75A1127F196482FD2184066ACFC9B766299F435C895153F35B32F5A80BD743F4D0646D5D8F52BEF63FC7563CA40A562A2AAA6FECF25BD039CACAF5A6724D74198B05E20FCFFA63067F5AD48D2A95349AC2ABED21062BDB2A4BCADB316E88BCB745E566E19600F386F86A40B37C0C51')
const c = '1d19178860dd8085f2dfc5d25a93b3c5e10f9a08287a27b39354c8ca4967cf02081096771df7be2f81a714a5c6daa15b87191ba2a50f72f9e1782ff8d4566ae1390cbea4795e39900a4b8efba29c7273bee67cc1ce6bffa597a67954d593c1d72d71e09c1ed8894ef7fa946519a7629588f87308926cd4d2eae3edf873cb8d44'
const m = rsa.decryptedString(keypair, c)
console.log(m)

