<!--  -->
<template>
  <div>
    <div>
      <Header>
        <template slot="left" />
        <template slot="right" />
        <template>
          <span class="title">古代战争-同肝</span>
        </template>
      </Header>
    </div>
    <div class="content-container">
      <van-row type="flex" align="center" justify="space-between" class="row-wrap">
        <!-- <van-col span="3">
          <div>平台:</div>
        </van-col> -->
        <van-col span="9">
          <van-dropdown-menu>
            <van-dropdown-item v-model="userInfo.platform" :options="platformOption" />
          </van-dropdown-menu>
        </van-col>
        <!-- <van-col span="4">
          <div>服务器:</div>
        </van-col> -->
        <van-col span="9">
          <van-dropdown-menu>
            <van-dropdown-item v-model="userInfo.server" :options="serverOption" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="4">
          <!-- <div>服务器:</div> -->
        </van-col>
      </van-row>
      <van-row gutter="0" type="flex" justify="space-between">
        <van-col span="9">
          <van-field v-model="userInfo.username" input-align="center" size="mini" class="input-wrap" placeholder="请输入用户名" />
        </van-col>
        <van-col span="9">
          <van-field v-model="userInfo.passwordPlatForm" input-align="center" type="password" class="input-wrap" placeholder="密码" />
        </van-col>
        <van-col span="4" class="right">
          <van-button v-if="flag.loginFlag" type="danger" size="small" @click="logout">退出</van-button>
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
          <span>推图：</span>
          <span>{{ levelIdStr }}</span>
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
        <van-col span="8">
          <div>推图副本</div>
        </van-col>
        <van-col span="8" class="center">
          <van-stepper v-model="attackTime.bossTime" button-size="20px" />
        </van-col>
        <van-col span="8" class="right">
          <van-button v-if="!flag.tuituFlag" type="info" size="small" @click="startFubenBoss">开始</van-button>
          <van-button v-else type="danger" size="small" @click="stopFubenBoss">停止</van-button>
        </van-col>
      </van-row>
      <van-row class="row-wrap" type="flex" align="center">
        <van-col span="8">
          <div>无尽炼狱</div>
        </van-col>
        <van-col span="8" class="center">
          <van-stepper v-model="attackTime.wujinTime" button-size="20px" />
        </van-col>
        <van-col span="8" class="right">
          <van-button v-if="!flag.wujinFlag" type="info" size="small" @click="startWujin">开始</van-button>
          <van-button v-else type="danger" size="small" @click="stopWujin">停止</van-button>
        </van-col>
      </van-row>
      <van-row class="row-wrap" type="flex" align="center">
        <van-col span="8">
          <div>恶魔巢穴</div>
        </van-col>
        <van-col span="8" class="center">
          <van-stepper v-model="attackTime.emeTime" button-size="20px" />
        </van-col>
        <van-col span="8" class="right">
          <van-button v-if="!flag.emeFubenFlag" type="info" size="small" @click="startEme">开始</van-button>
          <van-button v-else type="danger" size="small" @click="stopEme">停止</van-button>
        </van-col>
      </van-row>
      <van-row class="row-wrap" type="flex" align="center">
        <van-col span="8">
          <div>每日副本</div>
        </van-col>
        <van-col span="8" class="center">
          <van-stepper v-model="attackTime.meiriTime" button-size="20px" />
        </van-col>
        <van-col span="8" class="right">
          <van-button v-if="!flag.meiriFubenFlag" type="info" size="small" @click="startMeiriFuben">开始</van-button>
          <van-button v-else type="danger" size="small" @click="stopMeiriFuben">停止</van-button>
        </van-col>
      </van-row>

      <van-row class="row-wrap" type="flex" align="center">
        <van-col span="8">
          <div>金币商店</div>
        </van-col>
        <van-col span="8" class="center">
          <van-button type="default" size="small" @click="flushShop">{{ shopInfo.jinbiShuaXin }}钻石刷新</van-button>
        </van-col>
        <van-col span="8" class="right">
          <van-button type="info" size="small" @click="buyAll">全买</van-button>
        </van-col>
      </van-row>

      <div class="flex-center-wrapper">
        <div>
          <!-- <van-button type="info" size="small" @click="startall">开始全部</van-button> -->
          <van-button type="info" size="small" @click="clearLog">清理日志</van-button>
        </div>
      </div>

      <van-divider>挂机日志</van-divider>
      <textarea v-model="guajiLog" rows="20" readonly />
    </div>
  </div>
</template>

