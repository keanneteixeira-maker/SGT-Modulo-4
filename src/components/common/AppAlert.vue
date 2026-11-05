<template>
  <p v-if="message" class="alert" :class="`alert-${type}`" role="alert">{{ message }}</p>
</template>
<script>
export default {
  name: 'AppAlert',
  props: {
    message: { type: String, default: '' },
    type: { type: String, default: 'error' }
  }
}
</script>
