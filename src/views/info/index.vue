<!--  -->
<template>
  <div>
    <Header>
      <!-- <template slot="left">
        Left
      </template>
      <template slot="right">
        右边
      </template> -->
      <template>
        申请
      </template>
    </Header>
    <div class="content-container">
      产品申请
      <input v-model="selectVal" class="browsers" list="browsers">
      <datalist id="browsers">browsers
        <option v-for="item in list" :key="item.id" :value="item.text" />
      </datalist>
      <div>{{ selectVal }}</div>
      <van-button type="info" size="mini" @click="showme">点击</van-button>
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
      selectVal: '',
      list: [
        { id: 1, text: '清醒' },
        { id: 2, text: '嗜睡' },
        { id: 3, text: '烦躁' },
        { id: 4, text: '昏迷' },
        { id: 5, text: '迷题' }
      ]
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    showme() {

    }
  }
}

</script>

<style lang='scss' scoped>
</style>
