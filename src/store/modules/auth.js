import { readFromStorage, removeFromStorage, saveToStorage } from '../../utils/storage'

const USER_KEY = 'sgt-user'
const TOKEN_KEY = 'sgt-token'

export default {
  namespaced: true,
  state: () => ({ user: null, token: null }),
  getters: {
    isAuthenticated: state => Boolean(state.user && state.token),
    userName: state => state.user?.name || 'Usuário'
  },
  mutations: {
    SET_SESSION(state, payload) {
      state.user = payload.user
      state.token = payload.token
    },
    UPDATE_USER(state, payload) {
      state.user = { ...state.user, ...payload }
    },
    CLEAR_SESSION(state) {
      state.user = null
      state.token = null
    }
  },
  actions: {
    loadSession({ commit }) {
      const user = readFromStorage(USER_KEY)
      const token = localStorage.getItem(TOKEN_KEY)
      if (user && token) commit('SET_SESSION', { user, token })
    },
    login({ commit }, credentials) {
      const savedUsers = readFromStorage('sgt-users', [])
      const account = savedUsers.find(item => item.email.toLowerCase() === credentials.email.trim().toLowerCase())
      // Aplicação acadêmica sem backend: aceita o login e mantém a conta local, se cadastrada.
      const user = account
        ? { id: account.id, name: account.name, email: account.email }
        : { id: Date.now(), name: credentials.email.split('@')[0], email: credentials.email.trim() }
      const token = 'sessao-local-demonstrativa'
      saveToStorage(USER_KEY, user)
      localStorage.setItem(TOKEN_KEY, token)
      commit('SET_SESSION', { user, token })
    },
    register({ dispatch }, userData) {
      const users = readFromStorage('sgt-users', [])
      const user = {
        id: Date.now(),
        name: userData.name.trim(),
        email: userData.email.trim(),
        password: userData.password
      }
      users.push(user)
      saveToStorage('sgt-users', users)
      return dispatch('login', { email: user.email, password: user.password })
    },
    updateProfile({ commit, state }, userData) {
      commit('UPDATE_USER', userData)
      saveToStorage(USER_KEY, state.user)
      const users = readFromStorage('sgt-users', [])
      const index = users.findIndex(user => user.id === state.user.id)
      if (index >= 0) {
        users[index] = { ...users[index], ...userData }
        saveToStorage('sgt-users', users)
      }
    },
    logout({ commit }) {
      removeFromStorage(USER_KEY)
      localStorage.removeItem(TOKEN_KEY)
      commit('CLEAR_SESSION')
    }
  }
}
