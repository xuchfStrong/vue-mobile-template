<!--  -->
<template>
  <div>
    <van-row gutter="0" type="flex" justify="space-between" align="center" class="header">
      <van-col span="6">
        <div class="header-left"><slot name="left" /></div>
      </van-col>
      <van-col span="12">
        <van-row type="flex" justify="center" align="center">
          <van-col><slot>Mobile Template</slot></van-col>
        </van-row>
      </van-col>
      <van-col span="6">
        <div class="header-right"><slot name="right" /></div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'Header',
  components: {},
  data() {
    return {
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {}
}

</script>

<style lang='scss' scoped>
.header {
  background: #1989fa;
  min-height: 50px;
  width: 100%;
  color: #ffffff;
  position: fixed;
  z-index: 100;
}
.header-left {
  padding-left: 10px;
}
.header-right {
  float: right;
  padding-right: 10px;
}
</style>
