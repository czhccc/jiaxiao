<template>
  <div id="topBar">

   <div class="item" @click="itemClick('/home')">首页</div>
   <div class="item" @click="itemClick('/student')">学员管理</div>
   <div class="item" @click="itemClick('/trainer')">教练管理</div>
   <div class="item" @click="itemClick('/lesson')">考试管理</div>
   <div class="item" @click="itemClick('/car')">车辆管理</div>
   <div class="item" @click="itemClick('/login')">退出</div>

  </div>
</template>


<script>

  export default {
    name: 'TopBar',
    components: {
    },
    props: {
      
    },
    data () {
      return {
        
      };
    },
    methods: {
      itemClick(path) {
        this.$router.push(path)
      }
    },
  }
</script>

<style scoped lang="less">
  #topBar {
    z-index: 999;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-bottom: 1px solid black;
    background-color: white;
    .item {
      cursor: pointer;
      color: black;
      font-size: 24px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      width: 120px;
      border: 1px solid black;
    }
  }
</style>