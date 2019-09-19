import request from '@/utils/request-game'

export function loginPlatform(data) {
  return request({
    url: '/gdzz/servers_login.php',
    // url: 'http://106.54.36.248:9080/gdzz/login/',
    method: 'post',
    data
  })
}

export function getDescription(params) {
  return request({
    url: 'http://106.54.36.248:9080/file/description.json',
    method: 'get',
    params
  })
}

export function getServer(params) {
  return request({
    url: 'http://106.54.36.248:9080/file/server.json',
    method: 'get',
    params
  })
}

export function getHelp(params) {
  return request({
    url: 'http://106.54.36.248:9080/file/help.json',
    method: 'get',
    params
  })
}

export function startGuaji(data) {
  return request({
    url: 'http://118.89.219.161:11658/gdzz/start_guaji.php',
    // url: 'http://106.54.36.248:9080/gdzz/start_guaji/',
    method: 'post',
    data
  })
}

export function stopGuaji(data) {
  return request({
    url: 'http://118.89.219.161:11658/gdzz/stop_guaji.php',
    // url: 'http://106.54.36.248:9080/gdzz/stop_guaji/',
    method: 'post',
    data
  })
}

export function getGuajiLog(params) {
  return request({
    url: 'http://118.89.219.161:11658/gdzz/get_guaji_log.php',
    // url: 'http://106.54.36.248:9080/gdzz/guaji_log/',
    method: 'get',
    params
  })
}

export function getGuajiStatus(params) {
  return request({
    url: 'http://118.89.219.161:11658/gdzz/check_guaji_status.php',
    // url: 'http://106.54.36.248:9080/gdzz/guaji_status/',
    method: 'get',
    params
  })
}

export function getWujingShop(params) {
  return request({
    url: 'http://106.54.36.248:9080/file/wujingShop.json',
    method: 'get',
    params
  })
}

export function getJingjiShop(params) {
  return request({
    url: 'http://106.54.36.248:9080/file/jingjiShop.json',
    method: 'get',
    params
  })
}

export function getTaozhuangShop(params) {
  return request({
    url: 'http://106.54.36.248:9080/file/taozhuangShop.json',
    method: 'get',
    params
  })
}

export function getYuanzhengShop(params) {
  return request({
    url: 'http://106.54.36.248:9080/file/yuanzhengShop.json',
    method: 'get',
    params
  })
}

export function gonglue(params) {
  return request({
    url: 'http://106.54.36.248:9080/file/gonglue.json',
    method: 'get',
    params
  })
}

export function zhuangbei(params) {
  return request({
    // url: 'http://127.0.0.1:8000/zhuangbei/',
    url: 'http://106.54.36.248:9080/gdzz/zhuangbei/',
    method: 'get',
    params
  })
}

export function taozhuang(data) {
  return request({
    // url: 'http://127.0.0.1:8000/taozhuang/',
    url: 'http://106.54.36.248:9080/gdzz/taozhuang/',
    method: 'post',
    data
  })
}

