import LStorage from './LStorage'

const TokenKey = 'x_token'

export function getToken() {
  return LStorage.getItem(TokenKey)
}

export function setToken(token) {
  return LStorage.setItem(TokenKey, token)
}

export function removeToken() {
  return LStorage.removeItem(TokenKey)
}

