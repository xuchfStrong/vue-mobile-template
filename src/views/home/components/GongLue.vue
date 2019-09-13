<!--  -->
<template>
  <div class="help-container">
    <van-cell-group class="cell-wrap">
      <van-cell title="装备搭配" is-link @click="showZhuangbei" />
      <van-cell title="攻略技巧" is-link @click="showJiqiao" />
    </van-cell-group>

    <van-popup
      v-model="zhuangbeiProp"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-nav-bar
        title="装备搭配"
        left-text="返回"
        left-arrow
        @click-left="onClickLeftZhuangbei"
      />
      <div class="content-wrap">
        <p v-for="item in gonglueInfo.zhuangbei" :key="item"> {{ item }} </p>
      </div>
    </van-popup>

    <van-popup
      v-model="jiqiaoProp"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <van-nav-bar
        title="攻略技巧"
        left-text="返回"
        left-arrow
        @click-left="onClickLeftJiqiao"
      />
      <div class="content-wrap">
        <p v-for="item in gonglueInfo.jiqiao" :key="item"> {{ item }} </p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { gonglue } from '@/api/game'
export default {
  components: {},
  data() {
    return {
      gonglueInfo: {
        zhuangbei: [],
        jiqiao: []
      },
      zhuangbeiProp: false,
      jiqiaoProp: false
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getGonglue()
  },

  methods: {
    async getGonglue() {
      this.gonglueInfo = await gonglue()
    },
    showZhuangbei() {
      this.zhuangbeiProp = true
    },
    showJiqiao() {
      this.jiqiaoProp = true
    },
    onClickLeftZhuangbei() {
      this.zhuangbeiProp = false
    },
    onClickLeftJiqiao() {
      this.jiqiaoProp = false
    }
  }
}

</script>

<style lang='scss' scoped>
.help-container {
  padding: 0 15px;
}
.cell-wrap {
  padding-top: 20px;
}
.content-wrap {
  padding: 0 20px;
}
</style>
