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
          <span>古代战争火箭辅助</span>
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

      <div class="endtiem-wrap">
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
          <span>角色：</span>
          <span>{{ roleInfo.name }}</span>
        </van-col>
        <van-col span="8">
          <span>等级：</span>
          <span>{{ roleInfo.level }}</span>
        </van-col>
        <van-col span="8">
          <span>推图关卡：</span>
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
          <span>无尽关卡：</span>
          <span>{{ roleInfo.wujinLevelId }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>金币：</span>
          <span>{{ jinbiFormat }}</span>
        </van-col>
        <van-col span="8">
          <span>无尽币：</span>
          <span>{{ roleInfo.wujingbi }}</span>
        </van-col>
        <van-col span="8">
          <span>神器碎片：</span>
          <span>{{ roleInfo.shenqisuipian }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>熔炼：</span>
          <span>{{ roleInfo.ronglian }}</span>
        </van-col>
        <van-col span="8">
          <span>远征币：</span>
          <span>{{ roleInfo.yuanzhengbi }}</span>
        </van-col>
        <van-col span="8">
          <span>套装碎片：</span>
          <span>{{ roleInfo.taozhuangsuipian }}</span>
        </van-col>
      </van-row>
      <van-row class="row-wrap">
        <van-col span="8">
          <span>羁绊：</span>
          <span>{{ roleInfo.jiban }}</span>
        </van-col>
        <van-col span="8">
          <span>竞技币：</span>
          <span>{{ roleInfo.rongyu }}</span>
        </van-col>
        <van-col span="8">
          <span>蜡像币：</span>
          <span>{{ roleInfo.laxiangbi }}</span>
        </van-col>
      </van-row>

      <van-divider>挂机设置</van-divider>
      <van-tabs v-model="tabActive" type="card" color="#1989fa">
        <van-tab title="挑战">
          <van-row class="row-wrap" type="flex" align="center">
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
          <van-row class="row-wrap" type="flex" align="center">
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
          <van-row class="row-wrap" type="flex" align="center">
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
          <van-row class="row-wrap" type="flex" align="center">
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
        </van-tab>

        <van-tab title="购买">
          <van-row v-if="userRole.goldShop" class="row-wrap" type="flex" align="center">
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

          <van-row v-if="userRole.otherShop" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>无尽商店</div>
            </van-col>
            <van-col span="8" class="center">
              <van-dropdown-menu>
                <van-dropdown-item v-model="buyInfo.wujingId" :options="shopInfo.wujingShop" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="buyWujingShop">购买</van-button>
            </van-col>
          </van-row>

          <van-row v-if="userRole.otherShop" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>竞技商店</div>
            </van-col>
            <van-col span="8" class="center">
              <van-dropdown-menu>
                <van-dropdown-item v-model="buyInfo.jingjiId" :options="shopInfo.jingjiShop" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="buyJingjiShop">购买</van-button>
            </van-col>
          </van-row>

          <van-row v-if="userRole.otherShop" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>套装商店</div>
            </van-col>
            <van-col span="8" class="center">
              <van-dropdown-menu>
                <van-dropdown-item v-model="buyInfo.taozhuangId" :options="shopInfo.taozhuangShop" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="buyTaozhuangShop">购买</van-button>
            </van-col>
          </van-row>

          <van-row v-if="userRole.otherShop" class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>远征商店</div>
            </van-col>
            <van-col span="8" class="center">
              <van-dropdown-menu>
                <van-dropdown-item v-model="buyInfo.yuanzhengId" :options="shopInfo.yuanzhengShop" />
              </van-dropdown-menu>
            </van-col>
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="buyYuanzhengShop">购买</van-button>
            </van-col>
          </van-row>
        </van-tab>

        <van-tab title="扫荡">
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>每日副本</div>
            </van-col>
            <van-col span="8" class="center" />
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="saodangMeiriFuben">扫荡</van-button>
            </van-col>
          </van-row>
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>无尽炼狱</div>
            </van-col>
            <van-col span="8" class="center" />
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="saodangWujin">扫荡</van-button>
            </van-col>
          </van-row>
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>恶魔巢穴</div>
            </van-col>
            <van-col span="8" class="center" />
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="saodangEme">扫荡</van-button>
            </van-col>
          </van-row>
          <van-row class="row-wrap" type="flex" align="center">
            <van-col span="8">
              <div>蜡像馆</div>
            </van-col>
            <van-col span="8" class="center" />
            <van-col span="8" class="right">
              <van-button type="info" size="small" @click="saodangLaxiangguan">扫荡</van-button>
            </van-col>
          </van-row>
        </van-tab>

        <van-tab title="攻略">
          <GongLue />
        </van-tab>
      </van-tabs>

      <van-divider>
        <van-button type="default" size="small" @click="clearLog">清理日志</van-button>
      </van-divider>
      <textarea id="log-textarea" v-model="guajiLog" rows="20" readonly />
    </div>
  </div>
</template>

<script>
import SHA1 from 'js-sha1'
import axios from 'axios'
import moment from 'moment'
import CryptoJS from 'crypto-js'
import { encrypt, randomWord } from '@/utils/rsa'
import { mapGetters, mapActions } from 'vuex'
import { getGameLoginInfo, setGameLoginInfo } from '@/utils/auth'
import { wujin, boss, meiriFuben, emeFuben, guaji, jinbiShop, hadBuyInfo } from '@/utils/response-parse'
import { xuezhan, shijieboss, laxiangguanTaskReward, laxiangguan, shilianchou } from '@/utils/response-parse'
import { loginPlatform, getServer, startGuaji, stopGuaji, getGuajiLog, getGuajiStatus } from '@/api/game'
import { getWujingShop, getJingjiShop, getTaozhuangShop, getYuanzhengShop } from '@/api/game'
import Header from '@/components/Header'
import Help from './components/Help'
import GongLue from './components/GongLue'
export default {

  components: {
    Header,
    Help,
    GongLue
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
      tabActive: 0, // Tab默认页面
      userRole: { // 用户类型
        v: false, // vip版本
        h: false, // 黑科技
        vh: false, // 黑科技+vip
        userLevelId: 1, // 1:普通用户，2：云挂机，3：黑科技，4：云挂机+黑科技
        goldShop: false, // 是否显示金币商店
        otherShop: false // 其他商店跨等级买东西
      },
      show: {
        helpInfo: false,
        remoteGuajiLog: false
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
        laxiangbi: '' // 蜡像币
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
        tuituFlag: false,
        wujinFlag: false,
        emeFubenFlag: false,
        meiriFubenFlag: false,
        xuezhanjingjiFlag: false,
        laxiangguanFlag: false,
        laxiangguanLowFlag: false,
        shijieBossFlag: false,
        shilianchouFlag: false
      },
      attackTime: {
        bossTime: 1,
        wujinTime: 1,
        emeTime: 1,
        meiriTime: 1,
        xuezhanjingjiTime: 1,
        laxiangguanTime: 1,
        laxiangguanLowTime: 1,
        shijieBossTime: 1,
        shilianchouTime: 1
      },
      timer: {
        heartBeatTimer: null,
        bossTimer: null,
        wujinTimer: null,
        emeTimer: null,
        meiriTimer: null,
        buyJinbiShopTimerYaocao: null,
        buyJinbiShopTimerHero: null,
        xuezhanjingjiTimer: null,
        attackXiaoguaiTimer: null,
        laxiangguanTimer: null,
        laxiangguanLowTimer: null,
        laxiangguanBuyTimer: null,
        shijieBossTimer: null,
        shilianchouTimer: null
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
    this.handleGetWujingShop()
    this.handleGetJingjiShop()
    this.handleGetTaozhuangShop()
    this.handleGetYuanzhengShop()
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
          if (resObj.l === 2) {
            this.userRole.v = true
          } else if (resObj.l === 3) {
            this.userRole.v = true
            this.userRole.h = true
          } else if (resObj.l === 4) {
            this.userRole.v = true
            this.userRole.h = true
            this.userRole.vh = true
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

    // 获取无尽商店信息
    async handleGetWujingShop() {
      this.shopInfo.wujingShop = await getWujingShop()
    },

    // 获取竞技商店信息
    async handleGetJingjiShop() {
      this.shopInfo.jingjiShop = await getJingjiShop()
    },

    // 获取套装商店信息
    async handleGetTaozhuangShop() {
      this.shopInfo.taozhuangShop = await getTaozhuangShop()
    },

    // 获取远征商店信息
    async handleGetYuanzhengShop() {
      this.shopInfo.yuanzhengShop = await getYuanzhengShop()
    },

    // 选择平台
    changePlatform(platForm) {
      this.serverOption = this.serverObj[platForm]
      this.userInfo.server = this.serverOption[0]['value']
    },

    genKey() {
      // const keytime = Date.parse(new Date()) / 1000
      const localTime = new Date().getTime()
      const correctTime = localTime + this.timeDiff
      const keytime = parseInt(correctTime / 1000)
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
      if (!this.userInfo.username) {
        this.$toast('没获取到登录用户ID')
        return
      }
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
      this.$toast('登录成功')
      this.flag.loginFlag = true
      this.login(this.userInfo.username, this.userInfo.password)
    },
    websocketonerror(e) { // 错误
      console.log('WebSocket连接发生错误')
      this.recordLogs('连接发生错误')
    },
    websocketonmessage(e) { // 数据接收
      const redata = JSON.parse(e.data)
      // console.log('response', redata)
      if (redata.pd === 1000) {
        this.roleInfo.name = redata.roleName
      }
      if (redata.pd === 1001) {
        this.roleInfo.levelId = redata.k
        this.roleInfo.level = redata.h
        this.roleInfo.zuanshi = redata.f
        this.roleInfo.xuejing = redata.xuejing
        this.roleInfo.jinbi = redata.g
        this.roleInfo.wujingbi = redata.wujingbi
        this.roleInfo.shenqisuipian = redata.shenqiSuiPian
        this.roleInfo.ronglian = redata.ronglian
        this.roleInfo.yuanzhengbi = redata.yuanzhengBi
        this.roleInfo.taozhuangsuipian = redata.tzSuiPian
        this.roleInfo.rongyu = redata.rongyu
        this.roleInfo.jiban = redata.jiban
        this.roleInfo.laxiangbi = redata.o
        // this.recordLogs('当前经验：' + redata.i)
      }
      if (redata.pd === 1008) {
        this.roleInfo.levelId = redata.openLevel
      }

      if (redata.pd === 1023) { // 世界BOSS攻击次数
        this.taskInfo.bossAttackTime = redata.todayAttackTimes
        this.taskInfo.bossCanAttackTime = 3 - redata.todayAttackTimes
      }

      // 商店信息
      if (redata.pd === 1052) {
        this.shopInfo.jinbiShuaXin = redata.jinbiShuaXin
        this.shopInfo.hadBuyJinbi = hadBuyInfo(redata).hadBuyJinbi
      }

      // 每日副本信息
      if (redata.pd === 1079) {
        this.meiriFubenInfo.buyjinbiTimes = redata.buyjinbiTimes
        this.meiriFubenInfo.jinbiLevel = redata.jinbiLevel
        this.meiriFubenInfo.jinbiTimes = redata.jinbiTimes
        this.meiriFubenInfo.buyexpTimes = redata.buyexpTimes
        this.meiriFubenInfo.expLevel = redata.expLevel
        this.meiriFubenInfo.expTimes = redata.expTimes
        this.meiriFubenInfo.buyjibanTimes = redata.buyjibanTimes
        this.meiriFubenInfo.jibanLevel = redata.jibanLevel
        this.meiriFubenInfo.jibanTimes = redata.jibanTimes
        this.meiriFubenInfo.buyronglianTimes = redata.buyzuanshiTimes
        this.meiriFubenInfo.ronglianLevel = redata.zuanshiLevel
        this.meiriFubenInfo.ronglianTimes = redata.zuanshiTimes
        this.meiriFubenInfo.buyyaocaiTimes = redata.buyyaocaiTimes
        this.meiriFubenInfo.yaocaiLevel = redata.yaocaiLevel
        this.meiriFubenInfo.yaocaiTimes = redata.yaocaiTimes
        this.meiriFubenInfo.buyxuejingshiTimes = redata.buyxuejingshiTimes
        this.meiriFubenInfo.xuejingshiLevel = redata.xuejingshiLevel
        this.meiriFubenInfo.xuejingshiTimes = redata.xuejingshiTimes
      }

      // 无尽炼狱信息
      if (redata.pd === 1080) {
        this.roleInfo.wujinLevelId = redata.level
      }

      // 恶魔巢穴信息
      if (redata.pd === 1088) {
        this.emeFubenInfo.buyjgTimes = redata.buyjgTimes
        this.emeFubenInfo.jgLevel = redata.jgLevel
        this.emeFubenInfo.jgTimes = redata.jgTimes
        this.emeFubenInfo.buywlTimes = redata.buywlTimes
        this.emeFubenInfo.wlLevel = redata.wlLevel
        this.emeFubenInfo.wlTimes = redata.wlTimes
        this.emeFubenInfo.buysqTimes = redata.buysqTimes
        this.emeFubenInfo.sqLevel = redata.sqLevel
        this.emeFubenInfo.sqTimes = redata.sqTimes
      }

      // 蜡像馆信息
      if (redata.pd === 1093) {
        this.laxiangguanInfo.difficulty = redata.difficulty
        this.laxiangguanInfo.level = redata.level
        this.laxiangguanInfo.buyTime = redata.buyTime
        this.laxiangguanInfo.canAttackTime = redata.canAttackTime
      }

      // 血战竞技信息
      if (redata.pd === 1100) {
        this.taskInfo.xuezhanRemainTime = redata.battleTime
      }

      // 恶魔巢穴难度等信息
      // if (redata.pd === 1088) {
      //   const log = parse.emmFubenInfo(redata)
      //   this.recordLogs(log)
      // }

      // const nolog_list = [1005, 1011, 1085]
      // if (nolog_list.indexOf(redata.pd) === -1) {
      //   console.log('responses', redata)
      // }

      // 攻击结果
      if (redata.pd === 1004) {
        const d = redata.d
        let log = ''
        switch (d) {
          case 5:
            log = boss(redata) // 推图结果
            this.recordLogs(log)
            break
          case 6:
            log = shilianchou(redata) // 十连抽结果
            this.recordLogs(log)
            break
          case 7:
            log = xuezhan(redata) // 血战领奖
            this.recordLogs(log)
            break
          case 10:
            log = shijieboss(redata) // 世界BOSS结果
            this.recordLogs(log)
            break
          case 16:
            log = laxiangguanTaskReward(redata) // 蜡像馆任务奖励
            this.recordLogs(log)
            break
          case 17:
            log = guaji(redata) // 挂机信息
            this.recordLogs(log)
            break
          case 243:
            log = meiriFuben(redata) // 每日副本
            this.recordLogs(log)
            break
          case 244:
            log = wujin(redata) // 无尽结果
            this.recordLogs(log)
            break
          case 259:
            log = emeFuben(redata) // 恶魔巢穴
            this.recordLogs(log)
            break
          case 264:
            log = laxiangguan(redata) // 蜡像馆获得
            this.recordLogs(log)
            break
        }
      }
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
      this.websocketsend(this.gen_base_json(-1))
      // 第一个包
      const login_packet = this.gen_base_json(0)
      login_packet.userName = username
      login_packet.password = password
      login_packet.plat = 0
      if (/^mao.*bu$/.test(username)) {
        login_packet.youke = true
      } else {
        login_packet.youke = false
      }
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
      setTimeout(function() { self.sendGeneric() }, 950)
      if (this.userRole.userLevelId <= 2) {
        setTimeout(function() { self.fuben(0, 5, 0) }, 990) // 发这个包就会进行上线确认
      }
      this.timer.heartBeatTimer = setInterval(function() { self.websocketsend(self.gen_base_json(-1)) }, 10090)
      // this.timer.attackXiaoguaiTimer = setInterval(function() { self.fuben(self.roleInfo.levelId, 1, 1) }, 10590)
    },

    logout() {
      this.recordLogs('退出登录')
      clearInterval(this.timer.heartBeatTimer)
      // clearInterval(this.timer.attackXiaoguaiTimer)
      this.websock.close()
      this.flag.loginFlag = false
      this.pIn = 0
    },

    // 记录日志
    recordLogs(log) {
      // const d = new Date().toLocaleString()
      const d = moment().format('YYYY-MM-DD HH:mm:ss')
      if (this.logs.length > 1000) {
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

    checkLoginStatus() {
      if (this.flag.loginFlag) {
        return true
      } else {
        this.$toast.fail({ duration: 1000, message: '请先登录' })
        return false
      }
    },

    startFubenBoss() {
      if (!this.checkLoginStatus()) return
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
    sendWujin(operate) {
      const wujinPacket = this.gen_base_json(244)
      wujinPacket.operate = operate
      this.websocketsend(wujinPacket)
      if (operate === 2) {
        this.sendGeneric()
      } else if (operate === 3) {
        this.recordLogs('扫荡无尽炼狱')
      }
    },

    // 扫荡无尽炼狱
    saodangWujin() {
      if (!this.checkLoginStatus()) return
      this.sendWujin(3)
    },

    // 开始无尽炼狱
    startWujin() {
      if (!this.checkLoginStatus()) return
      if (this.roleInfo.wujinLevelId === 0) {
        this.sendWujin(2)
        this.$toast.fail('等待获取当前关卡信息')
        return
      }
      this.flag.wujinFlag = true
      let i = 1
      const wujinTime = this.attackTime.wujinTime
      const self = this
      self.timer.wujinTimer = setInterval(function() {
        self.recordLogs('挑战无尽炼狱第' + self.attackWujinLevelId + '关')
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

    /**
     * 恶魔副本发包
     * @param {Number} operate 1为购买, 2为挑战
     * @param {Number} fbType 1: '美女副本', 2: '亡灵副本', 3: '恶魔副本'
     */
    sendEme(fbType, operate) {
      const fubenType = { 1: '美女副本', 2: '亡灵副本', 3: '恶魔副本' }
      const emePacket = this.gen_base_json(259)
      emePacket.operate = operate
      emePacket.fbType = fbType
      this.websocketsend(emePacket)
      if (operate === 2) {
        this.sendGeneric()
        this.recordLogs('挑战恶魔巢穴-' + fubenType[fbType])
      } else if (operate === 1) {
        this.recordLogs('购买恶魔巢穴-' + fubenType[fbType] + '一次')
      } else if (operate === 4) {
        this.recordLogs('扫荡恶魔巢穴')
      }
    },

    // 购买恶魔巢穴
    buyEme(fbType) {
      if (!this.checkLoginStatus()) return
      if (fbType === 1 && this.emeFubenInfo.buyjgTimes === 3) {
        this.$toast.fail('美女副本已经购买3次')
        return
      }
      if (fbType === 2 && this.emeFubenInfo.buywlTimes === 3) {
        this.$toast.fail('亡灵副本已经购买3次')
        return
      }
      if (fbType === 3 && this.emeFubenInfo.buysqTimes === 3) {
        this.$toast.fail('恶魔副本已经购买3次')
        return
      }
      this.sendEme(fbType, 1)
    },

    // 扫荡恶魔巢穴
    saodangEme() {
      if (!this.checkLoginStatus()) return
      this.sendEme(0, 4)
    },

    // 开始恶魔巢穴
    startEme() {
      if (!this.checkLoginStatus()) return
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

    // 停止恶魔巢穴
    stopEme() {
      clearInterval(this.timer.emeTimer)
      this.flag.emeFubenFlag = false
      this.recordLogs('停止恶魔副本')
    },

    /**
     * 每日副本发包
     * @param {Number} operate 1为购买, 2为挑战,3为单次扫荡，4为全部扫荡
     * @param {Number} fbType 1: '金币副本', 2: '经验副本', 3: '羁绊副本', 4: '熔炼副本', 5: '药材副本', 6: '血精石副本'
     */
    sendMeiriFuben(fbType, operate) {
      const fubenType = { 1: '金币副本', 2: '经验副本', 3: '羁绊副本', 4: '熔炼副本', 5: '药材副本', 6: '血精石副本' }
      const meiriPacket = this.gen_base_json(243)
      meiriPacket.operate = operate
      meiriPacket.fbType = fbType
      this.websocketsend(meiriPacket)
      if (operate === 2) {
        this.sendGeneric()
        this.recordLogs('挑战每日副本-' + fubenType[fbType])
      } else if (operate === 1) {
        this.recordLogs('购买每日副本-' + fubenType[fbType] + '一次')
      } else if (operate === 4) {
        this.recordLogs('扫荡每日副本')
      }
    },

    // 购买每日副本
    buyMeiriFuben(fbType) {
      if (!this.checkLoginStatus()) return
      const dayNum = parseInt(moment().format('d'))
      if (dayNum !== 0) {
        if (dayNum !== fbType) {
          this.$toast.fail('今日不能挑战该副本')
          return
        }
      }
      if (fbType === 1 && this.meiriFubenInfo.buyjinbiTimes === 3) {
        this.$toast.fail('金币副本已经购买3次')
        return
      }
      if (fbType === 2 && this.meiriFubenInfo.buyexpTimes === 3) {
        this.$toast.fail('经验副本已经购买3次')
        return
      }
      if (fbType === 3 && this.meiriFubenInfo.buyjibanTimes === 3) {
        this.$toast.fail('羁绊副本已经购买3次')
        return
      }
      if (fbType === 4 && this.meiriFubenInfo.buyronglianTimes === 3) {
        this.$toast.fail('熔炼副本已经购买3次')
        return
      }
      if (fbType === 5 && this.meiriFubenInfo.buyyaocaiTimes === 3) {
        this.$toast.fail('药材副本已经购买3次')
        return
      }
      if (fbType === 6 && this.meiriFubenInfo.buyxuejingshiTimes === 3) {
        this.$toast.fail('血精石副本已经购买3次')
        return
      }
      this.sendMeiriFuben(fbType, 1)
    },

    // 扫荡每日副本
    saodangMeiriFuben() {
      if (!this.checkLoginStatus()) return
      const dayNum = parseInt(moment().format('d'))
      if (dayNum !== 0) {
        this.sendMeiriFuben(dayNum, 4)
      } else {
        this.sendMeiriFuben(1, 4)
        setTimeout(function() { this.sendMeiriFuben(2, 4) }, 100)
        setTimeout(function() { this.sendMeiriFuben(3, 4) }, 200)
        setTimeout(function() { this.sendMeiriFuben(4, 4) }, 300)
        setTimeout(function() { this.sendMeiriFuben(5, 4) }, 400)
        setTimeout(function() { this.sendMeiriFuben(6, 4) }, 500)
      }
    },

    // 开始每日副本
    startMeiriFuben() {
      if (!this.checkLoginStatus()) return
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
      if (operate === 1) {
        this.recordLogs('购买商品:' + jinbiShop(id) + '*' + num)
      }
    },
    flushShop() {
      this.sendJinbiShop(2, 0, 0)
    },
    buyAll() {
      if (!this.checkLoginStatus()) return
      if (this.shopInfo.hadBuyJinbi) {
        this.$toast.fail({ duration: 1000, message: '已经购买过了，可以刷新后购买' })
        return
      }
      let i = 101
      this.sendJinbiShop(0, 0, 0) // 获取商品信息
      const self = this
      self.timer.buyJinbiShopTimerHero = setInterval(function() {
        if (i > 115) {
          clearInterval(self.timer.buyJinbiShopTimerHero)
        } else if (i > 110) {
          self.sendJinbiShop(1, i, 5)
        } else {
          self.sendJinbiShop(1, i, 1)
        }
        i++
      }, 100)
      // let h = 110
      // self.timer.buyJinbiShopTimerYaocao = setInterval(function() {
      //   console.log('h', h)
      //   if (h > 114) {
      //     console.log('stop-h', h)
      //     clearInterval(self.timer.buyJinbiShopTimerYaocao)
      //   } else {
      //     console.log('buy-h', h)
      //     setTimeout(function() { self.sendJinbiShop(1, h, 1) }, 100)
      //     setTimeout(function() { self.sendJinbiShop(1, h, 1) }, 200)
      //     setTimeout(function() { self.sendJinbiShop(1, h, 1) }, 300)
      //     setTimeout(function() { self.sendJinbiShop(1, h, 1) }, 400)
      //     setTimeout(function() { self.sendJinbiShop(1, h, 1) }, 500)
      //   }
      //   h++
      // }, 1000)
    },

    /**
     * 血战竞技发包
     * @param {Number} operate 1为挑战, 2为领奖
     */
    sendXuezhan(operate) {
      const xuezhanPacket = this.gen_base_json(270)
      xuezhanPacket.operate = operate
      xuezhanPacket.nowState = 0
      this.websocketsend(xuezhanPacket)
      if (operate === 1) {
        this.sendGeneric()
        this.recordLogs('挑战血战竞技')
      }
    },

    // 开始血战竞技
    startXuezhan() {
      if (!this.checkLoginStatus()) return
      if (this.taskInfo.xuezhanRemainTime === 0) {
        this.$toast.fail('血战竞技没次数了')
        return
      }
      const dayNum = parseInt(moment().format('d'))
      if (dayNum === 6 || dayNum === 0) {
        this.$toast.fail('今天不能打血战竞技')
        return
      }
      if (dayNum === 5) {
        const todayThreeClock = new Date(new Date().toLocaleDateString()).getTime() + 15 * 60 * 60 * 1000 // 当天15点的时间戳
        const nowTimeStamp = Date.now()
        if (nowTimeStamp >= todayThreeClock) {
          this.$toast.fail('现在不能打血战竞技')
          return
        }
      }
      this.flag.xuezhanjingjiFlag = true
      let i = 1
      const xuezhanTime = this.attackTime.xuezhanjingjiTime
      const self = this
      self.timer.xuezhanjingjiTimer = setInterval(function() {
        self.sendXuezhan(1)
        i++
        if (self.taskInfo.xuezhanRemainTime === 1) {
          self.sendXuezhan(2)
        }
        if (i > xuezhanTime) {
          self.stopXuezhan()
        }
      }, 1000)
    },

    // 停止血战竞技
    stopXuezhan() {
      clearInterval(this.timer.xuezhanjingjiTimer)
      this.flag.xuezhanjingjiFlag = false
      this.recordLogs('停止挑战血战竞技')
    },

    /**
     * 蜡像馆发包
     * @param {Number} difficulty 难度
     * @param {Number} operate 1为购买, 2为挑战，3为领奖，4为扫荡
     * @param {Number} level 级别
     * @param {Number} taskId 2为领奖，购买，挑战，扫荡都为0
     */
    sendLaxiangguan(difficulty, operate, level, taskId) {
      const lxgPacket = this.gen_base_json(264)
      lxgPacket.difficulty = difficulty
      lxgPacket.operate = operate
      lxgPacket.level = level
      lxgPacket.taskId = taskId
      this.websocketsend(lxgPacket)
      this.sendGeneric()
      if (operate === 1) {
        this.recordLogs('购买蜡像馆1次')
      } else if (operate === 2) {
        this.recordLogs('挑战蜡像馆')
      } else if (operate === 3) {
        this.recordLogs('领取蜡像馆任务奖励')
      } else if (operate === 4) {
        this.recordLogs('扫荡蜡像馆')
      }
    },

    // 扫荡蜡像馆
    saodangLaxiangguan() {
      if (!this.checkLoginStatus()) return
      this.sendLaxiangguan(0, 4, 0, 0)
      setTimeout(function() { this.sendLaxiangguan(0, 3, 0, 1) }, 1000)
      setTimeout(function() { this.sendLaxiangguan(0, 3, 0, 2) }, 1100)
      setTimeout(function() { this.sendLaxiangguan(0, 3, 0, 3) }, 1200)
      setTimeout(function() { this.sendLaxiangguan(0, 3, 0, 4) }, 1300)
      setTimeout(function() { this.sendLaxiangguan(0, 3, 0, 5) }, 1400)
      setTimeout(function() { this.sendLaxiangguan(0, 3, 0, 6) }, 1500)
    },

    // 开始蜡像馆
    startLaxiangguan() {
      if (!this.checkLoginStatus()) return
      if (this.laxiangguanInfo.canAttackTime === 0) {
        this.$toast.fail('蜡像馆没次数了')
        return
      }
      this.flag.laxiangguanFlag = true
      let i = 1
      const lxgTime = this.attackTime.laxiangguanTime
      const self = this
      self.timer.laxiangguanTimer = setInterval(function() {
        self.sendLaxiangguan(self.laxiangguanInfo.difficulty, 2, self.laxiangguanInfo.level, 0)
        i++
        if (i > lxgTime) {
          self.stopLaxiangguan()
        }
      }, 1000)
    },

    // 开始蜡像馆低一级
    startLaxiangguanLow() {
      if (!this.checkLoginStatus()) return
      if (this.laxiangguanInfo.canAttackTime === 0) {
        this.$toast.fail('蜡像馆没次数了')
        return
      }
      this.flag.laxiangguanLowFlag = true
      let i = 1
      const lxgTime = this.attackTime.laxiangguanLowTime
      const self = this
      self.timer.laxiangguanLowTimer = setInterval(function() {
        self.sendLaxiangguan(self.laxiangguanInfo.difficulty, 2, self.laxiangguanInfo.level - 1, 0)
        i++
        if (i > lxgTime) {
          self.stopLaxiangguanLow()
        }
      }, 1000)
    },

    // 停止蜡像馆
    stopLaxiangguan() {
      clearInterval(this.timer.laxiangguanTimer)
      this.flag.laxiangguanFlag = false
      this.recordLogs('停止挑战蜡像馆')
    },

    // 停止蜡像馆低一级
    stopLaxiangguanLow() {
      clearInterval(this.timer.laxiangguanLowTimer)
      this.flag.laxiangguanLowFlag = false
      this.recordLogs('停止挑战蜡像馆')
    },

    // 购买蜡像馆次数
    buyLaxiangguan() {
      if (!this.checkLoginStatus()) return
      if (this.laxiangguanInfo.buyTime === 3) {
        this.$toast.fail('蜡像馆已经购买3次')
        return
      }
      let i = 1
      const lxgBuyTime = this.buyInfo.laxiangguanBuyTime
      const self = this
      self.timer.laxiangguanBuyTimer = setInterval(function() {
        self.sendLaxiangguan(0, 1, 0, 0)
        i++
        if (i > lxgBuyTime) {
          clearInterval(self.timer.laxiangguanBuyTimer)
        }
      }, 500)
    },

    /**
     * 商店购买发包
     * @param {Number} operate 0为获取信息，1为购买, 2为刷新，这里固定为1
     * @param {Number} id 购买的商品
     * @param {String} name 购买的商品名称
     * @param {Number} num 购买的数量，不购买的操作num为0，这里固定为1
     */
    sendOtherShop(id, name) {
      if (id === 0) {
        this.$toast.fail({ duration: 1000, message: '请选择购买商品' })
        return
      }
      this.$dialog.confirm({
        title: '',
        message: '确认购买 ' + name + '?'
      }).then(() => {
        const packet = this.gen_base_json(32)
        packet.id = id
        packet.operate = 1
        packet.num = 1
        // console.log(packet)
        this.websocketsend(packet)
        this.recordLogs('购买商品: ' + name)
      }).catch(() => {
        // on cancel
      })
    },

    // 根据ID解析商品名称
    getNameById(array, id) {
      const res = {
        name: ''
      }
      for (let i = 0; i < array.length; i++) {
        const value = array[i].value
        if (value === id) {
          res.name = array[i].text
          break
        }
      }
      return res.name
    },

    // 购买无尽商店
    buyWujingShop() {
      if (!this.checkLoginStatus()) return
      const name = this.getNameById(this.shopInfo.wujingShop, this.buyInfo.wujingId)
      this.sendOtherShop(this.buyInfo.wujingId, name)
    },

    // 购买竞技商店
    buyJingjiShop() {
      if (!this.checkLoginStatus()) return
      const name = this.getNameById(this.shopInfo.jingjiShop, this.buyInfo.jingjiId)
      this.sendOtherShop(this.buyInfo.jingjiId, name)
    },

    // 购买套装商店
    buyTaozhuangShop() {
      if (!this.checkLoginStatus()) return
      const name = this.getNameById(this.shopInfo.taozhuangShop, this.buyInfo.taozhuangId)
      this.sendOtherShop(this.buyInfo.taozhuangId, name)
    },

    // 购买远征商店
    buyYuanzhengShop() {
      if (!this.checkLoginStatus()) return
      const name = this.getNameById(this.shopInfo.yuanzhengShop, this.buyInfo.yuanzhengId)
      this.sendOtherShop(this.buyInfo.yuanzhengId, name)
    },

    /**
     * 世界BOSS发包
     * @param {Number} operate 1为点开世界BOSS界面，2为确认领取挑战的奖励，3为挑战，4为领奖
     */
    sendShijieBoss(operate) {
      const shijieBOssPacket = this.gen_base_json(10)
      shijieBOssPacket.operate = operate
      this.websocketsend(shijieBOssPacket)
      if (operate === 3) {
        this.sendGeneric()
        this.recordLogs('挑战世界BOSS')
      }
    },

    // 开始世界BOSS
    startShiJieBOSS() {
      if (!this.checkLoginStatus()) return
      if (this.taskInfo.bossAttackTime === 3) {
        this.$toast.fail('世界BOSS没次数了')
        return
      }
      this.flag.shijieBossFlag = true
      let i = 1
      const lxgTime = this.attackTime.shijieBossTime
      const self = this
      self.timer.shijieBossTimer = setInterval(function() {
        self.sendShijieBoss(1)
        self.sendShijieBoss(3)
        self.sendShijieBoss(2)
        if (self.taskInfo.bossAttackTime === 2) {
          self.sendShijieBoss(4)
        }
        i++
        if (i > lxgTime) {
          self.stopShiJieBOSS()
        }
      }, 3000)
    },

    // 停止世界BOSS
    stopShiJieBOSS() {
      clearInterval(this.timer.shijieBossTimer)
      this.flag.shijieBossFlag = false
    },

    /**
     * 十连抽发包
     */
    sendShilianchou() {
      const shilianchouPacket = this.gen_base_json(6)
      shilianchouPacket.id = 2
      this.websocketsend(shilianchouPacket)
      this.recordLogs('酒馆十连抽')
    },
    startShilianchou() {
      if (!this.checkLoginStatus()) return
      this.$dialog.confirm({
        title: '',
        message: '确认开始酒馆十连抽?'
      }).then(() => {
        this.flag.shilianchouFlag = true
        let i = 1
        const slcTime = this.attackTime.shilianchouTime
        const self = this
        self.timer.shilianchouTimer = setInterval(function() {
          self.sendShilianchou()
          i++
          if (i > slcTime) {
            self.stopShilianchou()
          }
        }, 1000)
      }).catch(() => {
        // on cancel
      })
    },

    // 停止十连抽
    stopShilianchou() {
      clearInterval(this.timer.shilianchouTimer)
      this.flag.shilianchouFlag = false
      this.recordLogs('停止酒馆十连抽')
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

</style>
