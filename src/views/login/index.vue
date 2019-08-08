<template>
  <div class="login-container">
    <div ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">欢迎使用</h3>
      </div>

      <!-- <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div> -->
      <van-field
        v-model="loginForm.username"
        clearable
        left-icon="manager"
        placeholder="请输入用户名"
        size="large"
        :error="error.username"
        class="login-input"
        @focus="focusUsername"
      />

      <van-field
        v-model="loginForm.password"
        left-icon="lock"
        type="password"
        placeholder="请输入密码"
        :error="error.password"
        class="login-input"
        size="large"
        @focus="focusPassword"
      />
      <van-button
        type="info"
        class="login-button"
        size="normal"
        @click="login"
      >
        登录
      </van-button>

    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      error: {
        username: false,
        password: false
      }
    }
  },
  computed: {
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },

    validateInput(callback) {
      if (!this.loginForm.username && !this.loginForm.password) {
        this.error.username = true
        this.error.password = true
        return
      } else if (!this.loginForm.username) {
        this.error.username = true
        this.error.password = false
        return
      } else if (!this.loginForm.password) {
        this.error.username = false
        this.error.password = true
        return
      } else {
        callback()
      }
    },
    focusUsername() {
      this.error.username = false
    },
    focusPassword() {
      this.error.password = false
    },

    login() {
      this.validateInput(this.handleLogin)
    },

    handleLogin() {
      this.loading = true
      this.$store.dispatch('user/login', this.loginForm).then(() => {
        this.$router.push({ path: this.redirect || '/' })
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

/* reset vant-ui css */
.login-container {
  .van-field__control {
    color: #eee;
  }
  .van-cell:not(:last-child)::after {
    border-bottom: 0 solid #ebedf0;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background: url('../../assets/img/bg.jpg') top right/100% 100% no-repeat;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    position: relative;
    width: 80%;
    max-width: 420px;
    overflow: hidden;

    .login-input {
      background-color: #1e1e1d;
      border-bottom: solid 0px;
      color: #eee;
      margin-bottom:10px;
      border-radius:5px;
    }

    .login-button {
      width: 100%;
      border-radius: 5px;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
}
</style>
