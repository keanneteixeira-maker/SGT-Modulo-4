<template>
  <section class="content-page narrow-page">
    <header class="page-heading">
      <div><p class="eyebrow">DETALHES</p><h1>Detalhes da Tarefa</h1></div>
      <RouterLink class="button button-secondary" to="/dashboard">Voltar para a Lista</RouterLink>
    </header>
    <article v-if="task" class="panel details-panel">
      <h2>{{ task.title }}</h2>
      <dl class="details-list">
        <dt>Status:</dt><dd><span class="status" :class="`status-${task.status}`">{{ statusLabel(task.status) }}</span></dd>
        <dt>Criada em:</dt><dd>{{ formatDate(task.createdAt) }}</dd>
      </dl>
      <section class="description-section">
        <h3>Descrição</h3>
        <p>{{ task.description || 'Nenhuma descrição informada.' }}</p>
      </section>
      <div class="form-actions">
        <RouterLink class="button button-primary" :to="{ name: 'task-edit', params: { id: task.id } }">Editar Tarefa</RouterLink>
        <button class="button button-danger" @click="remove">Excluir Tarefa</button>
      </div>
    </article>
    <div v-else class="panel empty-state">
      <h2>Tarefa não encontrada</h2>
      <RouterLink class="button button-primary" to="/dashboard">Voltar ao dashboard</RouterLink>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TaskDetailsView',
  computed: {
    ...mapGetters('tasks', ['getTaskById']),
    task() { return this.getTaskById(this.$route.params.id) }
  },
  methods: {
    statusLabel(status) {
      return { pendente: 'Pendente', 'em-andamento': 'Em andamento', concluida: 'Concluída' }[status] || status
    },
    formatDate(value) { return new Intl.DateTimeFormat('pt-BR').format(new Date(value)) },
    remove() {
      if (window.confirm('Deseja realmente excluir esta tarefa?')) {
        this.$store.dispatch('tasks/removeTask', this.task.id)
        this.$router.push({ name: 'dashboard' })
      }
    }
  }
}
</script>
