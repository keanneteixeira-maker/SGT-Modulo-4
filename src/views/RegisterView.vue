<template>
  <section class="public-page">
    <header class="public-header"><p class="system-name">Sistema de Gerenciamento de Tarefas</p></header>
    <main class="public-content">
      <section class="panel form-panel" aria-labelledby="register-title">
        <h1 id="register-title" class="panel-title">Crie sua Conta</h1>
        <AppAlert :message="message" />
        <form novalidate @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="nome">Nome</label>
            <input id="nome" v-model="form.name" class="field" type="text" autocomplete="name">
            <small v-if="errors.name" class="field-error">{{ errors.name }}</small>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input id="email" v-model="form.email" class="field" type="email" autocomplete="email">
            <small v-if="errors.email" class="field-error">{{ errors.email }}</small>
          </div>
          <div class="form-group">
            <label for="senha">Senha</label>
            <input id="senha" v-model="form.password" class="field" type="password" autocomplete="new-password">
            <small v-if="errors.password" class="field-error">{{ errors.password }}</small>
          </div>
          <div class="form-actions"><button class="button button-primary" type="submit">Cadastrar</button></div>
          <p class="form-link">Já tem uma conta? <RouterLink to="/login">Faça login</RouterLink></p>
        </form>
      </section>
    </main>
    <footer class="public-footer">© 2026 Projeto Acadêmico | <a href="#" @click.prevent>Termos de Uso</a></footer>
  </section>
</template>

<script>
import AppAlert from '../components/common/AppAlert.vue'

export default {
  name: 'RegisterView',
  components: { AppAlert },
  data() {
    return {
      form: { name: '', email: '', password: '' },
      errors: {},
      message: ''
    }
  },
  methods: {
    // Expressões regulares e critérios mantidos do cadastro do Módulo 3.
    validate() {
      this.errors = {}
      const nome = this.form.name.trim()
      const email = this.form.email.trim()
      const senha = this.form.password.trim()
      const regexNomeEspaco = /\s/
      const regexEmail = /^[^@]+@[^@]+\.com(\.br)?$/i

      if (nome.length < 5 || !regexNomeEspaco.test(nome)) {
        this.errors.name = 'O nome deve ter pelo menos 5 posições e conter um espaço entre nome e sobrenome.'
      }
      if (!regexEmail.test(email)) {
        this.errors.email = 'Informe um e-mail no formato nome@dominio.com ou nome@dominio.com.br.'
      }
      if (senha.length < 8) {
        this.errors.password = 'A senha deve ter pelo menos 8 posições.'
      }
      return Object.keys(this.errors).length === 0
    },
    handleRegister() {
      this.message = ''
      if (!this.validate()) {
        this.message = 'Verifique os campos do formulário.'
        return
      }
      const existing = JSON.parse(localStorage.getItem('sgt-users') || '[]')
      if (existing.some(user => user.email.toLowerCase() === this.form.email.trim().toLowerCase())) {
        this.errors.email = 'Já existe uma conta cadastrada com este e-mail.'
        this.message = 'Não foi possível concluir o cadastro.'
        return
      }
      this.$store.dispatch('auth/register', this.form)
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
