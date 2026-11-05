import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import TaskCreateView from '../views/TaskCreateView.vue'
import TaskDetailsView from '../views/TaskDetailsView.vue'
import TaskEditView from '../views/TaskEditView.vue'
import ProfileView from '../views/ProfileView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/cadastro', name: 'register', component: RegisterView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView, meta: { requiresAuth: true } },
  { path: '/tarefas/nova', name: 'task-create', component: TaskCreateView, meta: { requiresAuth: true } },
  { path: '/tarefas/:id', name: 'task-details', component: TaskDetailsView, meta: { requiresAuth: true } },
  { path: '/tarefas/:id/editar', name: 'task-edit', component: TaskEditView, meta: { requiresAuth: true } },
  { path: '/perfil', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to) => {
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth)
  const authenticated = store.getters['auth/isAuthenticated']

  if (requiresAuth && !authenticated) return { name: 'login' }
  if (['login', 'register'].includes(to.name) && authenticated) return { name: 'dashboard' }
  return true
})

export default router
