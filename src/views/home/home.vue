<template>
  <div id="home">

    <TabBar :itemList="itemList" />

    <div class="welcome" v-if="this.$route.path == '/home'">欢迎光临驾校</div>

    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>


<script>
  import TabBar from "../../components/tabBar/TabBar";

  export default {
    name: 'Home',
    components: {
      TabBar
    },
    data () {
      return {
        itemList: [
          {value: '密码修改', path: '/home/resetPassword'},
          {value: '退出', path: '/login'},
        ]
      };
    },
    computed: {
      
    },
    methods: {
      
    },
  }
</script>

<style scoped lang="less">
  #home {
    .welcome {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      font-size: 48px;
    }
  }
</style>