
import JSEncrypt from 'jsencrypt'

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArDBaOvTob6DKWTUEXmzR' +
                  'iMzfEK1poTa/ZQfHHoUqRyw901GHPC+W3rDYERAYkX/lvrnwTGNKixOIQupnc1VC' +
                  'uGSvb79N7HjV2FqpT3Cwyax9tMRxwx612lYoXnXdCyUR55P7rdmn/fSINHWhHlXf' +
                  '2ag6Xk2qP/UCK6izeh910/SnXwYXfPkoVYirRN/axp1RgX4LGWbc6gHKXmwsU2/I' +
                  '310lOQT/8PmoJSrdF4Xo9XtaPSlbrmvOGTZSIQsipLtLMJHryQ3ilae3iL+xOIMR' +
                  'LK2bbkH1rPeQ4CQBTScXeGpK5gFfcph941lPyts1qPEocXyfIbwsU2tN8dN97VL2' +
                  'UQIDAQAB' // 从后台获取公钥，这里省略，直接赋值

const privateKey = ''

export function encrypt(data) {
  const encryptor = new JSEncrypt() // 新建JSEncrypt对象
  encryptor.setPublicKey(publicKey) // 设置公钥
  const rsaDta = encryptor.encrypt(data) // 进行加密
  return rsaDta
}

export function decrypt(rsaDta) {
  const decryptor = new JSEncrypt() // 新建JSEncrypt对象
  decryptor.setPrivateKey(privateKey) // 设置私钥
  const data = decryptor.decrypt(rsaDta) // 进行解密
  return data
}

/*
** randomWord 产生任意长度随机字母数字组合
** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
** xuanfeng 2014-08-28
** 生成3-32位随机串：randomWord(true, 3, 32)
** 生成43位随机串：randomWord(false, 43)
*/

export function randomWord(randomFlag, min, max) {
  var str = ''
  var range = min
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    const pos = Math.round(Math.random() * (arr.length - 1))
    str += arr[pos]
  }
  return str
}

