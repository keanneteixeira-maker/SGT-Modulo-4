import { readFromStorage, saveToStorage } from '../../utils/storage'

const TASKS_KEY = 'sgt-tasks'
const initialTasks = [
  {
    id: 1,
    title: 'Revisar proposta do cliente',
    description: 'Revisar a proposta enviada pelo cliente e verificar todas as informações antes de encaminhar a versão final.',
    status: 'pendente',
    createdAt: '2026-10-06T12:00:00.000Z'
  },
  { id: 2, title: 'Organizar documentos', description: 'Separar e organizar os documentos do projeto.', status: 'em-andamento', createdAt: '2026-10-07T12:00:00.000Z' },
  { id: 3, title: 'Preparar apresentação', description: 'Finalizar os slides para a reunião.', status: 'concluida', createdAt: '2026-10-08T12:00:00.000Z' },
  { id: 4, title: 'Atualizar planejamento', description: 'Revisar os prazos e as próximas entregas.', status: 'pendente', createdAt: '2026-10-09T12:00:00.000Z' },
  { id: 5, title: 'Enviar relatório', description: 'Enviar o relatório semanal para a equipe.', status: 'em-andamento', createdAt: '2026-10-10T12:00:00.000Z' },
  { id: 6, title: 'Conferir requisitos', description: 'Conferir os requisitos da atividade acadêmica.', status: 'pendente', createdAt: '2026-10-11T12:00:00.000Z' }
]

function persist(items) {
  saveToStorage(TASKS_KEY, items)
}

export default {
  namespaced: true,
  state: () => ({ items: [], filter: 'todas' }),
  getters: {
    totalTasks: state => state.items.length,
    pendingTasks: state => state.items.filter(task => task.status === 'pendente'),
    inProgressTasks: state => state.items.filter(task => task.status === 'em-andamento'),
    doneTasks: state => state.items.filter(task => task.status === 'concluida'),
    filteredTasks: state => state.filter === 'todas'
      ? state.items
      : state.items.filter(task => task.status === state.filter),
    getTaskById: state => id => state.items.find(task => String(task.id) === String(id))
  },
  mutations: {
    SET_TASKS(state, items) { state.items = items },
    SET_FILTER(state, filter) { state.filter = filter },
    ADD_TASK(state, task) { state.items.unshift(task) },
    UPDATE_TASK(state, updated) {
      state.items = state.items.map(task => String(task.id) === String(updated.id) ? updated : task)
    },
    REMOVE_TASK(state, id) {
      state.items = state.items.filter(task => String(task.id) !== String(id))
    }
  },
  actions: {
    loadTasks({ commit }) {
      const stored = readFromStorage(TASKS_KEY)
      const items = Array.isArray(stored) ? stored : initialTasks
      commit('SET_TASKS', items)
      persist(items)
    },
    setFilter({ commit }, filter) { commit('SET_FILTER', filter) },
    createTask({ commit, state }, data) {
      const task = { ...data, id: Date.now(), createdAt: new Date().toISOString() }
      commit('ADD_TASK', task)
      persist(state.items)
      return task
    },
    updateTask({ commit, state }, data) {
      commit('UPDATE_TASK', data)
      persist(state.items)
    },
    removeTask({ commit, state }, id) {
      commit('REMOVE_TASK', id)
      persist(state.items)
    },
    completeTask({ dispatch, getters }, id) {
      const task = getters.getTaskById(id)
      if (task) dispatch('updateTask', { ...task, status: 'concluida' })
    }
  }
}
