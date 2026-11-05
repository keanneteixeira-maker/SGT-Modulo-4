<template>
  <section class="content-page narrow-page">
    <header class="page-heading"><div><p class="eyebrow">CONTA</p><h1>Meu Perfil</h1></div></header>
    <section class="panel form-panel">
      <AppAlert :message="message" type="success" />
      <form @submit.prevent="save">
        <div class="form-group">
          <label for="name">Nome</label>
          <input id="name" v-model="form.name" class="field" type="text">
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input id="email" v-model="form.email" class="field" type="email">
        </div>
        <div class="form-actions"><button class="button button-primary" type="submit">Salvar alterações</button></div>
      </form>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import AppAlert from '../components/common/AppAlert.vue'
export default {
  name: 'ProfileView',
  components: { AppAlert },
  data() { return { form: { name: '', email: '' }, message: '' } },
  computed: { ...mapState('auth', ['user']) },
  watch: {
    user: {
      immediate: true,
      handler(user) { if (user) this.form = { name: user.name, email: user.email } }
    }
  },
  methods: {
    save() {
      if (!this.form.name.trim() || !this.form.email.trim()) {
        this.message = 'Nome e e-mail são obrigatórios.'
        return
      }
      this.$store.dispatch('auth/updateProfile', this.form)
      this.message = 'Perfil atualizado com sucesso.'
    }
  }
}
</script>
