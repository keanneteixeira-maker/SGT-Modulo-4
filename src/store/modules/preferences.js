import { readFromStorage, saveToStorage } from '../../utils/storage'

const THEME_KEY = 'sgt-theme'

export default {
  namespaced: true,
  state: () => ({ theme: 'light' }),
  getters: { isDarkTheme: state => state.theme === 'dark' },
  mutations: {
    SET_THEME(state, theme) { state.theme = theme }
  },
  actions: {
    loadTheme({ dispatch }) {
      dispatch('setTheme', readFromStorage(THEME_KEY, 'light'))
    },
    setTheme({ commit }, theme) {
      commit('SET_THEME', theme)
      saveToStorage(THEME_KEY, theme)
      document.documentElement.setAttribute('data-theme', theme)
    }
  }
}
