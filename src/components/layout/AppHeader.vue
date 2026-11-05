<template>
  <header class="topbar">
    <RouterLink class="brand" to="/dashboard">SGT - Módulo 4 <span>Gerenciador de Tarefas</span></RouterLink>
    <nav class="main-nav" aria-label="Navegação principal">
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/tarefas/nova">Criar tarefa</RouterLink>
      <RouterLink to="/perfil">Perfil</RouterLink>
      <button class="nav-link" type="button" @click="toggleTheme">{{ isDark ? '☀️ Tema claro' : '🌙 Tema escuro' }}</button>
      <button class="nav-link logout" type="button" @click="logout">Sair</button>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'AppHeader',
  computed: {
    ...mapGetters('preferences', ['isDarkTheme']),
    ...mapState('preferences', ['theme']),
    isDark() { return this.isDarkTheme }
  },
  methods: {
    toggleTheme() {
      this.$store.dispatch('preferences/setTheme', this.isDark ? 'light' : 'dark')
    },
    logout() {
      this.$store.dispatch('auth/logout')
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
