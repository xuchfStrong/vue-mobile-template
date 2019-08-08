<template>
  <div>
    <app-main />
    <foot />
  </div>
</template>

<script>
import { AppMain, Foot } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    Foot
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>
