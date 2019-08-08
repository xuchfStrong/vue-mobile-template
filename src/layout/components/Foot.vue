<template>
  <div class="footer">
    <!-- <van-tabbar v-model="active">
    <van-tabbar-item icon="home-o" to="home">首页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" to="info" dot>申请</van-tabbar-item>
    <van-tabbar-item icon="search" to="search">查询</van-tabbar-item>
    <van-tabbar-item icon="setting-o" to="user" info="5">设置</van-tabbar-item>
    </van-tabbar> -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item
        replace
        to="/home"
        icon="home-o"
      >
        首页
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/info"
        icon="friends-o"
      >
        申请
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/search"
        icon="search"
      >
        查询
      </van-tabbar-item>
      <van-tabbar-item
        replace
        to="/user"
        icon="setting-o"
      >
        设置
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'Foot',

  components: {
  },

  mixins: [],

  props: {},

  data() {
    return {
      active: 0
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {}
}

</script>
