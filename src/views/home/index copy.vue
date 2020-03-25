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
          <span>古代战争火箭辅助V1.5.0</span>
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

    <van-popup
      v-model="show.remoteGuajiLog"
      position="bottom"
      :style="{ height: '60%' }"
    >
      <textarea id="remotelog-textarea" v-model="remoteGuajiLog" rows="20" readonly />
    </van-popup>

    <van-dialog
      v-model="show.yzmgHelp"
    >
      <div style="padding-left:20px;padding-right:20px; font-size:14px;">
        <p>1.配置两个英雄，保证能正常打过。一般主角+血狮或者主角+正义</p>
        <p>2.主角技能修改为奶，这里配置保存后，外面主角技能可以随便改</p>
        <p>3.配置完毕后，之后每天直接用辅助打迷宫就可以了</p>
        <p>4.如果遇到连续打一个关卡10次以上，请手动停止，然后进游戏处理</p>
      </div>
    </van-dialog>

    <div class="content-container">
      <van-row type="flex" align="center" justify="space-between" class="row-wrap">
        <van-col span="9">
          <van-dropdown-menu>
            <van-dropdown-item v-model="userInfo.platform" :options="platformOption" @change="changePlatform" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="9">
          <van-dropdown-menu>
            <van-dropdown-item v-model="userInfo.server" :options="serverOption" />
          </van-dropdown-menu>
        </van-col>
        <van-col span="4" />
      </van-row>
      <van-row gutter="0" type="flex" justify="space-between">
        <van-col span="9">
          <van-field v-model="userInfo.usernamePlatForm" input-align="center" size="mini" class="input-wrap" placeholder="请输入用户名" />
        </van-col>
        <van-col span="9">
          <van-field v-model="userInfo.passwordPlatForm" input-align="center" type="password" class="input-wrap" placeholder="密码" />
        </van-col>
        <van-col span="4" class="right">
          <van-button v-if="flag.loginFlag" type="danger" size="small" @click="logout">退出</van-button>
          <van-button v-else type="info" size="small" @click="handleLoginPlatForm">登录</van-button>
        </van-col>
      </van-row>

      <div v-if="userRole.free" class="endtiem-wrap">
        免费模式，购买后使用更多功能！
      </div>
      <div v-else class="endtiem-wrap">
        辅助到期时间: {{ userInfo.endTime }}
      </div>

      <van-divider>云挂机</van-divider>
      <div class="vip-wrap">
        <van-button v-if="!yunguaji" type="info" size="small" @click="handleStartguaji">开始云挂机</van-button>
        <van-button v-if="yunguaji" type="danger" size="small" @click="handleStopguaji">停止云挂机</van-button>
        <van-button type="info" size="small" @click="handleGetGuajiLog">查询挂机信息</van-button>
      </div>

      <van-divider>角色信息</van-divider>

      <van-row class="row-wrap">
        <van-col span="8">
          <span>角色名：</span>
          <span>{{ roleInfo.name }}</span>
        </van-col>
        <van-col span="8">
          <span>境界：</span>
          <span>{{ roleInfo.level }}</span>
        </van-col>
        <van-col span="8">
          <span>VIP等级：</span>
          <span>{{ levelIdStr }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>战力：</span>
          <span>{{ roleInfo.xuejing }}</span>
        </van-col>
        <van-col span="8">
          <span>仙缘：</span>
          <span>{{ roleInfo.zuanshi }}</span>
        </van-col>
        <van-col span="8">
          <span>关卡通关：</span>
          <span>{{ roleInfo.wujinLevelId }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>主宰层数：</span>
          <span>{{ jinbiFormat }}</span>
        </van-col>
        <van-col span="8">
          <span>霸主层数：</span>
          <span>{{ roleInfo.wujingbi }}</span>
        </van-col>
        <van-col span="8">
          <span>巅峰排名：</span>
          <span>{{ roleInfo.shenqisuipian }}</span>
        </van-col>
      </van-row>

      <van-divider>活动次数</van-divider>

      <van-row class="row-wrap">
        <van-col span="8">
          <span>魔族入侵：</span>
          <span>{{ roleInfo.name }}</span>
        </van-col>
        <van-col span="8">
          <span>历练食物：</span>
          <span>{{ roleInfo.level }}</span>
        </van-col>
        <van-col span="8">
          <span>遗迹开采：</span>
          <span>{{ levelIdStr }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>遗迹进攻：</span>
          <span>{{ roleInfo.xuejing }}</span>
        </van-col>
        <van-col span="8">
          <span>巅峰次数：</span>
          <span>{{ roleInfo.zuanshi }}</span>
        </van-col>
        <van-col span="8">
          <span>仙斗次数：</span>
          <span>{{ roleInfo.wujinLevelId }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>仙盟建设：</span>
          <span>{{ jinbiFormat }}</span>
        </van-col>
        <van-col span="8">
          <span>仙盟秘境：</span>
          <span>{{ roleInfo.wujingbi }}</span>
        </van-col>
        <van-col span="8" />
      </van-row>

      <van-divider>挂机设置</van-divider>
      <!-- <van-tabs v-model="tabActive" type="card" color="#1989fa">
        <van-tab title="挑战">
          <van-row v-if="userRole.normal" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>推图副本挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <van-stepper v-model="attackTime.bossTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.tuituFlag" type="info" size="small" @click="startFubenBoss">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopFubenBoss">停止</van-button>
            </van-col>
          </van-row>
          <van-row v-if="userRole.vh" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>推图副本小怪</div>
            </van-col>
            <van-col span="8" class="center">
              <van-stepper v-model="attackTime.xiaoguaiTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.xiaoguaiFlag" type="info" size="small" @click="startFubenXiaoguai">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopFubenXiaoguai">停止</van-button>
            </van-col>
          </van-row>
          <van-row v-if="userRole.normal" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>无尽炼狱挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <van-stepper v-model="attackTime.wujinTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.wujinFlag" type="info" size="small" @click="startWujin">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopWujin">停止</van-button>
            </van-col>
          </van-row>
          <van-row v-if="userRole.normal" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>恶魔巢穴挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <span>剩余美女{{ emeFubenInfo.jgTimes }}次,亡灵{{ emeFubenInfo.wlTimes }}次,恶魔{{ emeFubenInfo.sqTimes }}次</span>
              <van-stepper v-model="attackTime.emeTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.emeFubenFlag" type="info" size="small" @click="startEme">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopEme">停止</van-button>
            </van-col>
          </van-row>
          <van-row v-if="userRole.normal" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>每日副本挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <span>{{ meiriFuebnAttackTimes }}</span>
              <van-stepper v-model="attackTime.meiriTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.meiriFubenFlag" type="info" size="small" @click="startMeiriFuben">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopMeiriFuben">停止</van-button>
            </van-col>
          </van-row>

          <van-row v-if="userRole.normal" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>竞技场挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <span>已打{{ jjcInfo.todayAttackTimes }}次,剩余{{ jjcInfo.jjcTime }}次,胜{{ jjcInfo.jjcWinTime }}次,输{{ jjcInfo.jjcLoseTime }}次,连胜{{ jjcInfo.jjcLinkWinTime }}次</span>
              <van-row>
                <van-col span="18">
                  <van-stepper v-model="attackTime.zhanliDiscount" :step="10" button-size="20px" />
                </van-col>
                <van-col span="6">
                  <van-button type="default" size="mini" @click="showJJCHelop">帮助</van-button>
                </van-col>
              </van-row>
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.jjcFlag" type="info" size="small" @click="startJingjichang">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopJingjichang">停止</van-button>
            </van-col>
          </van-row>

          <van-row v-if="userRole.normal" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>远征迷宫</div>
            </van-col>
            <van-col span="8" class="center">
              <span>剩余{{ yzmgInfo.remainTimes }}次</span>
              <van-button type="default" size="mini" @click="showYZMGHelp">帮助</van-button>
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.yzmgFlag" type="info" size="small" @click="startYZMG">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopYZMG">停止</van-button>
            </van-col>
          </van-row>

          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>血战竞技挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <span>剩余{{ taskInfo.xuezhanRemainTime }}次</span>
              <van-stepper v-model="attackTime.xuezhanjingjiTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.xuezhanjingjiFlag" type="info" size="small" @click="startXuezhan">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopXuezhan">停止</van-button>
            </van-col>
          </van-row>

          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>蜡像馆挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <span>剩余{{ laxiangguanInfo.canAttackTime }}次</span>
              <span>{{ laxiangguanLevel }}</span>
              <van-stepper v-model="attackTime.laxiangguanTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.laxiangguanFlag" type="info" size="small" @click="startLaxiangguan">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopLaxiangguan">停止</van-button>
            </van-col>
          </van-row>

          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>蜡像馆低一级挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <van-stepper v-model="attackTime.laxiangguanLowTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.laxiangguanLowFlag" type="info" size="small" @click="startLaxiangguanLow">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopLaxiangguanLow">停止</van-button>
            </van-col>
          </van-row>

          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>世界BOSS挑战</div>
            </van-col>
            <van-col span="8" class="center">
              <span>剩余{{ taskInfo.bossCanAttackTime }}次</span>
              <van-stepper v-model="attackTime.shijieBossTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button v-if="!flag.shijieBossFlag" type="info" size="small" @click="startShiJieBOSS">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopShiJieBOSS">停止</van-button>
            </van-col>
          </van-row>

          <van-row v-if="userRole.sv" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>超级探索</div>
            </van-col>
            <van-col span="8" class="center">
              <div>
                <span>小队ID</span>
                <span>英雄ID</span>
              </div>
              <van-row type="flex" justify="space-around" align="center">
                <van-col span="11">
                  <van-field v-model="tansuo.xiaoduiId" input-align="center" size="mini" class="input-wrap tansuo-item" placeholder="小队ID" />
                </van-col>
                <van-col span="11">
                  <van-field v-model="tansuo.heroId" input-align="center" size="mini" class="input-wrap tansuo-item" placeholder="英雄ID" />
                </van-col>
              </van-row>
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="superTansuo">探索</van-button>
            </van-col>
          </van-row>
        </van-tab>

        <van-tab title="购买">
          <van-row v-if="userRole.goldShop" class="row-wrap" type="flex" align="center">
            <van-col span="6">
              <div>金币商店</div>
            </van-col>
            <van-col span="7" class="right">
              <van-button type="default" size="small" @click="flushShop">{{ shopInfo.jinbiShuaXin }}钻石刷新</van-button>
            </van-col>
            <van-col span="7" class="left left-padding">
              <van-switch v-model="switchFlag.autoGlodShop" size="25px" @change="changeAutoGoldShop" />
            </van-col>
            <van-col span="4" class="right">
              <van-button type="info" size="small" @click="goldShopBuyAll">全买</van-button>
            </van-col>
          </van-row>

          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>酒馆十连抽</div>
            </van-col>
            <van-col span="8" class="center">
              <van-stepper v-model="attackTime.shilianchouTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="startShilianchou">开始</van-button>
            </van-col>
          </van-row>

          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>恶魔巢穴</div>
            </van-col>
            <van-col span="8" class="center">
              <span>已买美女{{ emeFubenInfo.buyjgTimes }}次,亡灵{{ emeFubenInfo.buywlTimes }}次,恶魔{{ emeFubenInfo.buysqTimes }}次</span>
              <van-dropdown-menu>
                <van-dropdown-item v-model="buyInfo.emeFubenType" :options="shopInfo.emeFuben" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="buyEme(buyInfo.emeFubenType)">购买</van-button>
            </van-col>
          </van-row>

          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>每日副本</div>
            </van-col>
            <van-col span="8" class="center">
              <span>{{ meiriFubenBuyTimes }}</span>
              <van-dropdown-menu>
                <van-dropdown-item v-model="buyInfo.meiriFubenType" :options="shopInfo.meiriFuben" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="buyMeiriFuben(buyInfo.meiriFubenType)">购买</van-button>
            </van-col>
          </van-row>

          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>蜡像馆购买</div>
            </van-col>
            <van-col span="8" class="center">
              <span>已买{{ laxiangguanInfo.buyTime }}次</span>
              <van-stepper v-model="buyInfo.laxiangguanBuyTime" button-size="20px" />
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="buyLaxiangguan">购买</van-button>
            </van-col>
          </van-row>
        </van-tab>

        <van-tab title="日常">
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="6">
              <div>每日副本扫荡</div>
            </van-col>
            <van-col span="12" class="center" />
            <van-col span="6" class="right">
              <van-button type="info" size="small" @click="saodangMeiriFuben">扫荡</van-button>
            </van-col>
          </van-row>
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="6">
              <div>无尽炼狱扫荡</div>
            </van-col>
            <van-col span="12" class="center" />
            <van-col span="6" class="right">
              <van-button type="info" size="small" @click="saodangWujin">扫荡</van-button>
            </van-col>
          </van-row>
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="6">
              <div>恶魔巢穴扫荡</div>
            </van-col>
            <van-col span="12" class="center" />
            <van-col span="6" class="right">
              <van-button type="info" size="small" @click="saodangEme">扫荡</van-button>
            </van-col>
          </van-row>
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="6">
              <div>蜡像馆扫荡</div>
            </van-col>
            <van-col span="12" class="center">
              <span>扫荡后自动领任务奖</span>
            </van-col>
            <van-col span="6" class="right">
              <van-button type="info" size="small" @click="saodangLaxiangguan">扫荡</van-button>
            </van-col>
          </van-row>
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="6">
              <div>装备升级</div>
            </van-col>
            <van-col span="12" class="center">
              <span>装备自动升级，用于做成就</span>
            </van-col>
            <van-col span="6" class="right">
              <van-button v-if="!flag.zbUpdateFlag" type="info" size="small" @click="startZbUpdate">开始</van-button>
              <van-button v-else type="danger" size="small" @click="stopZbUpdate">停止</van-button>
            </van-col>
          </van-row>
        </van-tab>

        <van-tab title="套装">
          <Taozhuang />
        </van-tab>

        <van-tab title="攻略">
          <GongLue />
        </van-tab>
      </van-tabs> -->

      <van-divider>
        <van-button type="default" size="small" @click="clearLog">清理日志</van-button>
      </van-divider>
      <textarea id="log-textarea" v-model="guajiLog" rows="20" readonly />
    </div>
  </div>
</template>

<script>
// import SHA1 from 'js-sha1'
import axios from 'axios'
import moment from 'moment'
// import deepClone from '@jsbits/deep-clone'
import CryptoJS from 'crypto-js'
import { encrypt, randomWord } from '@/utils/rsa'
import { mapGetters, mapActions } from 'vuex'
import { getGameLoginInfo, setGameLoginInfo, getSwitchInfo, setSwitchInfo } from '@/utils/auth'
import { loginPlatform, getServer, startGuaji, stopGuaji, getGuajiLog, getGuajiStatus } from '@/api/game'
import Header from '@/components/Header'
import Help from './components/Help'
// import GongLue from './components/GongLue'
// import Taozhuang from './components/Taozhuang'
export default {

  components: {
    Header,
    Help
    // GongLue,
    // Taozhuang
  },
  data() {
    return {
      name: '',
      websock: null,
      pIn: 0,
      secretKey: '',
      timeDiff: 0,
      vip: true,
      yunguaji: false,
      tansuo: {
        xiaoduiId: 1,
        heroId: 0
      },
      tabActive: 0, // Tab默认页面
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
        remoteGuajiLog: false,
        yzmgHelp: false
      },
      url: {
        serverTimeUrl: 'http://www.dgzz1.com:20002/ServerTime'
      },
      roleInfo: {
        name: '',
        levelId: 0,
        wujinLevelId: 0,
        level: '', // 等级
        zuanshi: '',
        xuejing: '',
        jinbi: '',
        wujingbi: '',
        shenqisuipian: '',
        ronglian: '',
        yuanzhengbi: '',
        taozhuangsuipian: '',
        rongyu: '', // 竞技荣誉
        jiban: '',
        laxiangbi: '', // 蜡像币
        zhanli: 0, // 战力
        zhuangbeiList: [] // 计算后的，装备列表，用于升级
      },
      laxiangguanInfo: { // 蜡像馆信息
        difficulty: 0,
        level: 0,
        buyTime: 0,
        canAttackTime: 0
      },
      emeFubenInfo: { // 恶魔巢穴信息
        buyjgTimes: 0, // 美女副本购买次数
        jgLevel: 0, // 美女副本级别
        jgTimes: 0, // 美女副本可打次数
        buywlTimes: 0, // 亡灵副本购买次数
        wlLevel: 0, // 亡灵副本级别
        wlTimes: 0, // 亡灵副本可打次数
        buysqTimes: 0, // 恶魔副本购买次数
        sqLevel: 0, // 恶魔副本级别
        sqTimes: 0 // 恶魔副本可打次数
      },
      jjcInfo: {
        jjcTime: 0, // 竞技场剩余次数
        jjcWinTime: 0, // 竞技场胜利次数
        jjcLoseTime: 0, // 竞技场输的次数
        jjcLinkWinTime: 0, // 连胜次数
        todayAttackTimes: 0, // 今天攻击次数
        winIds: [], // 当前返回的列表中已经打赢的角色
        roleList: [], // 竞技场角色信息
        canAttackRole: [] // 可以攻击的角色
      },
      yzmgInfo: { // 远征迷宫信息
        zhenrong: [], // 可以布阵的英雄
        remainTimes: 0, // 剩余次数
        shouldStop: false, // 因为死亡英雄过多，不能开始
        moheZhandou: false, // 魔盒是否遭遇战斗
        lineMaps: [], // 线路图
        pos: 0, // 选择的目标位置
        packetParams: { evtId: 0, param: 9 } // 这里设置为9只是为了和实际值不同
      },
      meiriFubenInfo: {
        buyjinbiTimes: 0, // 金币副本购买次数
        jinbiLevel: 0, // 金币副本级别
        jinbiTimes: 0, // 金币副本可打次数
        buyexpTimes: 0, // 经验副本购买次数
        expLevel: 0, // 经验副本级别
        expTimes: 0, // 经验副本可打次数
        buyjibanTimes: 0, // 羁绊副本购买次数
        jibanLevel: 0, // 羁绊副本级别
        jibanTimes: 0, // 羁绊副本可打次数
        buyronglianTimes: 0, // 熔炼副本购买次数
        ronglianLevel: 0, // 熔炼副本级别
        ronglianTimes: 0, // 熔炼副本可打次数
        buyyaocaiTimes: 0, // 药草副本购买次数
        yaocaiLevel: 0, // 药草副本级别
        yaocaiTimes: 0, // 药草副本可打次数
        buyxuejingshiTimes: 0, // 血精副本购买次数
        xuejingshiLevel: 0, // 血精副本级别
        xuejingshiTimes: 0 // 血精副本可打次数
      },
      shopInfo: { // 夏洛克商店信息
        jinbiShuaXin: 0, // 金币商店刷新价格
        hadBuyJinbi: false, // 金币商店是否已经买了
        wujingShop: [], // 无尽商店
        jingjiShop: [], // 竞技商店
        taozhuangShop: [], // 套装商店
        yuanzhengShop: [], // 远征商店
        emeFuben: [
          { 'text': '美女副本-经验书', 'value': 1 },
          { 'text': '亡灵副本-套装碎片', 'value': 2 },
          { 'text': '恶魔副本-神器碎片', 'value': 3 }
        ],
        meiriFuben: [
          { 'text': '金币副本', 'value': 1 },
          { 'text': '经验副本', 'value': 2 },
          { 'text': '羁绊副本', 'value': 3 },
          { 'text': '熔炼副本', 'value': 4 },
          { 'text': '药材副本', 'value': 5 },
          { 'text': '血精副本', 'value': 6 }
        ]
      },
      taskInfo: { // 每天的各种任务信息
        xuezhanRemainTime: 0, // 血战竞技剩余次数
        bossAttackTime: 0, // 世界BOSS攻击次数
        bossCanAttackTime: 0 // 世界BOSS剩余次数
      },
      buyInfo: {
        laxiangguanBuyTime: 1, // 蜡像馆的购买次数
        wujingId: 0, // 购买无尽商店的物品ID
        jingjiId: 0, // 购买竞技商店的物品ID
        taozhuangId: 0, // 购买套装商店的物品ID
        yuanzhengId: 0, // 购买远征商店的物品ID
        emeFubenType: 1, // 恶魔巢穴副本类型
        meiriFubenType: 1 // 每日副本类型
      },
      flag: {
        loginFlag: false,
        logoutFlag: false,
        tuituFlag: false,
        xiaoguaiFlag: false,
        wujinFlag: false,
        emeFubenFlag: false,
        meiriFubenFlag: false,
        xuezhanjingjiFlag: false,
        laxiangguanFlag: false,
        laxiangguanLowFlag: false,
        shijieBossFlag: false,
        shilianchouFlag: false,
        printJinbiShopLog: true,
        jinbiShopFlag: false,
        jjcFlag: false,
        zbUpdateFlag: false,
        yzmgFlag: false
      },
      attackTime: {
        bossTime: 1,
        xiaoguaiTime: 1,
        wujinTime: 1,
        emeTime: 1,
        meiriTime: 1,
        xuezhanjingjiTime: 1,
        laxiangguanTime: 1,
        laxiangguanLowTime: 1,
        shijieBossTime: 1,
        shilianchouTime: 1,
        zhanliDiscount: 30
      },
      timer: {
        heartBeatTimer: null,
        bossTimer: null,
        xiaoguaiTimer: null,
        wujinTimer: null,
        emeTimer: null,
        meiriTimer: null,
        buyJinbiShopTimerYaocao: null,
        buyJinbiShopTimerHero: null,
        xuezhanjingjiTimer: null,
        guajiXiaoguaiTimer: null,
        laxiangguanTimer: null,
        laxiangguanLowTimer: null,
        laxiangguanBuyTimer: null,
        shijieBossTimer: null,
        shilianchouTimer: null,
        jjcTimer: null,
        zbUpdateTimer: null,
        yzmgTimer: null
      },
      switchFlag: {
        autoGlodShop: false
      },
      logs: [],
      remoteGuajiLog: '',
      userInfo: {
        username: '', // 登录游戏用的，是由平台返回的
        password: 'ljs', // 登录游戏服务器的密码，websocket连接使用
        usernamePlatForm: '', // 平台的用户名
        passwordPlatForm: '', // 平台的密码
        platform: '',
        server: '',
        endTime: '' // 辅助到期时间
      },
      platformOption: [],
      serverObj: {},
      serverOption: []
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
    },
    attackWujinLevelId() {
      return this.roleInfo.wujinLevelId + 1
    },
    jinbiFormat() {
      if (this.roleInfo.jinbi) {
        const jinbi = this.roleInfo.jinbi
        return (jinbi / 100000000).toFixed(2) + '亿'
      } else {
        return ''
      }
    },
    platform() {
      return this.userInfo.platform
    },
    // 蜡像馆难度
    laxiangguanLevel() {
      const difficultyMap = { 1: '初级', 2: '中级', 3: '高级' }
      if (this.laxiangguanInfo.difficulty) {
        return difficultyMap[this.laxiangguanInfo.difficulty] + '难度' + this.laxiangguanInfo.level
      } else {
        return ''
      }
    },
    // 每日副本购买次数
    meiriFubenBuyTimes() {
      const dayNum = parseInt(moment().format('d'))
      const fubenType = { 1: '金币', 2: '经验', 3: '羁绊', 4: '熔炼', 5: '药材', 6: '血精' }
      let res = ''
      if (dayNum === 0) {
        res = '已买金币' + this.meiriFubenInfo.buyjinbiTimes + '次,' +
                    '经验' + this.meiriFubenInfo.buyexpTimes + '次,' +
                    '羁绊' + this.meiriFubenInfo.buyjibanTimes + '次,' +
                    '熔炼' + this.meiriFubenInfo.buyronglianTimes + '次,' +
                    '药草' + this.meiriFubenInfo.buyyaocaiTimes + '次,' +
                    '血精' + this.meiriFubenInfo.buyxuejingshiTimes + '次'
      } else {
        switch (dayNum) {
          case 1:
            res = '已买' + fubenType[dayNum] + this.meiriFubenInfo.buyjinbiTimes + '次'
            break
          case 2:
            res = '已买' + fubenType[dayNum] + this.meiriFubenInfo.buyexpTimes + '次'
            break
          case 3:
            res = '已买' + fubenType[dayNum] + this.meiriFubenInfo.buyjibanTimes + '次'
            break
          case 4:
            res = '已买' + fubenType[dayNum] + this.meiriFubenInfo.buyronglianTimes + '次'
            break
          case 5:
            res = '已买' + fubenType[dayNum] + this.meiriFubenInfo.buyyaocaiTimes + '次'
            break
          case 6:
            res = '已买' + fubenType[dayNum] + this.meiriFubenInfo.buyxuejingshiTimes + '次'
            break
        }
      }
      return res
    },
    // 每日副本挑战次数
    meiriFuebnAttackTimes() {
      const dayNum = parseInt(moment().format('d'))
      const fubenType = { 1: '金币', 2: '经验', 3: '羁绊', 4: '熔炼', 5: '药材', 6: '血精' }
      let res = ''
      if (dayNum === 0) {
        res = '剩余金币' + this.meiriFubenInfo.jinbiTimes + '次,' +
                    '经验' + this.meiriFubenInfo.expTimes + '次,' +
                    '羁绊' + this.meiriFubenInfo.jibanTimes + '次,' +
                    '熔炼' + this.meiriFubenInfo.ronglianTimes + '次,' +
                    '药草' + this.meiriFubenInfo.yaocaiTimes + '次,' +
                    '血精' + this.meiriFubenInfo.xuejingshiTimes + '次'
      } else {
        switch (dayNum) {
          case 1:
            res = '剩余' + fubenType[dayNum] + this.meiriFubenInfo.jinbiTimes + '次'
            break
          case 2:
            res = '剩余' + fubenType[dayNum] + this.meiriFubenInfo.expTimes + '次'
            break
          case 3:
            res = '剩余' + fubenType[dayNum] + this.meiriFubenInfo.jibanTimes + '次'
            break
          case 4:
            res = '剩余' + fubenType[dayNum] + this.meiriFubenInfo.ronglianTimes + '次'
            break
          case 5:
            res = '剩余' + fubenType[dayNum] + this.meiriFubenInfo.yaocaiTimes + '次'
            break
          case 6:
            res = '剩余' + fubenType[dayNum] + this.meiriFubenInfo.xuejingshiTimes + '次'
            break
        }
      }
      return res
    }
  },

  watch: {
    logs(newVal) {
      this.changeGuajiLog(newVal)
      this.scrollToBottom()
    },

    // 当选择平台的时候更新对应的服务器列表
    platform(newVal) {
      this.serverOption = this.serverObj[newVal]
    },

    // 监控各种开关的变化
    switchFlag: {
      handler: function() {
        this.saveSwitchInfo()
      },
      deep: true
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
    this.getServerTime()
    this.getServerInfo()
  },

  methods: {
    ...mapActions('game', [
      'changeGuajiLog'
    ]),

    showHelp() {
      this.show.helpInfo = true
    },

    // 登录平台
    handleLoginPlatForm() {
      this.secretKey = randomWord(false, 16)
      if (!this.userInfo.usernamePlatForm || !this.userInfo.passwordPlatForm) {
        this.$toast('请输入用户名和密码')
        return
      }
      const cipherUsername = CryptoJS.AES.encrypt(this.userInfo.usernamePlatForm, CryptoJS.enc.Utf8.parse(this.secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
      const cipherPwd = CryptoJS.AES.encrypt(this.userInfo.passwordPlatForm, CryptoJS.enc.Utf8.parse(this.secretKey), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString()
      const param = {
        platform: this.userInfo.platform,
        u: cipherUsername, // 用户名
        p: cipherPwd, // 密码
        k: encrypt(this.secretKey) // ase的密钥
      }
      loginPlatform(param).then(res => {
        const resPlain = CryptoJS.AES.decrypt(res, CryptoJS.enc.Utf8.parse(this.secretKey), {
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8)
        // console.log('resPlain', resPlain)
        const resObj = JSON.parse(resPlain)
        if (resObj.r === 401) {
          this.$toast.fail('用户名密码错误')
          return
        } else if (resObj.r === 403) {
          this.$toast.fail('辅助时间到期，请充值后登录！')
          return
        } else if (resObj.r === 200) {
          if (resObj.l === 0) {
            this.userRole.free = true
          } else if (resObj.l === 1) {
            this.userRole.normal = true
          } else if (resObj.l === 2) {
            this.userRole.normal = true
            this.userRole.v = true
          } else if (resObj.l === 3) {
            this.userRole.normal = true
            this.userRole.v = true
            this.userRole.h = true
          } else if (resObj.l === 4) {
            this.userRole.normal = true
            this.userRole.v = true
            this.userRole.h = true
            this.userRole.vh = true
          } else if (resObj.l === 9) {
            this.userRole.normal = true
            this.userRole.v = true
            this.userRole.h = true
            this.userRole.vh = true
            this.userRole.sv = true
          }
          this.userRole.userLevelId = resObj.l
          this.userInfo.endTime = moment(resObj.t * 1000).format('YYYY-MM-DD HH:mm:ss')
          this.userInfo.username = resObj.i
          if (resObj.g === 1) {
            this.userRole.goldShop = true
          }
          if (resObj.s === 1) {
            this.userRole.otherShop = true
          }
          this.saveLogInfo()
          this.handleGetGuajiStatus()
          this.initWebSocket()
        }
      }).catch(err => {
        console.log(err)
      })
    },

    // 开始云挂机
    handleStartguaji() {
      const base64Server = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this.userInfo.server))
      const base64Username = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this.userInfo.username))
      const params = {
        server: base64Server,
        id: base64Username
      }
      startGuaji(params).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.$toast({ duration: 1000, message: '挂机成功' })
            break
          case 401:
            this.$toast({ duration: 1000, message: '用户名密码错误' })
            break
          case 403:
            this.$toast({ duration: 1000, message: '只有VIP用户才能云挂机' })
            break
          case 404:
            this.$toast({ duration: 1000, message: '云端错误，请联系管理员' })
            break
          case 500:
            this.$toast({ duration: 1000, message: '请求有误，请联系管理员' })
            break
        }
        this.handleGetGuajiStatus()
      })
    },

    // 停止云挂机
    handleStopguaji() {
      const base64Username = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this.userInfo.username))
      const base64Password = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this.userInfo.passwordPlatForm))
      const params = {
        id: base64Username,
        pass: base64Password
      }
      stopGuaji(params).then(res => {
        const code = res.code
        switch (code) {
          case 200:
            this.$toast({ duration: 1000, message: '停止挂机成功' })
            break
          case 401:
            this.$toast({ duration: 1000, message: '用户名密码错误' })
            break
          case 403:
            this.$toast({ duration: 1000, message: '只有VIP用户才能云挂机' })
            break
          case 404:
            this.$toast({ duration: 1000, message: '云端错误，请联系管理员' })
            break
          case 500:
            this.$toast({ duration: 1000, message: '请求有误，请联系管理员' })
            break
        }
        this.handleGetGuajiStatus()
      })
    },

    // 查询挂机日志
    async handleGetGuajiLog() {
      const base64Username = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this.userInfo.username))
      const params = {
        id: base64Username
      }
      const res = await getGuajiLog(params)
      this.remoteGuajiLog = res
      this.show.remoteGuajiLog = true
    },

    // 查询挂机状态
    async handleGetGuajiStatus() {
      const base64Username = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(this.userInfo.username))
      const params = {
        id: base64Username
      }
      const res = await getGuajiStatus(params) // 0表示停止，1表示开启
      if (res === 1) {
        this.yunguaji = true
      } else {
        this.yunguaji = false
      }
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
        this.handleGetGuajiStatus()
      }
    },

    // 存储登录信息到LocalStorage
    saveLogInfo() {
      const gameLoginInfo = {
        platform: this.userInfo.platform,
        server: this.userInfo.server,
        usernamePlatForm: this.userInfo.usernamePlatForm,
        passwordPlatForm: this.userInfo.passwordPlatForm,
        username: this.userInfo.username
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

    // 让日志框的滚动条一直在底部
    scrollToBottom: function() {
      this.$nextTick(function() {
        const div = document.getElementById('log-textarea')
        div.scrollTop = div.scrollHeight
      })
    },

    // 获取服务器时间用于校对
    getServerTime() {
      axios.get(this.url.serverTimeUrl).then(res => {
        const serverTime = res.data.serverTime
        const localTime = new Date().getTime()
        this.timeDiff = serverTime - localTime
      })
    },

    // 获取服务器信息
    async getServerInfo() {
      const res = await getServer()
      this.platformOption = res.platform
      this.serverObj = res.server
      this.loadLoginInfo()
    },

    // 选择平台
    changePlatform(platForm) {
      this.serverOption = this.serverObj[platForm]
      this.userInfo.server = this.serverOption[0]['value']
    },

    login(username, password) {
    },

    logout() {
      this.flag.logoutFlag = true
      this.recordLogs('退出登录')
      this.websock.close()
    },

    handleLogout() {
      for (const key in this.timer) {
        clearInterval(this.timer[key])
      }
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
</style>

<style lang='scss' scoped>
.row-wrap {
  margin: 10px 0;
}
.input-wrap {
  border: solid 1px #ebedf0;
}
textarea {
  width: 100%;
  margin-bottom: 50px;
  padding-bottom: 30px;
}
.left {
  text-align: start;
}
.left-padding {
  padding-left: 10px;
}
.right {
  text-align: end;
}
.center {
  text-align: center;
}
.vip-wrap {
  text-align: center;
}
.endtiem-wrap {
  margin-top: 15px;
}
.tansuo-item {
  line-height: 16px;
}

</style>
