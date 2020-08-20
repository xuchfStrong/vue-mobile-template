<!--  -->
<template>
  <div>
    <Header>
      <!-- <template slot="left">
        Left
      </template>
      <template slot="right">
        右边
      </template> -->
      <template>
        申请
      </template>
    </Header>
    <div class="content-container">
      产品申请
      <input v-model="selectVal" class="browsers" list="browsers">
      <datalist id="browsers">browsers
        <option v-for="item in list" :key="item.id" :value="item.text" />
      </datalist>
      <div>{{ selectVal }}</div>
      <van-button type="info" size="mini" @click="showme">点击</van-button>
    </div>

    <div class="info-wrap">
      <van-collapse v-model="activeName" accordion :border="false" class="info-container">
        <van-collapse-item :border="false" :is-link="false">
          <template slot="title">
            <div>
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
                  <span>{{ roleInfo.levelId }}</span>
                </van-col>
              </van-row>
              <van-row class="row-wrap-last">
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
            </div>
          </template>
          <template>
            <van-row class="row-wrap">
              <van-col span="8">
                <span>金币：</span>
                <span>7亿</span>
              </van-col>
              <van-col span="8">
                <span>无尽币：</span>
                <span>{{ roleInfo.level }}</span>
              </van-col>
              <van-col span="8">
                <span>神器碎片：</span>
                <span>{{ roleInfo.levelId }}</span>
              </van-col>
            </van-row>
            <van-row class="row-wrap">
              <van-col span="8">
                <span>熔炼：</span>
                <span>{{ roleInfo.xuejing }}</span>
              </van-col>
              <van-col span="8">
                <span>远征币：</span>
                <span>{{ roleInfo.zuanshi }}</span>
              </van-col>
              <van-col span="8">
                <span>套装碎片：</span>
                <span>{{ roleInfo.wujinLevelId }}</span>
              </van-col>
            </van-row>
            <van-row class="row-wrap">
              <van-col span="8">
                <span>竞技积分：</span>
                <span>19827</span>
              </van-col>
              <van-col span="8">
                <span>竞技次数：</span>
                <span>5</span>
              </van-col>
              <van-col span="8">
                <span>套装碎片：</span>
                <span>{{ roleInfo.wujinLevelId }}</span>
              </van-col>
            </van-row>
          </template>
        </van-collapse-item>
      </van-collapse>
    </div>
    xiaoxi
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {

  components: {
    Header
  },
  data() {
    return {
      selectVal: '',
      activeName: 1,
      list: [
        { id: 1, text: '清醒' },
        { id: 2, text: '嗜睡' },
        { id: 3, text: '烦躁' },
        { id: 4, text: '昏迷' },
        { id: 5, text: '迷题' }
      ],
      roleInfo: {
        name: '',
        levelId: 0,
        wujinLevelId: 0,
        level: '', // 等级
        zuanshi: '',
        xuejing: ''
      }
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  methods: {
    showme() {

    }
  }
}

</script>

<style lang="scss">
.info-container {
  .van-collapse-item__content {
    padding: 0 16px;
    color: #323233;
    font-size: 14px;
  }
  .van-cell {
    padding: 0 16px;
  }
}
</style>

<style lang='scss' scoped>
.row-wrap {
  margin: 10px 0;
}
.row-wrap-last {
  margin-top: 10px;
}
.info-wrap {
  padding-bottom: 10px;
}
</style>
