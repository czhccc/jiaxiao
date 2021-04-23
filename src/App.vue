<template>
  <a-config-provider :locale="locale">
  <div id="app">
    <TopBar class="top-bar" :hidden="$route.meta.showBar === false" />
    <div class="app-content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
  </div>
  </a-config-provider>
</template>

<script>
  import TopBar from "./components/topBar/TopBar";

  // 用于 ant-design-vue 配置全局中文环境
  import { ConfigProvider } from 'ant-design-vue'; 
  import zhCN from 'ant-design-vue/es/locale/zh_CN';
  import moment from 'moment';
  import 'moment/locale/zh-cn';

  moment.locale('zh-cn');

  export default {
    name: 'App',
    components: {
      TopBar,
      [ConfigProvider.name]: ConfigProvider,
    },
    data() {
      return {
        locale: zhCN
      }
    },
    methods: {
      moment
    }
  }
</script>

<style lang="less">
#app {
  // height: 100%;
  .app-content {
    padding-left: 165px;
    padding-top: 100px;
  }
}

</style>
