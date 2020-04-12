<!--  -->
<template>
  <div>
    <div>
      <Header>
        <template slot="left" />
        <template slot="right">
          <van-icon name="arrow" @click="showHelp()" />
        </template>
        <template>
          <span>剑气除魔火箭辅助V{{ $global.jqcmVersionName }}</span>
        </template>
      </Header>
    </div>

    <van-popup
      v-model="show.helpInfo"
      position="top"
      :style="{ height: '40%' }"
    >
      <help />
    </van-popup>

    <div class="content-container">

      <van-row gutter="0" type="flex" justify="space-between">
        <van-col span="14">
          <van-dropdown-menu class="select-item">
            <van-dropdown-item v-model="userInfo.loginType" :options="utils.platform" :disabled="flag.showServer" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="10" class="right">
          <van-button v-if="flag.showServer" plain type="info" size="small" @click="logout">切换账号</van-button>
          <van-button v-else type="info" size="small" @click="handleCheckUserStatus">登录</van-button>
        </van-col>
      </van-row>

      <div>
        <van-field v-model="userInfo.usernamePlatForm" :disabled="flag.showServer" size="mini" label="账号:" placeholder="请输入账号" />
        <van-field v-model="userInfo.passwordPlatForm" :disabled="flag.showServer" size="mini" label="密码:" type="password" placeholder="请输入密码" />
      </div>

      <van-row v-if="flag.showServer" type="flex" align="center">
        <van-col span="17">
          <div v-if="flag.showServer" class="server-wraper">
            <div class="name-item">有角色的服务器：</div>
            <van-dropdown-menu class="select-item">
              <van-dropdown-item v-model="userInfo.server" :options="serverInfo.last_server_list" @change="changeServer" />
            </van-dropdown-menu>
          </div>
          <div v-if="flag.showServer" class="server-wraper">
            <div class="name-item">所有的服务器：</div>
            <van-dropdown-menu class="select-item">
              <van-dropdown-item v-model="userInfo.server" :options="serverInfo.server_list" @change="changeServer" />
            </van-dropdown-menu>
          </div>
        </van-col>
        <van-col span="7" class="right">
          <van-button type="info" size="small" @click="handleGetServerList">更新服务器</van-button>
        </van-col>
      </van-row>

      <!-- <div v-if="utils.showContact" class="waring-wrap">{{ utils.contact }}</div> -->
      <!--
      <div v-if="!isWebview" style="margin-top:10px; color:#1989fa;">
        <a :href="utils.apkDownloadUrl">
          <span>点击下载辅助APP</span>
        </a>
      </div> -->

      <van-divider>云挂机</van-divider>
      <van-row class="row-wrap">
        <van-col span="24">
          <span>角色名：</span>
          <span>{{ roleInfo.role_name }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="24">
          <span>辅助到期时间：</span>
          <span :class="{danger: fuzuStatus.isExpired}">{{ fuzuStatus.end_time }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="24">
          <span>数据更新时间：</span>
          <span :class="{danger: isPassedTwoHours}">{{ roleInfo.update_time }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="12">
          <span>续费请提供此ID：</span>
          <span>{{ loginInfo.userId }}</span>
        </van-col>
        <van-col span="12">
          <span>云挂机状态：</span>
          <span>{{ configInfo.on_off | statusFilter }}</span>
        </van-col>
      </van-row>

      <div class="center">
        <van-button v-if="configInfo.on_off" type="danger" size="small" @click="handleStopguaji">停止云挂机</van-button>
        <van-button v-else type="info" size="small" @click="handleStartguaji">开启云挂机</van-button>
        <van-button type="info" size="small" @click="handleGuajiStatus">获取最新数据</van-button>
      </div>

      <van-divider>角色信息</van-divider>

      <van-row class="row-wrap">
        <van-col span="8">
          <span>境界：</span>
          <span>{{ roleInfo.role_level | jingjieFilter }}</span>
        </van-col>
        <van-col span="8">
          <span>霸主层数：</span>
          <span>{{ roleInfo.bazhu_cengshu }}</span>
        </van-col>
        <van-col span="8">
          <span>VIP等级：</span>
          <span>{{ roleInfo.vip_level }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>战力：</span>
          <span>{{ roleInfo.zhanli }}</span>
        </van-col>
        <van-col span="8">
          <span>主宰层数：</span>
          <span>{{ roleInfo.zhuzai_level }}</span>
        </van-col>
        <van-col span="8">
          <span>关卡通关：</span>
          <span>{{ roleInfo.guanqia }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>仙缘：</span>
          <span>{{ roleInfo.xianyuan }}</span>
        </van-col>
        <van-col span="8">
          <span>巅峰排名：</span>
          <span>{{ roleInfo.dianfeng_pos }}</span>
        </van-col>
      </van-row>

      <van-divider>活动次数</van-divider>

      <van-row class="row-wrap">
        <van-col span="8">
          <span>魔族入侵：</span>
          <span>{{ roleInfo.mozuruqin_times }}</span>
        </van-col>
        <van-col span="8">
          <span>历练食物：</span>
          <span>{{ roleInfo.lilianshiwu }}</span>
        </van-col>
        <van-col span="8">
          <span>遗迹开采：</span>
          <span>{{ roleInfo.yijikaicai_times }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>遗迹进攻：</span>
          <span>{{ roleInfo.yijijingong_times }}</span>
        </van-col>
        <van-col span="8">
          <span>巅峰次数：</span>
          <span>{{ roleInfo.dianfeng_times }}</span>
        </van-col>
        <van-col span="8">
          <span>仙斗次数：</span>
          <span>{{ roleInfo.xiandou_times }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>仙盟建设：</span>
          <span>{{ roleInfo.xianmengjianshe_times }}</span>
        </van-col>
        <van-col span="8">
          <span>仙盟秘境：</span>
          <span>{{ roleInfo.xianmengmijing_times }}</span>
        </van-col>
        <van-col span="8">
          <span>魔域次数：</span>
          <span>{{ roleInfo.moyu_times }}</span>
        </van-col>
      </van-row>

      <van-divider>挂机设置</van-divider>
      <van-row type="flex" justify="space-between" align="center">
        <van-col span="10">
          领取离线倍数
        </van-col>
        <van-col span="14">
          <van-radio-group v-model="configInfo.lixianbeishu" direction="horizontal" @change="changeLilianbeishu">
            <van-radio :name="1" @click="chooseLixianbeishu">单倍</van-radio>
            <van-radio :name="2" @click="chooseLixianbeishu">双倍</van-radio>
            <van-radio :name="5" @click="chooseLixianbeishu">五倍</van-radio>
          </van-radio-group>
        </van-col>
      </van-row>
      <van-cell-group>
        <van-switch-cell v-model="configInfo.is_shenglingwan" :active-value="1" :inactive-value="0" title="升聚灵碗" />
        <van-switch-cell v-model="configInfo.is_modi" :active-value="1" :inactive-value="0" title="自动魔帝" />
        <van-switch-cell v-model="configInfo.is_richang" :active-value="1" :inactive-value="0" title="自动日常" />
        <van-switch-cell v-model="configInfo.is_xiandou" :active-value="1" :inactive-value="0" title="自动仙斗" />
        <van-switch-cell v-model="configInfo.is_liandan" :active-value="1" :inactive-value="0" title="自动炼丹" />
        <van-switch-cell v-model="configInfo.is_xianmengmijing" :active-value="1" :inactive-value="0" title="自动仙盟秘境 " />
        <van-switch-cell v-model="configInfo.is_liandanlianqixiulian" :active-value="1" :inactive-value="0" title="自动洞府炼丹/炼器修炼" />
        <van-switch-cell v-model="configInfo.is_use_dianfeng" :active-value="1" :inactive-value="0" title="21:30之后自动巅峰剩余次数" />
      </van-cell-group>

      <van-row type="flex" justify="space-between" align="center" class="cell-wraper">
        <van-col span="11">
          <van-dropdown-menu>
            <van-dropdown-item v-model="configInfo.lilianfuben" :options="options.lilian" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="11">
          <van-switch-cell v-model="switchInfo.lilianfuben" title="自动历练" @change="changeLilian" />
        </van-col>
      </van-row>

      <van-row type="flex" justify="space-between" align="center" class="cell-wraper">
        <van-col span="11">
          <van-dropdown-menu>
            <van-dropdown-item v-model="configInfo.xianmengjianshe" :options="options.xianmengjianshe" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="11">
          <van-switch-cell v-model="switchInfo.xianmengjianshe" title="自动仙盟建设" @change="changeXianmengjianshe" />
        </van-col>
      </van-row>

      <van-row type="flex" justify="space-between" align="center" class="cell-wraper">
        <van-col span="11">
          <van-dropdown-menu>
            <van-dropdown-item v-model="configInfo.bazhukongwei" :options="options.bazhukongwei" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="11">
          <van-switch-cell v-model="switchInfo.bazhukongwei" title="霸主抢空位" @change="changeBazhukongwei" />
        </van-col>
      </van-row>

      <van-row type="flex" justify="space-between" align="center" class="cell-wraper">
        <van-col span="11">
          <van-dropdown-menu>
            <van-dropdown-item v-model="configInfo.yijikaicaileixing" :options="options.caiyiji" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="11">
          <van-switch-cell v-model="switchInfo.yijikaicaileixing" title="自动开采遗迹" @change="changeYijikaicaileixing" />
        </van-col>
      </van-row>

      <van-row type="flex" justify="space-between" align="center" class="cell-wraper">
        <van-col span="11">
          <van-dropdown-menu>
            <van-dropdown-item v-model="configInfo.yijigongjileixing" :options="options.qiangyiji" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="11">
          <van-switch-cell v-model="switchInfo.yijigongjileixing" title="自动抢夺遗迹" @change="changeYijigongjileixing" />
        </van-col>
      </van-row>

      <van-row type="flex" justify="space-between" align="center" class="cell-wraper">
        <van-col span="11">
          <van-dropdown-menu>
            <van-dropdown-item v-model="configInfo.moyuleixing" :options="options.moyu" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="11">
          <van-switch-cell v-model="switchInfo.moyuleixing" title="自动打魔域" @change="changeMoyuleixing" />
        </van-col>
      </van-row>

      <van-row type="flex" justify="space-between" align="center" class="cell-wraper">
        <van-col span="11">
          <van-dropdown-menu>
            <van-dropdown-item v-model="configInfo.boss_id1" :options="options.mozuBoss1" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="11">
          <van-switch-cell v-model="switchInfo.boss_id1" title="自动魔族入侵BOSS1" @change="changeBoss1" />
        </van-col>
      </van-row>

      <van-row type="flex" justify="space-between" align="center" class="cell-wraper">
        <van-col span="11">
          <van-dropdown-menu>
            <van-dropdown-item v-model="configInfo.boss_id2" :options="options.mozuBoss2" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="11">
          <van-switch-cell v-model="switchInfo.boss_id2" title="自动魔族入侵BOSS2" @change="changeBoss2" />
        </van-col>
      </van-row>

      <van-divider>功法设置</van-divider>

      <van-row type="flex" justify="space-between" class="gongfa-wrap">
        <van-col span="11" class="flex flex-align-items-center">
          <div class="name">攻击：</div>
          <div class="drop-down">
            <van-dropdown-menu :class="{ active: gongfaObj.gongji !== '10' }">
              <van-dropdown-item v-model="gongfaObj.gongji" :options="options.gongfa" />
            </van-dropdown-menu>
          </div>
        </van-col>
        <van-col span="11" class="flex flex-align-items-center">
          <div class="name">生命：</div>
          <div class="drop-down">
            <van-dropdown-menu :class="{ active: gongfaObj.shengming !== '10' }">
              <van-dropdown-item v-model="gongfaObj.shengming" :options="options.gongfa" />
            </van-dropdown-menu>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="gongfa-wrap">
        <van-col span="11" class="flex flex-align-items-center">
          <div class="name">物防：</div>
          <div class="drop-down">
            <van-dropdown-menu :class="{ active: gongfaObj.wufang !== '10' }">
              <van-dropdown-item v-model="gongfaObj.wufang" :options="options.gongfa" />
            </van-dropdown-menu>
          </div>
        </van-col>
        <van-col span="11" class="flex flex-align-items-center">
          <div class="name">法防：</div>
          <div class="drop-down">
            <van-dropdown-menu :class="{ active: gongfaObj.fafang !== '10' }">
              <van-dropdown-item v-model="gongfaObj.fafang" :options="options.gongfa" />
            </van-dropdown-menu>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="space-between" class="gongfa-wrap">
        <van-col span="11" class="flex flex-align-items-center">
          <div class="name">残页：</div>
          <div class="drop-down">
            <van-dropdown-menu :class="{ active: gongfaObj.canye !== '10' }">
              <van-dropdown-item v-model="gongfaObj.canye" :options="options.gongfa" />
            </van-dropdown-menu>
          </div>
        </van-col>
        <van-col span="11" class="flex flex-align-items-center">
          <div class="name">绝学：</div>
          <div class="drop-down">
            <van-dropdown-menu :class="{ active: gongfaObj.juexue !== '10' }">
              <van-dropdown-item v-model="gongfaObj.juexue" :options="options.gongfa" />
            </van-dropdown-menu>
          </div>
        </van-col>
      </van-row>

      <div style="margin: 16px 0 60px 0; text-align: center;">
        <van-button type="info" size="small" @click="handleChangeConfigInfo">保存设置</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import CryptoJS from 'crypto-js'
import moment from 'moment'
// const IsWebview = require('js-is-webview')
import { genRandomNumber, genUUID, genMac } from '@/utils/index'
import { getGameLoginInfo, setGameLoginInfo, getSwitchInfo, setSwitchInfo } from '@/utils/auth'
import { loginFirstStep, loginSecondStep, loginThirdStep, getServerConfig, addUser, startGuaji, stopGuaji, checkUserStatus } from '@/api/game'
import { getRoleInfo, getConfigInfo, changeConfigInfo, getUtils } from '@/api/game'
import { loginFirstStepTapTap, getServerConfigQudao, loginThirdStepTapTap } from '@/api/game'
import Header from '@/components/Header'
import Help from './components/Help'
import options from './options.json'
import jingjieMap from './jingjie.js'

const gongfaObjDefault = {
  options: '10', // 10表示关闭
  gongji: '10', // 购买攻击
  shengming: '10', // 购买生命
  wufang: '10', // 购买物防
  fafang: '10', // 购买法防
  canye: '10', // 购买残页
  juexue: '10' // 购买绝学
}
const configInfoDefault = {
  is_richang: 0,
  is_xiandou: 0,
  is_shenglingwan: 0,
  is_modi: 0,
  is_liandan: 0,
  is_xianmengmijing: 0,
  is_liandanlianqixiulian: 0,
  is_use_dianfeng: 0,
  lixianbeishu: 0,
  lilianfuben: 0,
  xianmengjianshe: 0,
  bazhukongwei: 0,
  yijikaicaileixing: 0,
  yijigongjileixing: 0,
  moyuleixing: 0,
  boss_id1: 0,
  boss_id2: 0,
  on_off: '',
  gongfagoumai: ''
}
export default {

  components: {
    Header,
    Help
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: '关闭',
        1: '开启'
      }
      return statusMap[status]
    },
    jingjieFilter(jingjie) {
      return jingjieMap[jingjie]
    }
  },
  data() {
    return {
      name: '',
      pIn: 0,
      vip: true,
      yunguaji: false,
      options: options,
      isClickLilianbeishu: false,
      utils: {

      },
      userRole: { // 用户类型
        free: false, // 免费版本
        normal: false, // 普通版本
        v: false, // vip版本
        h: false, // 黑科技
        vh: false, // 黑科技+vip
        sv: false, // 超级VIP
        userLevelId: 0, // 0:免费用户，1:普通用户，2：云挂机，3：黑科技，4：云挂机+黑科技
        goldShop: false, // 是否显示金币商店
        otherShop: false // 其他商店跨等级买东西
      },
      show: {
        helpInfo: false,
        remoteGuajiLog: false
      },
      roleInfo: {
        userid: '',
        server_id: '',
        role_name: '',
        update_time: '',
        role_level: '',
        vip_level: '',
        zhanli: '',
        xianyuan: '',
        guanqia: '',
        zhuzai_level: '',
        bazhu_cengshu: '',
        dianfeng_pos: '',
        mozuruqin_times: '',
        lilianshiwu: '',
        yijikaicai_times: '',
        yijijingong_times: '',
        dianfeng_times: '',
        xiandou_times: '',
        xianmengjianshe_times: '',
        xianmengmijing_times: '',
        moyu_times: ''
      },
      configInfo: Object.assign({}, configInfoDefault),
      configInfo1: {
        is_richang: 0,
        is_xiandou: 0,
        is_shenglingwan: 0,
        is_modi: 0,
        is_liandan: 0,
        is_xianmengmijing: 0,
        is_liandanlianqixiulian: 0,
        is_use_dianfeng: 0,
        lixianbeishu: 0,
        lilianfuben: 0,
        xianmengjianshe: 0,
        bazhukongwei: 0,
        yijikaicaileixing: 0,
        yijigongjileixing: 0,
        moyuleixing: 0,
        boss_id1: 0,
        boss_id2: 0,
        on_off: '',
        gongfagoumai: ''
      },
      fuzuStatus: {
        end_time: '',
        on_off: '',
        isExpired: false
      },
      switchInfo: {
        lilianfuben: false,
        xianmengjianshe: false,
        bazhukongwei: false,
        yijikaicaileixing: false,
        yijigongjileixing: false,
        moyuleixing: false,
        boss_id1: false,
        boss_id2: false,
        gongfagoumai: false

      },
      gongfaObj: Object.assign({}, gongfaObjDefault), // 功法购买相关的配置
      flag: {
        loginFlag: false,
        logoutFlag: false,
        newUserFlag: false,
        showServer: false
      },
      logs: [],
      remoteGuajiLog: '',
      userInfo: {
        usernamePlatForm: '', // 平台的用户名
        passwordPlatForm: '', // 平台的密码
        platform: 1, // 这个platform用在像辅助添加用户的时候
        server: '',
        endTime: '', // 辅助到期时间
        deviceType: 'vivo+x5s+l',
        site: 'jqcm_android',
        mac: '',
        uid: '',
        sessionid: '',
        adid: '',
        udid: '',
        aid: '',
        openuidi: '',
        nickname: '',
        loginType: 1 // 官方平台：1，taptap：2
      },
      loginInfo: { // 登录过程中需要的数据
        sessionid: '',
        userId: '',
        uid: '', // 渠道登录的时候uid和userId不同
        token: '',
        channelId: '',
        pfId: '',
        time: ''
      },
      serverInfo: { // 服务器列表
        client_ip: '',
        server_list: [],
        last_server_list: []
      }
    }
  },

  computed: {
    // 更新时间是否超过2小时
    isPassedTwoHours() {
      const a = moment(new Date())
      const b = moment(this.roleInfo.update_time)
      const duration = a.diff(b)
      return duration > 2 * 3600 * 1000
    },
    // 购买功法复选框的disabled状态
    disabledGongfa() {
      return this.gongfaObj.options === '10'
    }
    // 计算是否是webView
    // isWebview() {
    //   const userAgent = {
    //     userAgent: navigator.userAgent
    //   }
    //   const ss = new IsWebview()
    //   return ss.check(userAgent)
    // }
  },

  watch: {
    // 监控各种开关的变化
    // switchFlag: {
    //   handler: function() {
    //     this.saveSwitchInfo()
    //   },
    //   deep: true
    // },
    'configInfo.lilianfuben': {
      handler: function(newVal) {
        this.switchInfo.lilianfuben = !!newVal
      }
    },
    'configInfo.xianmengjianshe': {
      handler: function(newVal) {
        this.switchInfo.xianmengjianshe = !!newVal
      }
    },
    'configInfo.bazhukongwei': {
      handler: function(newVal) {
        this.switchInfo.bazhukongwei = !!newVal
      }
    },
    'configInfo.yijikaicaileixing': {
      handler: function(newVal) {
        this.switchInfo.yijikaicaileixing = !!newVal
      }
    },
    'configInfo.yijigongjileixing': {
      handler: function(newVal) {
        this.switchInfo.yijigongjileixing = !!newVal
      }
    },
    'configInfo.moyuleixing': {
      handler: function(newVal) {
        this.switchInfo.moyuleixing = !!newVal
      }
    },
    'configInfo.boss_id1': {
      handler: function(newVal) {
        this.switchInfo.boss_id1 = !!newVal
      }
    },
    'configInfo.boss_id2': {
      handler: function(newVal) {
        this.switchInfo.boss_id2 = !!newVal
      }
    },
    'gongfaObj.options': {
      handler: function(newVal) {
        this.switchInfo.gongfagoumai = newVal !== '10'
        if (newVal === '10') {
          this.gongfaObj = Object.assign({}, gongfaObjDefault)
        }
      }
    },
    'userInfo.loginType': { // 当选择用户名密码登录的时候需要将uid和sessionid设置为空
      handler: function(newVal) {
        if (newVal === 1) {
          this.userInfo.uid = ''
          this.userInfo.sessionid = ''
        }
      }
    }
  },

  created() {},

  destroyed: function() {},

  mounted() {
    this.handleGetUtils()
    this.loadLoginInfo()
  },

  methods: {
    changeLilianbeishu(val) {
      if (this.isClickLilianbeishu) {
        if (val !== 1) {
          this.$toast({ duration: 2000, message: '选择' + val + '倍，需要花费仙缘！' })
        } else {
          this.$toast({ duration: 2000, message: '选择' + val + '倍，免费！' })
        }
      }
    },

    chooseLixianbeishu(e) {
      this.isClickLilianbeishu = true
    },

    changeLilian(val) {
      if (!val) this.configInfo.lilianfuben = 0
    },

    changeXianmengjianshe(val) {
      if (!val) this.configInfo.xianmengjianshe = 0
    },

    changeBazhukongwei(val) {
      if (!val) this.configInfo.bazhukongwei = 0
    },

    changeYijikaicaileixing(val) {
      if (!val) this.configInfo.yijikaicaileixing = 0
    },

    changeYijigongjileixing(val) {
      if (!val) this.configInfo.yijigongjileixing = 0
    },

    changeMoyuleixing(val) {
      if (!val) this.configInfo.moyuleixing = 0
    },

    changeBoss1(val) {
      if (!val) this.configInfo.boss_id1 = 0
    },

    changeBoss2(val) {
      if (!val) this.configInfo.boss_id2 = 0
    },

    changeGongfa(val) {
      if (!val) this.gongfaObj.options = '10'
    },

    showHelp() {
      this.show.helpInfo = true
    },

    handleGetUtils() {
      getUtils().then(res => {
        this.utils = res
        this.$store.dispatch('game/changeNewJqcmVersion', res.version)
      }).catch(err => {
        console.log(err)
      })
    },

    // 在辅助服务端检查用户状态
    handleCheckUserStatus() {
      const param = {
        uname_md5: CryptoJS.MD5(this.userInfo.usernamePlatForm).toString(), // 用户名
        pwd_md5: CryptoJS.MD5(this.userInfo.passwordPlatForm).toString(), // 密码
        login_type: this.userInfo.loginType
      }
      checkUserStatus(param).then(res => {
        if (res.code === 200) {
          // 获取用户信息
          this.loginInfo.userId = res.userid
          if (this.userInfo.loginType === 1) { // 官方平台
            this.handleLoginFirstStep() // 去服务端校验
          } else if (this.userInfo.loginType === 2) {
            this.handleLoginFirstStepTapTap() // TapTap平台
          } else {
            this.loginInfo.userId = this.userInfo.usernamePlatForm
            this.handleGetServerConfigOther() // 其他平台只需要在后端检查是否存在，如果不存在就需要提取用户名密码
            this.$toast({
              duration: 2000,
              message: '登录成功，请选择服务器后，点击开始挂机'
            })
          }
          this.flag.showServer = true
          this.saveLoginInfo()
        } else {
          this.flag.newUserFlag = true
          if (this.userInfo.loginType === 1) { // 官方平台
            this.handleLoginFirstStep() // 去服务端校验
          } else if (this.userInfo.loginType === 2) {
            this.handleLoginFirstStepTapTap() // TapTap平台
          } else {
            this.$toast({
              duration: 2000,
              message: '登录失败，请使用登陆助手提取账号密码后再登录。'
            })
          }
        }
      })
    },

    // 更新服务器列表
    handleGetServerList() {
      this.flag.newUserFlag = false
      if (this.userInfo.loginType === 1) { // 官方平台
        this.handleLoginFirstStep() // 去服务端校验
      } else if (this.userInfo.loginType === 2) {
        this.handleLoginFirstStepTapTap() // TapTap平台
      } else {
        this.handleGetServerConfigOther() // 其他平台
      }
    },

    // 登录第一步
    handleLoginFirstStep() {
      if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
        this.$toast('请输入用户名和密码')
        return
      }
      const timeStamp = Date.parse(new Date()) / 1000
      const key = 'c089208f115b3af91c9016aa863d4a8b'
      this.userInfo.udid = genRandomNumber(15)
      const param = {
        device_type: this.userInfo.deviceType,
        account: this.userInfo.usernamePlatForm, // 用户名
        password: this.userInfo.passwordPlatForm, // 密码
        sign: CryptoJS.MD5(key + 'WX' + this.userInfo.site + 'WX' + timeStamp + timeStamp).toString(),
        time: timeStamp,
        mac: this.userInfo.mac || genMac(),
        site: this.userInfo.site,
        sessionid: this.userInfo.sessionid,
        version: '6.0.1',
        channelid: '',
        uid: this.userInfo.uid,
        adid: this.userInfo.adid || genRandomNumber(17),
        udid: this.userInfo.udid,
        aid: this.userInfo.aid || genUUID(),
        openuidi: this.userInfo.udid
      }
      this.userInfo.mac = param.mac
      this.userInfo.adid = param.adid
      this.userInfo.aid = param.aid
      loginFirstStep(param).then(res => {
        if (res.result === 0) {
          this.userInfo.nickname = res.data.nickname
          this.loginInfo.sessionid = res.data.sessionid
          this.loginInfo.userId = res.data.uid
          this.handleLoginSecondStep()
        } else {
          this.flag.showServer = false
          this.$toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // TapTap登录第一步
    handleLoginFirstStepTapTap() {
      if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
        this.$toast('请输入用户名和密码')
        return
      }
      this.userInfo.aid = this.userInfo.aid || genUUID()
      const timeStamp = Date.parse(new Date()) / 1000
      const key = '9e2ece875dac4b56b4a05525c471f5a5'
      const signStr = 'gameAppId=' + 12 +
                      '&name=' + this.userInfo.usernamePlatForm +
                      '&passport=' + this.userInfo.passwordPlatForm +
                      '&time=' + timeStamp +
                      '&type=' + 1 +
                      '&key=' + key
      const param = {
        gameAppId: 12,
        name: this.userInfo.usernamePlatForm, // 用户名
        passport: this.userInfo.passwordPlatForm, // 密码
        sign: CryptoJS.MD5(signStr).toString(),
        time: timeStamp,
        type: 1
      }
      loginFirstStepTapTap(param).then(res => {
        if (res.code === 0) {
          this.loginInfo.uid = res.id
          this.loginInfo.token = res.accessToken
          this.handleLoginSecondStepTapTap()
        } else {
          this.flag.showServer = false
          this.$toast(res.data.msg)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 登录第二步，获取usertoken
    handleLoginSecondStep() {
      const timeStamp = Date.parse(new Date()) / 1000
      const signObj = {
        uid: this.loginInfo.userId,
        sessionid: this.loginInfo.sessionid,
        data: {
          site: 'jqcm_data',
          channel: '116',
          uid: this.loginInfo.userId,
          sessionid: this.loginInfo.sessionid,
          userName: this.userInfo.usernamePlatForm
        }
      }
      const str1 = JSON.stringify(signObj)
      const arr = [6, 6008, str1, this.userInfo.aid, timeStamp, '1.2', 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
      const singStr = arr.join('#')
      const param = {
        appId: 6,
        channelId: 6008,
        deviceId: this.userInfo.aid,
        sign: CryptoJS.MD5(singStr).toString(),
        ts: timeStamp,
        version: '1.2',
        data: {
          uid: this.loginInfo.userId,
          sessionid: this.loginInfo.sessionid,
          data: {
            site: 'jqcm_data',
            channel: '116',
            uid: this.loginInfo.userId,
            sessionid: this.loginInfo.sessionid,
            userName: this.userInfo.usernamePlatForm
          }
        }
      }
      loginSecondStep(param).then(res => {
        if (res.code === 1) {
          this.loginInfo.userId = res.data.userId // 这里获取的userId是为了获取服务器信息
          this.loginInfo.token = res.data.token
          this.loginInfo.channelId = res.data.channelId
          this.handleGetServerConfig()
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // TapTap登录第二步，获取usertoken
    handleLoginSecondStepTapTap() {
      const timeStamp = Date.parse(new Date()) / 1000
      const signObj = {
        uid: this.loginInfo.uid,
        token: this.loginInfo.token,
        uname: this.userInfo.usernamePlatForm
      }
      const str1 = JSON.stringify(signObj)
      const arr = [6, 6002, str1, this.userInfo.aid, timeStamp, '1.2', 'cG3dKvBJ10mTGrHf5IOzQLH1dn']
      const singStr = arr.join('#')
      const param = {
        appId: 6,
        channelId: 6002,
        deviceId: this.userInfo.aid,
        sign: CryptoJS.MD5(singStr).toString(),
        ts: timeStamp,
        version: '1.2',
        data: {
          uid: this.loginInfo.uid,
          token: this.loginInfo.token,
          uname: this.userInfo.usernamePlatForm
        }
      }
      loginSecondStep(param).then(res => {
        if (res.code === 1) {
          this.loginInfo.userId = res.data.userId // 这里获取的userId是为了获取服务器信息
          this.loginInfo.token = res.data.token
          this.loginInfo.channelId = res.data.channelId
          this.handleGetServerConfigTapTap()
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 获取服务器列表和最后登录服务器
    handleGetServerConfig() {
      const param = {
        v: '1.1.54',
        game_id: 3,
        channelId: this.loginInfo.channelId,
        channel: 'biguo',
        user_name: this.loginInfo.userId
      }
      getServerConfig(param).then(res => {
        if (res.server_list) {
          this.serverInfo.client_ip = res.client_ip
          this.serverInfo.last_server_list = this.formatLastServerList(res.last_server_list)
          this.serverInfo.server_list = this.formatServerList(res.server_list)
          this.handleLoginThirdStep()
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // TapTap获取服务器列表和最后登录服务器
    handleGetServerConfigTapTap() {
      const param = {
        v: '1.1.54',
        game_id: 6,
        channelId: this.loginInfo.channelId,
        channel: 'biguo',
        user_name: this.loginInfo.userId,
        ver: undefined
      }
      getServerConfigQudao(param).then(res => {
        if (res.server_list) {
          this.serverInfo.client_ip = res.client_ip
          this.serverInfo.last_server_list = this.formatLastServerList(res.last_server_list)
          this.serverInfo.server_list = this.formatServerList(res.server_list)
          this.handleLoginThirdStepTapTap()
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 获取其他服务器列表和最后登录服务器
    handleGetServerConfigOther() {
      const param = {
        v: '1.1.54',
        game_id: 6,
        channelId: 6002,
        channel: 'biguo',
        user_name: this.userInfo.usernamePlatForm,
        ver: undefined
      }
      getServerConfigQudao(param).then(res => {
        if (res.server_list) {
          this.serverInfo.client_ip = res.client_ip
          this.serverInfo.last_server_list = this.formatLastServerList(res.last_server_list)
          this.serverInfo.server_list = this.formatServerList(res.server_list)
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 将服务器信息格式化，将增加text和value属性用于下拉列表显示
    formatServerList(serverList) {
      const list = serverList.map(item => {
        const obj = {
          text: item.id + '服',
          value: item.id
        }
        item = Object.assign(obj, item)
        return item
      })
      return list.reverse()
    },

    // 将最后登录服务器信息格式化，将增加text和value属性用于下拉列表显示
    formatLastServerList(serverStr) {
      if (serverStr) {
        const serverList = serverStr.split(',')
        return serverList.map(item => {
          const obj = {
            text: item + '服',
            value: item
          }
          return obj
        })
      }
    },

    // 登录第三步
    handleLoginThirdStep() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
        channelId: this.loginInfo.channelId
      }
      loginThirdStep(param).then(res => {
        this.loginInfo.token = res.token
        this.loginInfo.time = res.time
        this.loginInfo.pfId = res.pfId
        if (this.flag.newUserFlag) this.handleAddUser()
      }).catch(err => {
        console.log(err)
      })
    },

    // TapTap登录第三步
    handleLoginThirdStepTapTap() {
      const param = {
        userId: this.loginInfo.userId,
        token: this.loginInfo.token,
        channelId: this.loginInfo.channelId
      }
      loginThirdStepTapTap(param).then(res => {
        this.loginInfo.token = res.token
        this.loginInfo.time = res.time
        this.loginInfo.pfId = res.pfId
        if (this.flag.newUserFlag) this.handleAddUser()
      }).catch(err => {
        console.log(err)
      })
    },

    // 登录游戏辅助，添加新用户
    handleAddUser() {
      let serverId = ''
      if (this.serverInfo.last_server_list) {
        serverId = this.serverInfo.last_server_list[0].value
      } else {
        serverId = this.serverInfo.server_list[0].value
      }
      const param = {
        userid: this.loginInfo.userId,
        last_server_id: serverId,
        login_type: this.userInfo.loginType,
        username: this.userInfo.usernamePlatForm,
        password: this.userInfo.passwordPlatForm,
        platform: this.userInfo.platform,
        phone_num: '',
        sms_code: '',
        wx_qq_account: '',
        channel_userid: '',
        session_id: '',
        mac: this.userInfo.mac,
        device_id: this.userInfo.aid,
        imei: this.userInfo.udid,
        pfid: this.loginInfo.pfId,
        timestamp: this.loginInfo.time,
        token: this.loginInfo.token,
        uname_md5: CryptoJS.MD5(this.userInfo.usernamePlatForm).toString(),
        pwd_md5: CryptoJS.MD5(this.userInfo.passwordPlatForm).toString()
      }
      addUser(param).then(res => {
        if (res.code === 200) {
          this.saveLoginInfo()
          this.flag.showServer = true
          this.$toast({ duration: 2000, message: '新用户登录成功，请选择服务器，然后开始挂机' })
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 获取挂机状态
    handleGuajiStatus() {
      if (!this.loginInfo.userId || !this.userInfo.server) {
        this.$toast('没有获取到登录的用户信息，请重新登录')
        return
      }
      const param = {
        userid: this.loginInfo.userId,
        server_id: this.userInfo.server
      }
      getRoleInfo(param).then(res => { // 查询角色信息
        const code = res.code
        switch (code) {
          case 200:
            this.roleInfo = res.data
            this.yunguaji = true
            this.$toast({ duration: 1000, message: '查询挂机状态成功' })
            break
          case 403:
            this.$toast({ duration: 2000, message: '参数错误' })
            break
          case 404:
            this.yunguaji = false
            this.$toast({ duration: 2000, message: '未查询到挂机信息，请开启云挂机' })
            break
        }
      }).catch(err => {
        console.log(err)
      })
      this.handleGetConfigInfo()
    },

    // 查询配置信息
    handleGetConfigInfo() {
      if (!this.loginInfo.userId || !this.userInfo.server) {
        this.$toast('没有获取到登录的用户信息，请重新登录')
        return
      }
      const param = {
        userid: this.loginInfo.userId,
        server_id: this.userInfo.server
      }
      getConfigInfo(param).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.isClickLilianbeishu = false
            this.configInfo = res.data
            this.calsIsExpired(res.data.end_time)
            this.calcGongfagoumai(String(res.data.gongfagoumai))
            // this.calcGongfagoumai(String(111210101013))
            break
          case 403:
            this.$toast({ duration: 2000, message: '参数错误' })
            break
          case 404:
            this.yunguaji = false
            this.$toast({ duration: 2000, message: '未查询到挂机信息，请开启云挂机' })
            this.configInfo = Object.assign({}, configInfoDefault)
            break
        }
      }).catch(err => {
        console.log(err)
      })
    },

    /**
     * 计算功法购买的各种属性
     * 总共12为数字每两位表示一个属性，从前到后是攻击，生命，物防，法防，残页，绝学
     * 两位数字是10-22之间，表示购买不同价格的功法
     */
    calcGongfagoumai(cfgStr) {
      if (cfgStr.length < 12) {
        this.$dialog.alert({
          title: '提示',
          message: '功法购买功能有变更，请重新设置后保存！'
        }).then(() => {
          // on close
        })
        return
      }
      this.gongfaObj.gongji = cfgStr.slice(0, 2)
      this.gongfaObj.shengming = cfgStr.slice(2, 4)
      this.gongfaObj.wufang = cfgStr.slice(4, 6)
      this.gongfaObj.fafang = cfgStr.slice(6, 8)
      this.gongfaObj.canye = cfgStr.slice(8, 10)
      this.gongfaObj.juexue = cfgStr.slice(10, 12)
    },

    // 从购买功法的对象中生成购买功法的配置数据发到后端
    genGongfagoumaiCfg() {
      const gongji = this.gongfaObj.gongji
      const shengming = this.gongfaObj.shengming
      const wufang = this.gongfaObj.wufang
      const fafang = this.gongfaObj.fafang
      const canye = this.gongfaObj.canye
      const juexue = this.gongfaObj.juexue
      return gongji + shengming + wufang + fafang + canye + juexue
    },

    // 计算辅助到期时间
    calsIsExpired(endTime) {
      const isExpired = moment(endTime).isBefore(new Date())
      if (isExpired) {
        this.fuzuStatus.isExpired = true
        this.fuzuStatus.end_time = '已经过期，请购买！'
      } else {
        this.fuzuStatus.isExpired = false
        this.fuzuStatus.end_time = endTime
      }
    },

    // 修改配置信息
    handleChangeConfigInfo() {
      this.configInfo.gongfagoumai = this.genGongfagoumaiCfg()
      const param = {
        userid: this.loginInfo.userId,
        server_id: this.userInfo.server,
        ... this.configInfo
      }
      changeConfigInfo(param).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.handleGetConfigInfo()
            this.$toast({ duration: 2000, message: '修改成功' })
            break
          case 403:
            this.$toast({ duration: 2000, message: '参数错误' })
            break
          case 404:
            this.yunguaji = false
            this.$toast({ duration: 2000, message: '未查询到挂机信息，请开启云挂机' })
            break
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 开始云挂机
    handleStartguaji() {
      if (!this.loginInfo.userId || !this.userInfo.server) {
        this.$toast('没有获取到登录的用户信息，请重新登录')
        return
      }
      const param = {
        userid: this.loginInfo.userId,
        server_id: this.userInfo.server
      }
      startGuaji(param).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.$toast({ duration: 1000, message: '挂机成功，请15秒后查询挂机状态' })
            this.handleGuajiStatus()
            break
          case 300:
            this.$toast({ duration: 2000, message: '新用户挂机成功，请15秒后查询挂机状态' })
            break
          case 403:
            this.$toast({ duration: 2000, message: '挂机失败，请重新登录后重试' })
            break
        }
        const self = this
        setTimeout(function() {
          self.handleGuajiStatus()
        }, 15000)
      })
    },

    // 停止云挂机
    handleStopguaji() {
      const param = {
        userid: this.loginInfo.userId,
        server_id: this.userInfo.server
      }
      stopGuaji(param).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.handleGuajiStatus()
            this.$toast({ duration: 1000, message: '停止挂机成功' })
            break
          case 403:
            this.$toast({ duration: 1000, message: '操作失败' })
            break
          case 404:
            this.$toast({ duration: 1000, message: '操作失败' })
            break
        }
      })
    },

    // 读取记住的登录信息
    loadLoginInfo() {
      const gameLoginInfo = getGameLoginInfo()
      if (gameLoginInfo) {
        this.userInfo.platform = gameLoginInfo.platform
        this.userInfo.server = gameLoginInfo.server
        this.userInfo.usernamePlatForm = gameLoginInfo.usernamePlatForm
        this.userInfo.passwordPlatForm = gameLoginInfo.passwordPlatForm
        this.userInfo.username = gameLoginInfo.username
        this.userInfo.uid = gameLoginInfo.uid
        this.userInfo.sessionid = gameLoginInfo.sessionid
        this.userInfo.loginType = gameLoginInfo.loginType
        this.loginInfo.userId = gameLoginInfo.userId
        this.flag.showServer = gameLoginInfo.showServer
        this.serverInfo = JSON.parse(gameLoginInfo.serverInfo)
        this.handleGuajiStatus()
      }
    },

    // 存储登录信息到LocalStorage
    saveLoginInfo() {
      const gameLoginInfo = {
        platform: this.userInfo.platform,
        server: this.userInfo.server,
        usernamePlatForm: this.userInfo.usernamePlatForm,
        passwordPlatForm: this.userInfo.passwordPlatForm,
        uid: this.userInfo.uid,
        sessionid: this.userInfo.sessionid,
        loginType: this.userInfo.loginType,
        username: this.userInfo.username,
        userId: this.loginInfo.userId,
        showServer: this.flag.showServer,
        serverInfo: JSON.stringify(this.serverInfo)
      }
      setGameLoginInfo(gameLoginInfo)
    },

    // 读取各种开关信息
    loadSwitchInfo() {
      const switchInfo = getSwitchInfo()
      this.switchFlag = { ...switchInfo }
    },

    // 存储各种开关信息
    saveSwitchInfo() {
      setSwitchInfo(this.switchFlag)
    },

    // 选择服务器
    changeServer(server) {
      this.handleGuajiStatus()
      this.saveLoginInfo()
    },

    // 保存设置
    handleSaveConfig() {

    },

    logout() {
      this.flag.logoutFlag = true
      this.flag.showServer = false
      this.saveLoginInfo()
    },

    handleLogout() {
      for (const key in this.flag) {
        this.flag[key] = false
      }
      for (const key in this.userRole) {
        if (key === 'userLevelId') {
          this.userRole[key] = 0
        } else {
          this.userRole[key] = false
        }
      }
      this.pIn = 0
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
  .van-tabs--card {
    padding-top: 0;
  }
  .van-tabs__wrap--scrollable .van-tab {
    -webkit-flex: 0 0 20% !important;
    flex: 0 0 20% !important;
  }
}
.active {
  .van-dropdown-menu__title {
    color: #1989fa;
  }
}
</style>

<style lang='scss' scoped>
.row-wrap {
  margin: 10px 0;
}
.center {
  text-align: center;
}
.right {
  text-align: right;
}
.server-wraper {
  display: flex;
  align-items: center;
  margin: 10px 0 0 0;
  .name-item {
    width: 120px;
    text-align: end;
  }
  .select-item {
    width: 150px;
  }
}
.cell-wraper {
  padding-top: 5px;
}
.danger {
  color: red;
}
.waring-wrap {
  color: red;
  margin-top: 10px;
  white-space: pre-line;
}
.gongfa-wrap {
  margin-top: 10px;
  .name {
    width: 25%;
  }
  .drop-down {
    width: 75%;
  }
}

</style>
