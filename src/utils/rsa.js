
import JSEncrypt from 'jsencrypt'

const publicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArDBaOvTob6DKWTUEXmzR' +
                  'iMzfEK1poTa/ZQfHHoUqRyw901GHPC+W3rDYERAYkX/lvrnwTGNKixOIQupnc1VC' +
                  'uGSvb79N7HjV2FqpT3Cwyax9tMRxwx612lYoXnXdCyUR55P7rdmn/fSINHWhHlXf' +
                  '2ag6Xk2qP/UCK6izeh910/SnXwYXfPkoVYirRN/axp1RgX4LGWbc6gHKXmwsU2/I' +
                  '310lOQT/8PmoJSrdF4Xo9XtaPSlbrmvOGTZSIQsipLtLMJHryQ3ilae3iL+xOIMR' +
                  'LK2bbkH1rPeQ4CQBTScXeGpK5gFfcph941lPyts1qPEocXyfIbwsU2tN8dN97VL2' +
                  'UQIDAQAB' // 从后台获取公钥，这里省略，直接赋值

export function encrypt(data) {
  const encryptor = new JSEncrypt() // 新建JSEncrypt对象
  encryptor.setPublicKey(publicKey) // 设置公钥
  const rsaDta = encryptor.encrypt(data) // 进行加密
  return rsaDta
}

const privateKey = 'MIIEpAIBAAKCAQEArDBaOvTob6DKWTUEXmzRiMzfEK1poTa/ZQfHHoUqRyw901GH' +
                   'PC+W3rDYERAYkX/lvrnwTGNKixOIQupnc1VCuGSvb79N7HjV2FqpT3Cwyax9tMRx' +
                   'wx612lYoXnXdCyUR55P7rdmn/fSINHWhHlXf2ag6Xk2qP/UCK6izeh910/SnXwYX' +
                   'fPkoVYirRN/axp1RgX4LGWbc6gHKXmwsU2/I310lOQT/8PmoJSrdF4Xo9XtaPSlb' +
                   'rmvOGTZSIQsipLtLMJHryQ3ilae3iL+xOIMRLK2bbkH1rPeQ4CQBTScXeGpK5gFf' +
                   'cph941lPyts1qPEocXyfIbwsU2tN8dN97VL2UQIDAQABAoIBAGj93rbeSLBwMZHt' +
                   'cumEnss0aLuJkcP8Vv3qnS5t8laNknE84CIBvpOw7z6QOvrVKqh+Rhi93mEpGsf6' +
                   'l/PKRDGdKyAPXRtYnsQam+xVgWanZ8sGkXtxSV+Fc34NjifShbVYFXlvIzEFntul' +
                   '8gVGRYU5P8Xqw2nWImmupylK75S6NB0qhXIdOw+vLMI3jeTTNi6iBB5UAjithPtx' +
                   'E0h7bZkavyKQkSP3dmFdcR4pytii2w8GqyL4GNhNhNiQvLWStWR3WLPYA2YTUB1h' +
                   'oa7oA2cLV5n1+C6pSmLVbLZCTB7dLu0TxNojg+W8vXgc+W90whmBfdoy3TWrsB6U' +
                   'sawHJ5UCgYEA0sAc+UpmrZtqqp8XtPCfyTboceyveNHf7bttn1NdEf/BXlBrWrOa' +
                   'xCvHJkoIl4kaR/gOnLc9LmiPqKj2GVvXnS2hGU/ZZM7goE/++WDN1L7Tj1PPPvQW' +
                   'qyA4VS8nbF9Ef/6W3ZwPMCY4tWy3VuWWkW6E9ZdW4tdGgVl7lNdlDbMCgYEA0Si0' +
                   'dGb/Hy6rwdGrRIniK9gDh/cdT5O6yZxC0UfofyYGFKjB53oVz+/BcnnoZf22k9ZH' +
                   'Ne6OzUzJwseUd7HDawh27e+RlDREyVSBnBtFKce4XzWofkdz8JGs1HjfCfX8+tCK' +
                   'kiYgDH72paz6nEUZLBIH+GQC4MpnMeORFal/kesCgYB7gDM6bzwufkYKyII2+U9Z' +
                   'tcCPiljl329vPAeod0yyEIM7hrrygw+t582jhXz1eFWbWSUO9152BLYy6xiUkbqP' +
                   'lD60u5M0vPrrVxWfA/h6tHz7n+xyAs4J6C661JAwtL9KlmHIafyIhc1zm8rwtEgA' +
                   '35gw50f2VJsvj8WY2oSQewKBgQCsfgVUehyserDrhx7Xx17fCabf2swxdIP3AQeZ' +
                   '0NPNCG67WvGPFQAoHHJNFnyyoCqSgYT41WSvq0Q5fp7Sl6ex/akXURuePfz8jNTX' +
                   'CSZg7nT/ECGFAyh6nakLESPf8x5POu0M2qRTqeF/gMitV88KqVQpZVF6UXIJksN0' +
                   'OfUbQQKBgQDK8yyG/nlUgoU1DTUR82o0LuxTg5dXvyNoS5CtusLcA3Xk1mZiGrk1' +
                   'foOf1VsxEg+oPGjYaBQMM7EulBPAtaTL004oR8N0l9tLgpXXw94YGbtys9rvr7MV' +
                   'VKH0Q2iL+b85Pbd1qDh+zVHCIGGN86AGPQDqdAvIOswZT4jEeapK2g=='

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

