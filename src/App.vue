<template>
  <div class="app-shell">
    <AppHeader v-if="isAuthenticated" />
    <main class="app-main" tabindex="-1">
      <RouterView />
    </main>
    <AppFooter />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppHeader from './components/layout/AppHeader.vue'
import AppFooter from './components/layout/AppFooter.vue'

export default {
  name: 'App',
  components: { AppHeader, AppFooter },
  computed: {
    ...mapGetters('auth', ['isAuthenticated'])
  }
}
</script>
