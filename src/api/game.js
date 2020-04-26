import request from '@/utils/request-game'
import requestForm from '@/utils/request-game-form'
import qs from 'qs'

// 登录一步
export function loginFirstStep(data) {
  return request({
    // url: 'http://center.wscbwh.cn/api/login',
    url: 'http://106.54.36.248:9080/jqcm_login/api/login',
    method: 'post',
    data
  })
}

// 登录二步获取用户token
export function loginSecondStep(params) {
  return request({
    // url: 'http://ufo.66hjh.com/user/v1/token',
    url: 'http://106.54.36.248:9080/jqcm_usertoken/user/v1/token',
    method: 'get',
    params
  })
}

// 登录第三步
export function loginThirdStep(params) {
  return request({
    url: 'http://106.53.178.160:83/game/biguo/index.php',
    method: 'get',
    params
  })
}

// 无尽修炼登录第三步
export function loginThirdStepWJXL(params) {
  return request({
    url: 'http://106.53.178.160:83/game/biguo/index_ml.php',
    method: 'get',
    params
  })
}

// TapTap登录第一步
export function loginFirstStepTapTap(data) {
  return requestForm({
    url: 'http://sdk.66hjh.com/user/login',
    method: 'post',
    data: qs.stringify(data)
  })
}

// TapTap登录二步获取用户token
export function loginSecondStepTapTap(params) {
  return request({
    url: 'http://ufo.66hjh.com/user/v1/token',
    method: 'get',
    params
  })
}

// TapTap登录第三步
export function loginThirdStepTapTap(params) {
  return request({
    url: 'http://106.53.178.160:83/game/biguo/index_qudao.php',
    method: 'get',
    params
  })
}

// 新用户登录，添加到辅助后台
export function addUser(data) {
  return requestForm({
    url: 'http://118.89.219.161:11658/jqcm/add_user.php',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function checkUserStatus(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm/check_user.php',
    method: 'get',
    params
  })
}

export function getServerConfig(params) {
  return request({
    url: 'http://dzztest.8866net.com:83/www/api/server_config.php',
    method: 'get',
    params
  })
}

// 获取渠道服务器列表
export function getServerConfigQudao(params) {
  return request({
    url: 'http://dzztest.8866net.com:83/www/api/server_config_qudao.php',
    method: 'get',
    params
  })
}

// 获取无尽修炼服务器列表
export function getServerConfigWJXL(params) {
  return request({
    url: 'http://dzztest.8866net.com:83/www/api/server_config_ml.php',
    method: 'get',
    params
  })
}

// 获取远端选项信息
export function getRemoteOptions(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm/options.php',
    method: 'get',
    params
  })
}

// 获取角色信息
export function getRoleInfo(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm/get_role_info.php',
    method: 'get',
    params
  })
}

// 获取配置信息
export function getConfigInfo(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm/get_role_settings.php',
    method: 'get',
    params
  })
}

// 修改配置信息
export function changeConfigInfo(data) {
  return requestForm({
    url: 'http://118.89.219.161:11658/jqcm/change_settings.php',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getDescription(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm//description.php',
    method: 'get',
    params
  })
}

export function getHelp(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm//help_info.php',
    method: 'get',
    params
  })
}

export function getGonglue(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm//gonglue.php',
    method: 'get',
    params
  })
}

export function startGuaji(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm/start.php',
    method: 'get',
    params
  })
}

export function stopGuaji(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm/stop.php',
    method: 'get',
    params
  })
}

export function getUtils(params) {
  return request({
    url: 'http://118.89.219.161:11658/jqcm/utils.php',
    method: 'get',
    params
  })
}

