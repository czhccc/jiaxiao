<template>
  <div id="tabBar">

    <div class="main">
      <div class="item" v-for="(item, index) in itemList" @click="itemClick(item.path)" :key="index">
        {{item.value}}
      </div>
    </div>

  </div>
</template>


<script>
  

  export default {
    name: 'TabBar',
    components: {
      
    },
    props: {
      itemList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data () {
      return {
        item: [
          {
            value: '密码修改',
            path: '/'
          }
        ]
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
  #tabBar {
    position: fixed;
    top: 100px;
    margin-left: -165px;
    background-color: white;
    width: 165px;
    height: 80%;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    .main {
      .item {
        cursor: pointer;
        margin-top: 30px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border-top: 1px solid black;
        border-bottom: 1px solid black;
      }
    }
  }
</style>