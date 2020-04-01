<!--  -->
<template>
  <div>
    <Header>
      <template slot="left" />
      <template slot="right" />
      <template>
        攻略
      </template>
    </Header>
    <div class="content-container">
      <van-collapse v-model="activeName" accordion bind:change="onChange">
        <van-collapse-item v-for="(item, index) in gonglue" :key="index" :title="item.title" :name="index">
          <p v-for="(item1,index1) in item.content" :key="index1">{{ item1 }}</p>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { getGonglue } from '@/api/game'
export default {

  components: {
    Header
  },
  data() {
    return {
      activeName: 0,
      gonglue: '',
      desc: {
        summary: []
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.handleGetGonglue()
  },

  methods: {
    onChange(event) {
      this.setData({
        activeNames: event.detail
      })
    },
    async handleGetGonglue() {
      this.gonglue = await getGonglue()
    }
  }
}

</script>

<style lang='scss' scoped>
.item-name {
  color: #323233;
}
.summary-wrap {
  padding: 0 15px;
}
.summary-content {
  color: #969799;
}
</style>