<script>
import SHA1 from 'js-sha1'
import moment from 'moment'
import { mapGetters, mapActions } from 'vuex'
import Header from '@/components/Header'
import { getGameLoginInfo, setGameLoginInfo } from '@/utils/auth'
const parse = require('@/utils/response-parse')
export default {

  components: {
    Header
  },
  data() {
    return {
      name: '',
      websock: null,
      pIn: 0,
      flag: {
        loginFlag: false,
        tuituFlag: false,
        wujinFlag: false,
        emeFubenFlag: false,
        meiriFubenFlag: false
      },
      roleInfo: {
        name: '',
        levelId: 0,
        wujinLevelId: 0,
        level: '', // 等级
        zuanshi: '',
        xuejing: ''
      },
      shopInfo: { // 夏洛克商店信息
        jinbiShuaXin: 0 // 金币商店刷新价格
      },
      attackTime: {
        bossTime: 1,
        wujinTime: 1,
        emeTime: 1,
        meiriTime: 1
      },
      timer: {
        heartBeatTimer: null,
        bossTimer: null,
        wujinTimer: null,
        emeTimer: null,
        meiriTimer: null,
        buyJinbiShopTimer: null
      },
      logs: [],
      userInfo: {
        username: '',
        password: 'ljs', // 登录游戏服务器的密码，websocket连接使用
        passwordPlatForm: '', // 平台的密码
        platform: 1,
        server: 'ws://tapandroid4.maobugames.com:35001/'
      },
      platformOption: [
        { text: 'TapTap', value: 1 }
      ],
      serverOption: [
        { text: '天启位面', value: 'ws://xgm.xiaomaoqipai.cn:35001/' },
        { text: '费伦位面', value: 'ws://tapandroid2.maobugames.com:35001/' },
        { text: '费伦子位面', value: 'ws://tapandroid3.maobugames.com:35003/' },
        { text: '天启子位面', value: 'ws://tapandroid4.maobugames.com:35001/' }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'guajiLog'
    ]),
    levelIdStr() {
      const mo = parseInt((this.roleInfo.levelId - 1) / 200) + 1
      const yu = (this.roleInfo.levelId - 1) % 200 + 1
      const str = mo + '-' + yu
      return str
    }
  },

  watch: {
    logs(newVal) {
      this.changeGuajiLog(newVal)
    }
  },

  created() {
    // 页面刚进入时开启长连接
    // this.initWebSocket()
  },

  destroyed: function() {
    // 页面销毁时关闭长连接
    this.logout()
  },

  mounted() {
    this.loadLoginInfo()
  },

  methods: {
    ...mapActions('game', [
      'changeGuajiLog'
    ]),

    // 读取记住的登录信息
    loadLoginInfo() {
      const gameLoginInfo = getGameLoginInfo()
      if (gameLoginInfo) {
        this.userInfo.platform = gameLoginInfo.platform
        this.userInfo.server = gameLoginInfo.server
        this.userInfo.username = gameLoginInfo.username
        this.userInfo.passwordPlatForm = gameLoginInfo.passwordPlatForm
      }
    },

    // 存储登录信息到LocalStorage
    saveLogInfo() {
      const gameLoginInfo = {
        platform: this.userInfo.platform,
        server: this.userInfo.server,
        username: this.userInfo.username,
        passwordPlatForm: this.userInfo.passwordPlatForm
      }
      setGameLoginInfo(gameLoginInfo)
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
      const wsuri = this.userInfo.server // ws地址
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },

    websocketonopen(e) {
      // console.log('WebSocket连接成功', e)
      this.recordLogs('登录成功')
      this.flag.loginFlag = true
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
        this.roleInfo.name = redata.roleName
      }
      if (redata.pd === 1001) {
        this.roleInfo.levelId = redata.k
        this.roleInfo.level = redata.h
        this.roleInfo.zuanshi = redata.f
        this.roleInfo.xuejing = redata.xuejing
      }
      if (redata.pd === 1008) {
        this.roleInfo.levelId = redata.openLevel
      }
      if (redata.pd === 1080) {
        this.roleInfo.wujinLevelId = redata.level
      }

      // const nolog_list = [1005, 1011, 1085]
      // if (nolog_list.indexOf(redata.pd) === -1) {
      //   console.log('responses', redata)
      // }

      // 推图结果
      if (redata.pd === 1004 && redata.d === 5) {
        const log = parse.boss(redata.c)
        this.recordLogs(log)
      }

      // 无尽结果
      if (redata.pd === 1004 && redata.d === 244) {
        const log = parse.wujin(redata.c)
        this.recordLogs(log)
      }

      // 每日副本
      if (redata.pd === 1004 && redata.d === 243) {
        const log = parse.meiriFuben(redata.c)
        this.recordLogs(log)
      }

      // 恶魔巢穴
      if (redata.pd === 1004 && redata.d === 259) {
        const log = parse.emeFuben(redata.c)
        this.recordLogs(log)
      }

      // 商店信息
      if (redata.pd === 1052) {
        this.shopInfo.jinbiShuaXin = redata.jinbiShuaXin
      }

      // 恶魔巢穴难度等信息
      // if (redata.pd === 1088) {
      //   const log = parse.emmFubenInfo(redata)
      //   this.recordLogs(log)
      // }
    },

    websocketsend(data) { // 数据发送
      this.websock.send(JSON.stringify(data))
      // console.log('send', JSON.stringify(data))
    },

    websocketclose(e) { // 关闭
      this.logout()
      console.log('connection closed (' + e + ')')
    },

    login(username, password) {
      this.saveLogInfo()
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
      login_packet3.operate = 4
      login_packet3.roleId = ''
      // 第五个包
      const login_packet4 = this.gen_base_json(272)
      login_packet4.operate = 4
      login_packet4.id = 0
      // 第六个包
      const login_packet5 = this.gen_base_json(271)
      login_packet5.operate = 3
      login_packet5.index = 0
      login_packet5.rank = 0
      login_packet5.rmb = 0
      login_packet5.roleId = ''
      // 第七个包
      const login_packet6 = this.gen_base_json(282)
      login_packet6.operate = 3
      login_packet6.index = 0
      login_packet6.rank = 0
      // 第八个包
      const login_packet7 = this.gen_base_json(2)
      const self = this
      setTimeout(function() { self.websocketsend(login_packet) }, 100)
      setTimeout(function() { self.websocketsend(login_packet1) }, 200)
      setTimeout(function() { self.websocketsend(login_packet2) }, 300)
      setTimeout(function() { self.websocketsend(login_packet3) }, 400)
      setTimeout(function() { self.websocketsend(login_packet4) }, 600)
      setTimeout(function() { self.websocketsend(login_packet5) }, 700)
      setTimeout(function() { self.websocketsend(login_packet6) }, 800)
      setTimeout(function() { self.websocketsend(login_packet7) }, 900)
      this.timer.heartBeatTimer = setInterval(function() { self.websocketsend(self.gen_base_json(-1)) }, 10090)
    },

    logout() {
      this.recordLogs('退出登录')
      clearInterval(this.timer.heartBeatTimer)
      this.websock.close()
      this.flag.loginFlag = false
      this.pIn = 0
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

    // 清理日志
    clearLog() {
      this.logs = []
    },

    // 开始全部
    startall() {

    },

    // 通用发包,很多请求发送后都需要发一次该通用包
    sendGeneric() {
      const genericPacket = this.gen_base_json(11)
      genericPacket.operate = 12
      genericPacket.roleId = ''
      this.websocketsend(genericPacket)
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
      this.flag.tuituFlag = true
      let i = 1
      const bossTime = this.attackTime.bossTime
      const self = this
      self.timer.bossTimer = setInterval(function() {
        self.recordLogs('推图第' + self.levelIdStr + '关')
        self.fuben(self.roleInfo.levelId, 2, 4)
        i++
        if (i > bossTime) {
          self.stopFubenBoss()
        }
      }, 1000)
    },

    // 停止打BOSS
    stopFubenBoss() {
      this.flag.tuituFlag = false
      clearInterval(this.timer.bossTimer)
      this.recordLogs('停止推图')
    },

    // 无尽炼狱发包
    sendWujin() {
      const wujinPacket = this.gen_base_json(244)
      wujinPacket.operate = 2
      this.websocketsend(wujinPacket)
      this.sendGeneric()
    },

    // 开始无尽炼狱
    startWujin() {
      if (this.roleInfo.wujinLevelId === 0) {
        this.sendWujin()
        this.$toast.fail('等待获取当前关卡信息')
        return
      }
      this.flag.wujinFlag = true
      let i = 1
      const wujinTime = this.attackTime.wujinTime
      const self = this
      const tiaozhanLevel = this.roleInfo.wujinLevelId + 1
      self.timer.wujinTimer = setInterval(function() {
        self.recordLogs('挑战无尽炼狱第' + tiaozhanLevel + '关')
        self.sendWujin()
        i++
        if (i > wujinTime) {
          self.stopWujin()
        }
      }, 1000)
    },

    // 停止无尽炼狱
    stopWujin() {
      clearInterval(this.timer.wujinTimer)
      this.flag.wujinFlag = false
      this.recordLogs('停止挑战无尽炼狱')
    },

    // 恶魔副本发包
    sendEme(fbType, operate) {
      const fubenType = { 1: '美女副本', 2: '亡灵副本', 3: '恶魔副本' }
      const emePacket = this.gen_base_json(259)
      emePacket.operate = operate
      emePacket.fbType = fbType
      this.websocketsend(emePacket)
      this.sendGeneric()
      this.recordLogs('挑战恶魔巢穴-' + fubenType[fbType])
    },

    // 开始恶魔副本
    startEme() {
      this.flag.emeFubenFlag = true
      let i = 1
      const emeTime = this.attackTime.emeTime
      const self = this
      self.timer.emeTimer = setInterval(function() {
        if (self.roleInfo.levelId > 1000) {
          self.sendEme(1, 2)
          setTimeout(function() { self.sendEme(2, 2) }, 1000)
          setTimeout(function() { self.sendEme(3, 2) }, 2000)
        } else if (self.roleInfo.levelId > 750) {
          self.sendEme(1, 2)
          setTimeout(function() { self.sendEme(2, 2) }, 1000)
        } else {
          self.sendEme(1, 2)
        }
        i++
        if (i > emeTime) {
          clearInterval(self.timer.emeTimer)
          self.stopEme()
        }
      }, 3000)
    },

    // 停止恶魔副本
    stopEme() {
      clearInterval(this.timer.emeTimer)
      this.flag.emeFubenFlag = false
      this.recordLogs('停止恶魔副本')
    },

    // 每日副本发包
    sendMeiriFuben(dayNum, operate) {
      const fubenType = { 1: '金币副本', 2: '经验副本', 3: '羁绊副本', 4: '熔炼副本', 5: '药草副本', 6: '血精石副本' }
      const meiriPacket = this.gen_base_json(243)
      meiriPacket.operate = operate
      meiriPacket.fbType = dayNum
      this.websocketsend(meiriPacket)
      this.sendGeneric()
      this.recordLogs('挑战每日副本-' + fubenType[dayNum])
    },

    // 开始每日副本
    startMeiriFuben() {
      this.flag.meiriFubenFlag = true
      const dayNum = parseInt(moment().format('d'))
      let intervalTime = 0
      if (dayNum !== 0) {
        intervalTime = 1000
      } else {
        intervalTime = 6000
      }
      let i = 1
      const meiriTime = this.attackTime.meiriTime
      const self = this
      self.timer.meiriTimer = setInterval(function() {
        if (dayNum !== 0) {
          self.sendMeiriFuben(dayNum, 2)
        } else {
          self.sendMeiriFuben(1, 2)
          setTimeout(function() { self.sendMeiriFuben(2, 2) }, 1000)
          setTimeout(function() { self.sendMeiriFuben(3, 2) }, 2000)
          setTimeout(function() { self.sendMeiriFuben(4, 2) }, 3000)
          setTimeout(function() { self.sendMeiriFuben(5, 2) }, 4000)
          setTimeout(function() { self.sendMeiriFuben(6, 2) }, 5000)
        }
        i++
        if (i > meiriTime) {
          self.stopMeiriFuben()
        }
      }, intervalTime)
    },

    // 停止每日副本
    stopMeiriFuben() {
      clearInterval(this.timer.meiriTimer)
      this.flag.meiriFubenFlag = false
      this.recordLogs('停止每日副本')
    },

    /**
     * 金币商店购买
     * @param {Number} operate 0为获取信息，1为购买, 2为刷新
     * @param {Number} id 购买的商品，不是操作id=0
     * @param {Number} num 购买的数量，为固定的1或者5，不购买的操作num为0
     */
    sendJinbiShop(operate, id, num) {
      const packet = this.gen_base_json(32)
      packet.id = id
      packet.operate = operate
      packet.num = num
      this.websocketsend(packet)
    },
    flushShop() {
      this.sendJinbiShop(2, 0, 0)
    },
    buyAll() {
      let i = 101
      this.sendJinbiShop(0, 0, 0) // 获取商品信息
      const self = this
      self.timer.buyJinbiShopTimer = setInterval(function() {
        if (i > 115) {
          clearInterval(self.timer.buyJinbiShopTimer)
        } else if (i > 110) {
          self.sendJinbiShop(1, i, 5)
          self.recordLogs('购买商品' + i)
        } else {
          self.sendJinbiShop(1, i, 1)
          self.recordLogs('购买商品' + i)
        }
        i++
      }, 100)
    }
  }
}

</script>

<style lang="scss">
.content-container {
  .van-cell {
    padding: 2px 0px;
  }

  .van-dropdown-menu__title{
    font-size: 14px;
  }

  .van-hairline--top-bottom::after{
    border-width: 0;
  }
  .van-dropdown-menu{
    background-color: #ebedf0;
    height:30px;
  }
}
</style>

<style lang='scss' scoped>
.title {
  font-size: 16px;
}
.row-wrap {
  margin: 10px 0;
}
.input-wrap {
  border: solid 1px #ebedf0;
}
textarea {
  width: 100%;
  margin-bottom: 50px;
}
.right {
  text-align: end;
}
.center {
  text-align: center;
}

</style>
