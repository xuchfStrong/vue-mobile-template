<!--  -->
<template>
  <div>
    <Header>
      <template slot="left" />
      <template slot="right" />
      <template>
        版本更新
      </template>
    </Header>
    <div class="content-container">
      <div class="summary-wrap">
        <p v-if="hasNewVersion" class="highlight">有新版本，请下载新的版本安装，当前版本为V{{ $global.jqcmVersionName }}</p>
        <div>更新说明：</div>
        <div class="summary-content">
          <p v-for="(item, index) in utils.updateDescription" :key="index">{{ item }}</p>
        </div>

        <div style="margin-top:10px; color:#1989fa;">
          <!-- <a :href="utils.apkDownloadUrl">
            <span>点击下载辅助APP</span>
          </a> -->
          <a :href="utils.apkDownloadUrl2">
            <span>点击下载辅助APP</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import { getUtils } from '@/api/game'
export default {

  components: { Header },
  data() {
    return {
      utils: ''
    }
  },

  computed: {
    hasNewVersion() {
      const newVersion = this.$store.getters.newJqcmVersion
      const currentVersion = this.$global.jqcmVersion
      return newVersion > currentVersion
    }
  },

  watch: {},

  created() {},

  mounted() {
    this.handleGetUtils()
  },

  methods: {
    handleGetUtils() {
      getUtils().then(res => {
        this.utils = res
        this.$store.dispatch('game/changeNewJqcmVersion', res.version)
      }).catch(err => {
        console.log(err)
      })
    },
    handleDownload(url) {
      window.open(url)
    }
  }
}

</script>

<style lang='scss' scoped>
.summary-wrap {
  padding: 0 15px;
}
.summary-content {
  color: #969799;
}
.highlight {
  color: red;
}
</style>
