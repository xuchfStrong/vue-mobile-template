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
    <div class="content-container">
      <van-row gutter="10" class="login-wrap">
        <van-col span="9">
          <van-field v-model="userInfo.username" size="mini" class="input-wrap" placeholder="请输入用户名" />
        </van-col>
        <van-col span="9" class="input-wrap">
          <van-field v-model="userInfo.password2" type="password" placeholder="密码" />
        </van-col>
        <van-col span="4">
          <van-button v-if="loginFlag" type="danger" size="small" @click="logout">退出</van-button>
          <van-button v-else type="info" size="small" @click="initWebSocket">登录</van-button>
        </van-col>
      </van-row>

      <van-divider>角色信息</van-divider>

      <van-row class="row-wrap">
        <van-col span="8">
          <span>角色：</span>
          <span>{{ roleInfo.name }}</span>
        </van-col>
        <van-col span="8">
          <span>等级：</span>
          <span>{{ roleInfo.level }}</span>
        </van-col>
        <van-col span="8">
          <span>关卡：</span>
          <span>{{ roleInfo.levelId }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>血精：</span>
          <span>{{ roleInfo.xuejing }}</span>
        </van-col>
        <van-col span="8">
          <span>钻石：</span>
          <span>{{ roleInfo.zuanshi }}</span>
        </van-col>
        <van-col span="8">
          <span>无尽：</span>
          <span>{{ roleInfo.wujinLevelId }}</span>
        </van-col>
      </van-row>

      <van-divider>挂机设置</van-divider>
      <van-row class="row-wrap" type="flex" align="center">
        <van-col span="6">
          <div>推图副本</div>
        </van-col>
        <van-col span="8">
          <van-stepper v-model="attackTime.bossTime" button-size="20px" />
        </van-col>
        <van-col span="10">
          <van-button type="info" size="small" @click="startFubenBoss">开始</van-button>
          <van-button type="danger" size="small" @click="stopFubenBoss">停止</van-button>
        </van-col>
      </van-row>
      <van-row class="row-wrap" type="flex" align="center">
        <van-col span="6">
          <div>无尽炼狱</div>
        </van-col>
        <van-col span="8">
          <van-stepper v-model="attackTime.wujingTime" button-size="20px" />
        </van-col>
        <van-col span="10">
          <van-button type="info" size="small" @click="startWujing">开始</van-button>
          <van-button type="danger" size="small" @click="stopWujing">停止</van-button>
        </van-col>
      </van-row>

      <van-divider>挂机日志</van-divider>
      <textarea v-model="logs" rows="20" readonly />
    </div>
  </div>
</template>

<script>
import SHA1 from 'js-sha1'
import moment from 'moment'
import Header from '@/components/Header'
import { getInfo } from '@/api/user'
import { getToken } from '@/utils/auth'
export default {

  components: {
    Header
  },
  data() {
    return {
      name: '',
      websock: null,
      pIn: 0,
      loginFlag: false,
      userInfo: {
        username: '18615772860',
        password: 'ljs',
        password2: ''
      },
      roleInfo: {
        name: '',
        levelId: 0,
        wujinLevelId: 0,
        level: '', // 等级
        zuanshi: '',
        xuejing: ''
      },
      attackTime: {
        bossTime: 0,
        wujingTime: 0
      },
      timer: {
        heartBeatTimer: null,
        bossTimer: null
      },
      logs: []
    }
  },

  computed: {
    logStr() {
      const str = ''
      this.logs.forEach(item => {
        str.concat(item)
      })
      return str
    }
  },

  watch: {},

  created() {
    // 页面刚进入时开启长连接
    // this.initWebSocket()
  },

  destroyed: function() {
    // 页面销毁时关闭长连接
    this.websocketclose()
  },

  mounted() {},

  methods: {
    handleGetInfo() {
      const token = getToken()
      getInfo(token).then(res => {
        this.name = res.data.introduction
      })
    },

    genKey() {
      const keytime = new Date().getTime()
      // const keytime = Date.parse(new Date()) / 1000
      const str = 'askj8789kldksiewkszkm2323lkkl' + keytime
      const key = SHA1(str).toUpperCase().substr(0, 6)
      return {
        key: key,
        keytime: keytime
      }
    },

    gen_base_json(pktId) {
      this.pIn += 1
      const keyobj = this.genKey()
      const baseJson = {
        pktId: pktId,
        key: keyobj.key,
        keyTime: keyobj.keytime,
        pIn: this.pIn
      }
      return baseJson
    },

    initWebSocket() { // 初始化weosocket
      const wsuri = 'ws://tapandroid4.maobugames.com:35001/' // ws地址
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },

    websocketonopen(e) {
      // console.log('WebSocket连接成功', e)
      this.recordLogs('登录成功')
      this.loginFlag = true
      this.login(this.userInfo.username, this.userInfo.password)
    },
    websocketonerror(e) { // 错误
      console.log('WebSocket连接发生错误')
      this.recordLogs('连接发生错误')
    },
    websocketonmessage(e) { // 数据接收
      const redata = JSON.parse(e.data)
      // 注意：长连接我们是后台直接1秒推送一条数据，
      // 但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      // 这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      // console.log('response', redata)
      if (redata.pd === 1000) {
        console.log('角色名：', redata.roleName)
        this.roleInfo.name = redata.roleName
      }
      if (redata.pd === 1001) {
        console.log('推图进度', redata.k)
        this.roleInfo.levelId = redata.k
        this.roleInfo.level = redata.h
        this.roleInfo.zuanshi = redata.f
        this.roleInfo.xuejing = redata.xuejing
      }
      if (redata.pd === 1008) {
        console.log('推图进度', redata.openLevel)
        this.roleInfo.levelId = redata.openLevel
      }
      if (redata.pd === 1080) {
        console.log('无尽进度', redata.level + 1)
      }

      const nolog_list = [1005, 1011, 1085]
      if (nolog_list.indexOf(redata.pd) === -1) {
        console.log('responses', redata)
      }
    },

    websocketsend(data) { // 数据发送
      this.websock.send(JSON.stringify(data))
      console.log('send', JSON.stringify(data))
    },

    websocketclose(e) { // 关闭
      this.loginFlag = false
      console.log('connection closed (' + e + ')')
    },

    login(username, password) {
      this.websocketsend(this.gen_base_json(-1))
      // 第一个包
      const login_packet = this.gen_base_json(0)
      login_packet.userName = username
      login_packet.password = password
      login_packet.plat = 0
      login_packet.youke = false
      login_packet.idfa = ''
      // 第二个包
      const login_packet1 = this.gen_base_json(260)
      login_packet1.operate = 1
      // 第三个包
      const login_packet2 = this.gen_base_json(10)
      login_packet2.operate = 1
      // 第四个包
      const login_packet3 = this.gen_base_json(7)
      login_packet3.operate = 1
      login_packet3.roleId = ''
      const self = this
      setTimeout(function() { self.websocketsend(login_packet) }, 1000)
      setTimeout(function() { self.websocketsend(login_packet1) }, 2000)
      setTimeout(function() { self.websocketsend(login_packet2) }, 3000)
      setTimeout(function() { self.websocketsend(login_packet3) }, 4000)
      this.timer.heartBeatTimer = setInterval(function() { self.websocketsend(self.gen_base_json(-1)) }, 10000)
    },

    logout() {
      this.recordLogs('退出登录')
      clearInterval(this.timer.heartBeatTimer)
      this.websock.close()
    },

    // 记录日志
    recordLogs(log) {
      // const d = new Date().toLocaleString()
      const d = moment().format('YYYY-MM-DD HH:mm:ss')
      if (this.logs.length > 100) {
        this.logs.shift()
      }
      this.logs.push('\n' + d + ':' + log)
    },

    fuben(levelId, operate, danci) {
      const fuben_packet = this.gen_base_json(5)
      fuben_packet.levelId = levelId
      fuben_packet.operate = operate
      fuben_packet.danci = danci
      this.websocketsend(fuben_packet)
    },

    startFubenBoss() {
      if (this.roleInfo.levelId === 0) {
        this.$toast.fail('等待获取当前关卡数')
        return
      }
      let i = 1
      const bossTime = this.attackTime.bossTime
      const self = this
      self.timer.bossTimer = setInterval(function() {
        console.log('打副本BOSS', self.roleInfo.levelId)
        self.recordLogs('推图第' + self.roleInfo.levelId + '关')
        self.fuben(self.roleInfo.levelId, 2, 4)
        i++
        if (i > bossTime) {
          clearInterval(self.timer.bossTimer)
          self.recordLogs('停止推图')
        }
      }, 1000)
    },

    // 停止打BOSS
    stopFubenBoss() {
      clearInterval(this.timer.bossTimer)
      this.recordLogs('停止推图')
    },

    // 开始无尽炼狱
    startWujing() {

    },

    // 停止无尽炼狱
    stopWujing() {

    }
  }
}

</script>

<style lang="scss">
.content-container {
  .van-cell {
    padding: 2px 10px;
  }
}
</style>

<style lang='scss' scoped>
.row-wrap {
  margin: 10px 0;
}
.input-wrap {
  border: solid 1px #e0e0e0;
}
textarea {
  width: 100%;
}
</style>
