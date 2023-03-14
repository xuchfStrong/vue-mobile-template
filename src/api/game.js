import request from '@/utils/request-game'

export function loginPlatform(data) {
  return request({
    url: '/gdzz/servers_login.php',
    method: 'post',
    data
  })
}

export function loginGame(params) {
  return request({
    url: 'http://www.dgzz1.com:20002/',
    method: 'get',
    params
  })
}

export function serverTime(params) {
  return request({
    url: 'http://www.dgzz1.com:20002/ServerTime',
    method: 'get',
    params
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function getDescription(params) {
  return request({
    url: '/gdzz/description.php',
    method: 'get',
    params
  })
}

export function getServer(params) {
  return request({
    url: '/gdzz/servers_info.php',
    method: 'get',
    params
  })
}

export function getHelp(params) {
  return request({
    url: '/gdzz/help_info.php',
    method: 'get',
    params
  })
}

export function startGuaji(data) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/start_guaji.php',
    method: 'post',
    data
  })
}

export function stopGuaji(data) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/stop_guaji.php',
    method: 'post',
    data
  })
}

export function getGuajiLog(params) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/get_guaji_log.php',
    method: 'get',
    params
  })
}

export function getGuajiStatus(params) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/check_guaji_status.php',
    method: 'get',
    params
  })
}

export function getWujingShop(params) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/wujingShop.php',
    method: 'get',
    params
  })
}

export function getJingjiShop(params) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/jingjiShop.php',
    method: 'get',
    params
  })
}

export function getTaozhuangShop(params) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/taozhuangShop.php',
    method: 'get',
    params
  })
}

export function getYuanzhengShop(params) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/yuanzhengShop.php',
    method: 'get',
    params
  })
}

export function gonglue(params) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/gonglue.php',
    method: 'get',
    params
  })
}

export function zhuangbei(params) {
  return request({
    url: 'http://120.53.14.241:9080/gdzz/zhuangbei/',
    method: 'get',
    params
  })
}

export function taozhuang(data) {
  return request({
    url: 'http://120.53.14.241:9080/gdzz/taozhuang/',
    method: 'post',
    data
  })
}

export function getUtils(params) {
  return request({
    url: 'http://211.159.180.131:11658/gdzz/utils.php',
    method: 'get',
    params
  })
}

