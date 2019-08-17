const state = {
  gameRoleInfo: '',
  guajiLog: ''
}

const mutations = {
  SET_GAME_ROLE_INFO: (state, gameRoleInfo) => {
    state.gameRoleInfo = gameRoleInfo
  },
  SET_GUAJI_LOG: (state, guajiLog) => {
    state.guajiLog = guajiLog
  }
}

const actions = {
  changeGameRoleInfo({ commit }, gameRoleInfo) {
    commit('SET_GAME_ROLE_INFO', gameRoleInfo)
  },
  changeGuajiLog({ commit }, guajiLog) {
    commit('SET_GUAJI_LOG', guajiLog)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
