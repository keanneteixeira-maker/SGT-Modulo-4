<template>
  <section class="content-page">
    <header class="page-heading">
      <div>
        <p class="eyebrow">VISÃO GERAL</p>
        <h1>Minhas Tarefas</h1>
        <p class="muted">Acompanhe suas atividades e mantenha tudo organizado.</p>
      </div>
      <RouterLink class="button button-primary" to="/tarefas/nova">+ Nova Tarefa</RouterLink>
    </header>

    <div class="stats-grid">
      <article class="stat-card"><span>Total de tarefas</span><strong>{{ totalTasks }}</strong></article>
      <article class="stat-card"><span>Pendentes</span><strong>{{ pendingTasks.length }}</strong></article>
      <article class="stat-card"><span>Em andamento</span><strong>{{ inProgressTasks.length }}</strong></article>
      <article class="stat-card"><span>Concluídas</span><strong>{{ doneTasks.length }}</strong></article>
    </div>

    <div class="list-toolbar">
      <h2>Lista de tarefas</h2>
      <label class="filter-label" for="filter">Filtrar por situação</label>
      <select id="filter" class="field filter-select" v-model="filter">
        <option value="todas">Todas</option>
        <option value="pendente">Pendentes</option>
        <option value="em-andamento">Em andamento</option>
        <option value="concluida">Concluídas</option>
      </select>
    </div>

    <div v-if="filteredTasks.length" class="task-grid">
      <article v-for="task in filteredTasks" :key="task.id" class="panel task-card">
        <div class="task-card-heading">
          <span class="task-symbol">✓</span>
          <span class="status" :class="`status-${task.status}`">{{ statusLabel(task.status) }}</span>
        </div>
        <h3>{{ task.title }}</h3>
        <p class="task-description">{{ task.description || 'Nenhuma descrição informada.' }}</p>
        <p class="task-date">Criada em {{ formatDate(task.createdAt) }}</p>
        <div class="task-actions">
          <RouterLink class="button button-secondary" :to="{ name: 'task-details', params: { id: task.id } }">Detalhes</RouterLink>
          <RouterLink class="button button-secondary" :to="{ name: 'task-edit', params: { id: task.id } }">Editar</RouterLink>
          <button v-if="task.status !== 'concluida'" class="button button-primary" @click="complete(task.id)">Concluir</button>
          <button class="button button-danger" @click="remove(task.id)">Excluir</button>
        </div>
      </article>
    </div>
    <div v-else class="panel empty-state">
      <h3>Nenhuma tarefa encontrada</h3>
      <p class="muted">Cadastre uma tarefa ou altere o filtro selecionado.</p>
      <RouterLink class="button button-primary" to="/tarefas/nova">Criar tarefa</RouterLink>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'DashboardView',
  data() { return { filter: 'todas' } },
  computed: {
    ...mapState('tasks', ['items']),
    ...mapGetters('tasks', ['totalTasks', 'pendingTasks', 'inProgressTasks', 'doneTasks']),
    filteredTasks() {
      if (this.filter === 'todas') return this.items
      return this.items.filter(task => task.status === this.filter)
    }
  },
  methods: {
    statusLabel(status) {
      return { pendente: 'Pendente', 'em-andamento': 'Em andamento', concluida: 'Concluída' }[status] || status
    },
    formatDate(value) {
      return new Intl.DateTimeFormat('pt-BR').format(new Date(value))
    },
    complete(id) {
      this.$store.dispatch('tasks/completeTask', id)
    },
    remove(id) {
      if (window.confirm('Deseja realmente excluir esta tarefa?')) {
        this.$store.dispatch('tasks/removeTask', id)
      }
    }
  }
}
</script>
