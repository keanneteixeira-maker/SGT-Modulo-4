import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/styles/base.css'
import './assets/styles/layout.css'
import './assets/styles/components.css'
import './assets/styles/themes.css'

store.dispatch('auth/loadSession')
store.dispatch('tasks/loadTasks')
store.dispatch('preferences/loadTheme')

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
