<!--  -->
<template>
  <div>
    <Header>
      <template slot="left" />
      <template slot="right">
        <!-- <van-icon name="search" size="20" class="active-white" @click="goSearchPage" /> -->
      </template>
      <template>
        购买说明
      </template>
    </Header>
    <div class="content-container">
      <div class="summary-wrap">
        <div>辅助说明：</div>
        <div class="summary-content">
          <p v-for="item in desc.summary" :key="item">{{ item }}</p>
        </div>
      </div>
      <van-collapse v-model="activeName" bind:change="onChange" accordion>
        <van-collapse-item title="普通版说明" name="1">
          <div class="item-name">价格：</div>
          <p>{{ desc.normalVersion.price }}</p>
          <div class="item-name">功能：</div>
          <p v-for="item in desc.normalVersion.features" :key="item">{{ item }}</p>
          <div v-if="desc.normalVersion.description">
            <div class="item-name">说明：</div>
            <p v-for="item in desc.normalVersion.description" :key="item">{{ item }}</p>
          </div>
        </van-collapse-item>
        <van-collapse-item title="完整版说明" name="2">
          <div class="item-name">价格：</div>
          <p>{{ desc.fullVersion.price }}</p>
          <div class="item-name">功能：</div>
          <p v-for="item in desc.fullVersion.features" :key="item">{{ item }}</p>
          <div v-if="desc.fullVersion.description">
            <div class="item-name">说明：</div>
            <p v-for="item in desc.fullVersion.description" :key="item">{{ item }}</p>
          </div>
        </van-collapse-item>
        <van-collapse-item title="VIP版说明" name="3">
          <div class="item-name">价格：</div>
          <p>{{ desc.vipVersion.price }}</p>
          <div class="item-name">功能：</div>
          <p v-for="item in desc.vipVersion.features" :key="item">{{ item }}</p>
          <div v-if="desc.vipVersion.description">
            <div class="item-name">说明：</div>
            <p v-for="item in desc.vipVersion.description" :key="item">{{ item }}</p>
          </div>
        </van-collapse-item>
        <van-collapse-item title="超级VIP版说明" name="4">
          <div class="item-name">价格：</div>
          <p>{{ desc.superVipVersion.price }}</p>
          <div class="item-name">功能：</div>
          <p v-for="item in desc.superVipVersion.features" :key="item">{{ item }}</p>
          <div v-if="desc.superVipVersion.description">
            <div class="item-name">说明：</div>
            <p v-for="item in desc.superVipVersion.description" :key="item">{{ item }}</p>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { getDescription } from '@/api/game'
export default {

  components: {
    Header
  },
  data() {
    return {
      activeName: '0',
      desc: {
        contact: '',
        summary: {},
        normalVersion: {
          price: '',
          features: [],
          description: ''
        },
        fullVersion: {
          price: '',
          features: [],
          description: ''
        },
        vipVersion: {
          price: '',
          features: [],
          description: ''
        },
        superVipVersion: {
          price: '',
          features: [],
          description: ''
        }
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.handleGetDescription()
  },

  methods: {
    goSearchPage() {
      this.$router.push({ name: 'searchPage' })
    },
    onChange(event) {
      this.setData({
        activeNames: event.detail
      })
    },
    async handleGetDescription() {
      this.desc = await getDescription()
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
