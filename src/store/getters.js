const getters = {
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  gameRoleInfo: state => state.game.gameRoleInfo,
  guajiLog: state => state.game.guajiLog,
  newJqcmVersion: state => state.game.newJqcmVersion
}
export default getters
