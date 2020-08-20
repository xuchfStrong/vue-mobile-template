<!--  -->
<template>
  <div class="help-container">
    <h2>{{ helpInfo.text }}</h2>
    <p v-for="item in helpInfo.value" :key="item"> {{ item }} </p>
  </div>
</template>

<script>
import { getHelp } from '@/api/game'
export default {
  components: {},
  data() {
    return {
      helpInfo: {
        text: '',
        value: ''
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.handleGetHelp()
  },

  methods: {
    async handleGetHelp() {
      this.helpInfo = await getHelp()
    }
  }
}

</script>

<style lang='scss' scoped>
.help-container {
  padding: 0 15px;
}
</style>
