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
