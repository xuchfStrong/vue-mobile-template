<!--  -->
<template>
  <div>
    <div>
      <Header>
        <template slot="left">
          Left
        </template>
        <template slot="right">
          右边
        </template>
        <template>
          主页
        </template>
      </Header>
    </div>
    <div class="content">
      <van-nav-bar
        title="首页"
        left-text="返回"
        right-text="按钮"
      />
      <div>
        <span>用户名：</span>
        <span>{{ name }}</span>
      </div>

      <div>
        <van-button type="info" size="small" @click="handleGetInfo">获取个人信息</van-button>
      </div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
      <div style="height:60px;">TT</div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { getInfo } from '@/api/user'
import { getToken } from '@/utils/auth'
export default {

  components: {
    Header
  },
  data() {
    return {
      name: ''
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    handleGetInfo() {
      const token = getToken()
      getInfo(token).then(res => {
        this.name = res.data.introduction
      })
    }
  }
}

</script>

<style lang='scss' scoped>

</style>
