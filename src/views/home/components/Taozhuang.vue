<!--  -->
<template>
  <div class="help-container">
    <van-row type="flex" justify="space-between" align="center" class="zb-wrap">
      <van-col span="3">
        <div>头部:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.toubu" :options="zhuangbeiInfo.toubu" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="3">
        <div class="right-item">项链:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.xianglian" :options="zhuangbeiInfo.xianglian" />
        </van-dropdown-menu>
      </van-col>
    </van-row>

    <van-row type="flex" justify="space-between" align="center" class="zb-wrap">
      <van-col span="3">
        <div>肩膀:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.jianbang" :options="zhuangbeiInfo.jianbang" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="3">
        <div class="right-item">戒指:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.jiezhi" :options="zhuangbeiInfo.jiezhi" />
        </van-dropdown-menu>
      </van-col>
    </van-row>

    <van-row type="flex" justify="space-between" align="center" class="zb-wrap">
      <van-col span="3">
        <div>身体:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.shenti" :options="zhuangbeiInfo.shenti" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="3">
        <div class="right-item">鞋子:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.xiezi" :options="zhuangbeiInfo.xiezi" />
        </van-dropdown-menu>
      </van-col>
    </van-row>

    <van-row type="flex" justify="space-between" align="center" class="zb-wrap">
      <van-col span="3">
        <div>主手:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.zhushou" :options="zhuangbeiInfo.zhushou" @change="chooseZhushou " />
        </van-dropdown-menu>
      </van-col>
      <van-col span="3">
        <div class="right-item">副手:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.fushou" :options="zhuangbeiInfo.fushou" @change="chooseFushou" />
        </van-dropdown-menu>
      </van-col>
    </van-row>

    <van-row type="flex" justify="space-between" align="center" class="zb-wrap">
      <van-col span="3">
        <div>双手:</div>
      </van-col>
      <van-col span="8">
        <van-dropdown-menu>
          <van-dropdown-item v-model="choosedZhuangbei.shuangshou" :options="zhuangbeiInfo.shuangshou" @change="chooseShuangshou" />
        </van-dropdown-menu>
      </van-col>
      <van-col span="1" />
      <van-col span="10">
        <van-button type="info" size="small" @click="queryShuxing">查询</van-button>
        <van-button type="info" size="small" @click="clearChoose">重选</van-button>
      </van-col>
    </van-row>

    <van-row type="flex" justify="space-around" align="center">
      <van-col span="10">
        <van-divider>装备属性</van-divider>
      </van-col>
      <van-col span="10">
        <van-divider>换算属性</van-divider>
      </van-col>
    </van-row>
    <div class="shuxing-wrap">
      <div class="shuxing-left">
        <p v-for="item in tzShuxing" :key="item"> {{ item }} </p>
      </div>
      <div class="shuxing-right">
        <p v-for="item in tzShuxingCalc" :key="item"> {{ item }} </p>
      </div>
    </div>
  </div>
</template>

<script>
import { zhuangbei, taozhuang } from '@/api/game'

const defaultChooseZB = {
  toubu: '',
  jianbang: '',
  shenti: '',
  zhushou: '',
  fushou: '',
  shuangshou: '',
  xianglian: '',
  jiezhi: '',
  xiezi: ''
}

export default {
  components: {},
  data() {
    return {
      orgiZbInfo: {},
      tzShuxing: [],
      tzShuxingCalc: [],
      flag: {
        shuangshou: false,
        zhushou: false
      },
      zhuangbeiInfo: {
        toubu: [],
        jianbang: [],
        shenti: [],
        zhushou: [],
        fushou: [],
        shuangshou: [],
        xianglian: [],
        jiezhi: [],
        xiezi: []
      },
      choosedZhuangbei: Object.assign({}, defaultChooseZB)
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.getZhuangbei()
  },

  methods: {
    async getZhuangbei() {
      const res = await zhuangbei()
      this.orgiZbInfo = res.zhuangbei
      let zb = res.zhuangbei
      zb = JSON.parse(JSON.stringify(zb).replace(/name/g, 'text'))
      zb = JSON.parse(JSON.stringify(zb).replace(/tz_id/g, 'value'))
      this.zhuangbeiInfo = { ...zb }
    },
    async queryShuxing() {
      const chooseArray = []
      for (const i in this.choosedZhuangbei) {
        if (this.choosedZhuangbei[i]) {
          chooseArray.push(this.choosedZhuangbei[i])
        }
      }
      const param = {
        tzList: chooseArray
      }
      const res = await taozhuang(param)
      this.tzShuxing = res.shuxing.sx
      this.tzShuxingCalc = res.shuxing.calc_sx
    },
    chooseZhushou() {
      if (this.flag.shuangshou) {
        this.choosedZhuangbei.zhushou = ''
        this.$toast({ duration: 1000, message: '已经选择双手武器' })
        return
      }
      this.flag.zhushou = true
    },
    chooseFushou() {
      if (this.flag.shuangshou) {
        this.choosedZhuangbei.fushou = ''
        this.$toast({ duration: 1000, message: '已经选择双手武器' })
        return
      }
      this.flag.zhushou = true
    },
    chooseShuangshou() {
      if (this.flag.zhushou) {
        this.$toast({ duration: 1000, message: '已经选择主手或副手武器' })
        this.choosedZhuangbei.shuangshou = ''
        return
      }
      this.flag.shuangshou = true
    },
    clearChoose() {
      this.choosedZhuangbei = Object.assign({}, defaultChooseZB)
      this.flag.zhushou = false
      this.flag.shuangshou = false
    }
  }
}

</script>

<style lang='scss' scoped>
.help-container {
  padding: 0 15px;
}
.cell-wrap {
  padding-top: 20px;
}
.content-wrap {
  padding: 0 20px;
}
.zb-wrap {
  margin-top:10px;
}
.right-item {
  margin-left: 10px;
}
.shuxing-wrap {
  min-height: 40px;
  display: flex;
  .shuxing-left{
    padding-left: 50px;
    width: 50%;
    border-right: solid 1px #ebedf0;
  }
  .shuxing-right{
    padding-left: 50px;
    width: 50%;
  }
}
</style>
