import mockRequest from '@/utils/mockRequest'

const state = {}
const mutations = {}
const action = {
//   派發請求
  async getData({ commit }) {
    const result = await mockRequest.get('/home/list')
    console.log(result)
  }
}
const getters = {}

export default {
  state,
  mutations,
  action,
  getters
}
