import { createStore } from 'vuex'
import auth from './modules/auth'
import tasks from './modules/tasks'
import preferences from './modules/preferences'

export default createStore({
  modules: { auth, tasks, preferences }
})
