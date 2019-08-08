<template>
  <div>
    <!-- <img class="user-poster" src="https://img.yzcdn.cn/public_files/2017/10/23/8690bb321356070e0b8c4404d087f8fd.png"> -->
    <div class="header-wrap">
      <div class="avatar-wrap">
        <div class="name-wrap">{{ name }}</div>
        <div class="avatar">
          <van-image
            width="60"
            height="60"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>

      </div>
    </div>
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" @click="waitPay" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="records" />
        待接单
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        已发货
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
      <van-cell icon="points" title="我的积分" is-link to="myIntegral" />
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
      <van-cell icon="gift-o" title="退出登录" @click="logout" />
    </van-cell-group>

    <van-row type="flex" justify="center">
      <van-col span="12">
        <van-button type="danger" class="logout-button" @click="logout">退出登录</van-button>
      </van-col>
    </van-row>

  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      value: 'xxxxx',
      name: 'IvanStrong'
    }
  },
  methods: {
    waitPay() {
      // this.$router.go(-1) // 返回上一页
      this.$router.push({ name: 'waitPay' })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.$router.push('/login')
    }
  }
}

</script>

<style lang="scss" scoped>
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
.logout-button {
  width: 100%;
  margin: 20px;
}
.header-wrap {
  height: 200px;
  width: 100%;
  background: url('../../assets/img/header.png')
}
.avatar-wrap {
  float: right;
  position: relative;
  bottom: -160px;
  right: 20px;
  .name-wrap{
    color: #fff;
    display: inline-block;
    position: relative;
    top: -30px;
  }
  .avatar {
    display: inline-block;
    border-radius: 5px;
    height: 60px;
    width: 60px;
    overflow: hidden;
  }
}

.user-links {
  margin-top: 20px;
}
</style>
