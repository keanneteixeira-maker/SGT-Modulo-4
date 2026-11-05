<template>
  <section class="content-page narrow-page">
    <header class="page-heading">
      <div><p class="eyebrow">ORGANIZAÇÃO</p><h1>Editar Tarefa</h1></div>
      <RouterLink class="button button-secondary" to="/dashboard">Voltar</RouterLink>
    </header>
    <section v-if="task" class="panel form-panel">
      <AppAlert :message="message" />
      <form novalidate @submit.prevent="handleSubmit">
        <div class="form-group">
          <label for="titulo">Título da Tarefa</label>
          <input id="titulo" v-model="form.title" class="field" type="text">
          <small v-if="errors.title" class="field-error">{{ errors.title }}</small>
        </div>
        <div class="form-group">
          <label for="descricao">Descrição (Opcional)</label>
          <textarea id="descricao" v-model="form.description" class="field textarea" rows="5"></textarea>
          <small v-if="errors.description" class="field-error">{{ errors.description }}</small>
        </div>
        <div class="form-group">
          <label for="situacao">Situação da Tarefa</label>
          <select id="situacao" v-model="form.status" class="field">
            <option value="pendente">Pendente</option>
            <option value="em-andamento">Em andamento</option>
            <option value="concluida">Concluída</option>
          </select>
        </div>
        <div class="form-actions">
          <button class="button button-primary" type="submit">Atualizar Tarefa</button>
          <RouterLink class="button button-secondary" to="/dashboard">Cancelar</RouterLink>
        </div>
      </form>
    </section>
    <div v-else class="panel empty-state">
      <h2>Tarefa não encontrada</h2>
      <RouterLink class="button button-primary" to="/dashboard">Voltar ao dashboard</RouterLink>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAlert from '../components/common/AppAlert.vue'

export default {
  name: 'TaskEditView',
  components: { AppAlert },
  data() {
    return {
      form: { title: '', description: '', status: 'pendente' },
      errors: {},
      message: ''
    }
  },
  computed: {
    ...mapGetters('tasks', ['getTaskById']),
    task() { return this.getTaskById(this.$route.params.id) }
  },
  watch: {
    task: {
      immediate: true,
      handler(value) {
        if (value) this.form = { title: value.title, description: value.description || '', status: value.status }
      }
    }
  },
  methods: {
    // Validações migradas do formulário de edição do Módulo 3.
    validate() {
      this.errors = {}
      const titulo = this.form.title.trim()
      const descricao = this.form.description.trim()
      const regexTitulo = /^.{5,}$/
      const regexDescricao = /^.{3,}$/

      if (!regexTitulo.test(titulo)) this.errors.title = 'O campo "Título" deve ter pelo menos 5 posições.'
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
      this.$store.dispatch('tasks/updateTask', {
        ...this.task,
        title: this.form.title.trim(),
        description: this.form.description.trim(),
        status: this.form.status
      })
      this.$router.push({ name: 'task-details', params: { id: this.task.id } })
    }
  }
}
</script>
