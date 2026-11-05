<template>
  <section class="public-page">
    <header class="public-header"><p class="system-name">Sistema de Gerenciamento de Tarefas</p></header>
    <main class="public-content">
      <section class="panel form-panel" aria-labelledby="login-title">
        <h1 id="login-title" class="panel-title">Bem-vindo de volta!</h1>
        <AppAlert :message="message" />
        <form novalidate @submit.prevent="handleLogin">
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="email" class="field" type="email" autocomplete="email">
            <small v-if="errors.email" class="field-error">{{ errors.email }}</small>
          </div>
          <div class="form-group">
            <label for="senha">Senha</label>
            <input id="senha" v-model="password" class="field" type="password" autocomplete="current-password">
            <small v-if="errors.password" class="field-error">{{ errors.password }}</small>
          </div>
          <div class="form-actions"><button class="button button-primary" type="submit">Entrar</button></div>
          <p class="form-link">Não tem uma conta? <RouterLink to="/cadastro">Cadastre-se</RouterLink></p>
        </form>
      </section>
    </main>
    <footer class="public-footer">© 2026 Projeto Acadêmico | <a href="#" @click.prevent>Termos de Uso</a></footer>
  </section>
</template>

<script>
import AppAlert from '../components/common/AppAlert.vue'

export default {
  name: 'LoginView',
  components: { AppAlert },
  data() {
    return { email: '', password: '', errors: {}, message: '' }
  },
  methods: {
    // Validações migradas do formulário de login do Módulo 3.
    validate() {
      this.errors = {}
      if (this.email.trim() === '') this.errors.email = 'O campo Email não pode ser nulo.'
      if (this.password.trim() === '') this.errors.password = 'O campo Senha não pode ser nulo.'
      return Object.keys(this.errors).length === 0
    },
    handleLogin() {
      this.message = ''
      if (!this.validate()) {
        this.message = 'Preencha os campos obrigatórios.'
        return
      }
      this.$store.dispatch('auth/login', { email: this.email.trim(), password: this.password })
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
