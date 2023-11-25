import mockRequest from '@/utils/mockRequest'

const state = {
  list: {}
}
const mutations = {
  GETDATA(state, list) {
    state.data = list
  }
}
const actions = {
//   派發請求
  async getData({ commit }) {
    const result = await mockRequest.get('/home/list')
    if (result.code === 20000) {
      commit('GETDATA', result.data)
    }
  }
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}
