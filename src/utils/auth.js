import LStorage from './LStorage'

const TokenKey = 'x_token'
const GameLoginInfoKey = 'GameLoginInfoKey'
const SwitchInfoKey = 'SwitchInfoKey'

export function getToken() {
  return LStorage.getItem(TokenKey)
}

export function setToken(token) {
  return LStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return LStorage.removeItem(TokenKey)
}

export function getGameLoginInfo() {
  return LStorage.getItem(GameLoginInfoKey)
}

export function setGameLoginInfo(GameLoginInfo) {
  return LStorage.setItem(GameLoginInfoKey, GameLoginInfo)
}

export function removeGameLoginInfo() {
  return LStorage.removeItem(GameLoginInfoKey)
}

export function getSwitchInfo() {
  return LStorage.getItem(SwitchInfoKey)
}

export function setSwitchInfo(SwitchInfo) {
  return LStorage.setItem(SwitchInfoKey, SwitchInfo)
}

export function removeSwitchInfo() {
  return LStorage.removeItem(SwitchInfoKey)
}
