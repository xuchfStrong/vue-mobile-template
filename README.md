# vue-mobile-template

> 这是一个极简的 vue 移动端模板。它只包含了 Vant UI & axios & iconfont & permission control & lint，这些搭建app必要的东西。
使用了vue-awesome-mui监听手机物理按键，使之打包成webapp后能正常使用返回键返回到上一个页面。

目前版本为基于 `vue-cli` 进行构建


## Build Setup

```bash
# 克隆项目
git clone https://github.com/xuchfStrong/vue-mobile-template.git

# 进入项目目录
cd vue-mobile-template

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## 版本说明
**V 1.5.0** *(2019-9-25)*
1. 增加自动远征迷宫功能。

**V 1.6.0** *(2019)*
1. 改进远征迷宫关卡显示。
2. 优化金币商店购买一直重复提示购买完毕的问题。

