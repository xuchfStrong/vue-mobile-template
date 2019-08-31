import request from '@/utils/request-game'

export function loginPlatform(params) {
  return request({
    url: '/gdzz/servers_login.php',
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

