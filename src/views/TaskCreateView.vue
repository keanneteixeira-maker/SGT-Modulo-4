<template>
  <section class="content-page narrow-page">
    <header class="page-heading">
      <div><p class="eyebrow">ORGANIZAÇÃO</p><h1>Criar Tarefa</h1></div>
      <RouterLink class="button button-secondary" to="/dashboard">Voltar</RouterLink>
    </header>
    <section class="panel form-panel">
      <AppAlert :message="message" />
      <form novalidate @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="titulo">Título da Tarefa</label>
          <input id="titulo" ref="title" v-model="form.title" class="field" type="text">
          <small v-if="errors.title" class="field-error">{{ errors.title }}</small>
        </div>
        <div class="form-group">
          <label for="descricao">Descrição (Opcional)</label>
          <textarea id="descricao" v-model="form.description" class="field textarea" rows="5"></textarea>
          <small v-if="errors.description" class="field-error">{{ errors.description }}</small>
        </div>
        <div class="form-group">
          <label for="situacao">Situação</label>
          <select id="situacao" v-model="form.status" class="field">
            <option value="pendente">Pendente</option>
            <option value="em-andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Salvar Tarefa</button>
          <RouterLink class="button button-secondary" to="/dashboard">Cancelar</RouterLink>
        </div>
      </form>
    </section>
  </section>
</template>

<script>
import AppAlert from '../components/common/AppAlert.vue'

export default {
  name: 'TaskCreateView',
  components: { AppAlert },
  data() {
    return {
      form: { title: '', description: '', status: 'pendente' },
      errors: {},
      message: ''
    }
  },
  methods: {
    // Validações migradas do formulário de criação do Módulo 3.
    validate() {
      this.errors = {}
      const titulo = this.form.title.trim()
      const descricao = this.form.description.trim()
      const regexTitulo = /^.{5,}$/
      const regexDescricao = /^.{3,}$/

      if (!regexTitulo.test(titulo)) this.errors.title = 'O campo Título deve ter pelo menos 5 posições.'
      if (descricao !== '' && !regexDescricao.test(descricao)) {
        this.errors.description = 'A descrição, se preenchida, deve ter pelo menos 3 posições.'
      }
      return Object.keys(this.errors).length === 0
    },
    handleSubmit() {
      this.message = ''
      if (!this.validate()) {
        this.message = 'Verifique os campos destacados.'
        return
      }
      this.$store.dispatch('tasks/createTask', {
        title: this.form.title.trim(),
        description: this.form.description.trim(),
        status: this.form.status
      })
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>
