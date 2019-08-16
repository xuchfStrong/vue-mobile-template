<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :span="10">
        <el-input v-model="sendMessage" placeholder="请输入消息" />
      </el-col>
      <el-col :span="10">
        <el-button type="primary" @click="websocketsend">发送</el-button>
        <el-button type="primary" @click="initWebSocket">连接</el-button>
        <el-button type="primary" @click="websocketclose">关闭连接</el-button>
      </el-col>
    </el-row>

    <div>
      <div class="res-wrap">状态：{{ status }}</div>
      <div class="res-wrap">返回的消息：{{ res.message }}</div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      websock: null,
      sendMessage: '',
      status: '',
      id: 1,
      res: {
        message: ''
      }

    }
  },
  created() {
    // 页面刚进入时开启长连接
    // this.initWebSocket()
  },
  destroyed: function() {
    // 页面销毁时关闭长连接
    this.websocketclose()
  },
  methods: {
    initWebSocket() { // 初始化weosocket
      const wsuri = 'wss://echo.websocket.org/' // ws地址
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = (e) => this.websocketonopen(e)

      this.websock.onerror = (e) => this.websocketonerror(e)

      this.websock.onmessage = (e) => this.websocketonmessage(e)
      this.websock.onclose = (e) => this.websocketclose(e)
    },

    websocketonopen(e) {
      this.status = 'WebSocket连接成功'
      console.log('WebSocket连接成功', e)
    },
    websocketonerror(e) { // 错误
      console.log('WebSocket连接发生错误')
    },
    websocketonmessage(e) { // 数据接收
      // const redata = JSON.parse(e.data)
      // 注意：长连接我们是后台直接1秒推送一条数据，
      // 但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
      // 这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
      this.res.message = e.data
      console.log('response', e)
    },

    websocketsend() { // 数据发送
      const req = {
        id: this.id,
        message: this.sendMessage
      }
      this.websock.send(JSON.stringify(req))
      this.id++
    },

    websocketclose(e) { // 关闭
      this.status = 'WebSocket连接关闭'
      this.id = 1
      console.log('connection closed (' + e + ')')
    }
  }
}
</script>

<style lang="scss" scoped>
.input-wrap {
  width: 300px;
  margin-right: 20px;
}
.res-wrap {
  margin: 20px 0;
}
</style>

