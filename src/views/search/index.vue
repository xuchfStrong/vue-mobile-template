<!--  -->
<template>
  <div>
    <Header>
      <template slot="left" />
      <template slot="right">
        <van-icon name="search" size="20" class="active-white" @click="goSearchPage" />
      </template>
      <template>
        搜索内容
      </template>
    </Header>
    <div class="content">
      搜索内容
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {

  components: {
    Header
  },
  data() {
    return {
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    goSearchPage() {
      this.$router.push({ name: 'searchPage' })
    }
  }
}

</script>

<style lang='scss' scoped>
</style>
