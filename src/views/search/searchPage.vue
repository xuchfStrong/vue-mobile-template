<!--  -->
<template>
  <div>
    <van-row type="flex" justify="space-space" align="center" class="serach-wrap">
      <van-col span="2" class="active-white">
        <van-icon name="arrow-left" size="23" @click="onClickLeft" />
      </van-col>
      <van-col span="18">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          shape="round"
          @search="onSearch"
        />
      </van-col>
      <van-col span="4" offset="1" class="active-white">
        <span @click="onSearch">搜索</span>
      </van-col>
    </van-row>
    <div>
      {{ serachContent }}
    </div>
  </div>
</template>

<script>
export default {

  components: {},
  data() {
    return {
      value: '',
      serachContent: ''
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    onSearch() {
      this.serachContent = this.value
    },
    onClickLeft() {
      this.$router.go(-1)
    }
  }
}

</script>
<style lang="scss">
.serach-wrap {
  .van-search {
    padding: 0;
    border-radius: 3px;
  }
}
</style>

<style lang='scss' scoped>
.serach-wrap {
  background: #1989fa;
  height: 50px;
  color: #ffffff;
}
</style>
