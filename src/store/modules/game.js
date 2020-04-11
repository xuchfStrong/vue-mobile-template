const state = {
  gameRoleInfo: '',
  guajiLog: '',
  newJqcmVersion: ''
}

const mutations = {
  SET_GAME_ROLE_INFO: (state, gameRoleInfo) => {
    state.gameRoleInfo = gameRoleInfo
  },
  SET_GUAJI_LOG: (state, guajiLog) => {
    state.guajiLog = guajiLog
  },
  SET_NEW_JQCM_VERSION: (state, newJqcmVersion) => {
    state.newJqcmVersion = newJqcmVersion
  }
}

const actions = {
  changeGameRoleInfo({ commit }, gameRoleInfo) {
    commit('SET_GAME_ROLE_INFO', gameRoleInfo)
  },
  changeGuajiLog({ commit }, guajiLog) {
    commit('SET_GUAJI_LOG', guajiLog)
  },
  changeNewJqcmVersion({ commit }, newJqcmVersion) {
    commit('SET_NEW_JQCM_VERSION', newJqcmVersion)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
