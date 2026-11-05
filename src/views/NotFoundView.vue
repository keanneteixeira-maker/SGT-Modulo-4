<template>
  <section class="content-page empty-state">
    <h1>Página não encontrada</h1>
    <p class="muted">O endereço acessado não corresponde a uma página da aplicação.</p>
    <RouterLink class="button button-primary" to="/dashboard">Ir para o início</RouterLink>
  </section>
</template>
<script>
export default { name: 'NotFoundView' }
</script>
