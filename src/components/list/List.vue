<template>
  <div id="list">

    <div class="title item">
      <span class="text" v-for="(item, index) in title" :key="index">{{item}}</span>
    </div>

    <div class="listItem item" 
         v-for="(iten, indey) in theData" 
         :key="indey" 
         :style="{backgroundColor: currentIndex == indey ? 'pink' : '' }"
         @click="listItemClick(iten, indey)" 
         @dblclick="listItemDbclick(iten)" >
      <span class="text" v-for="(item, index) in iten" :key="index">{{item}}</span>
    </div>

  </div>
</template>


<script>
  

  export default {
    name: 'List',
    components: {
      
    },
    props: {
      title: {
        type: Array,
        default() {
          return []
        }
      },
      theData: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data () {
      return {
        currentIndex: -1
      };
    },
    methods: {
      listItemClick(item, index) {
        this.$emit('listItemClick', item, index)
        this.currentIndex = index
      },
      listItemDbclick(item) {
        if(this.$route.path == '/student/studentDropOut' || this.$route.path == '/student/studentManage' || this.$route.path == '/student/studentGraduation') {
          this.$emit('listItemDbclick', item)
        }
      }
    },
  }
</script>

<style scoped lang="less"> 
  #list {
    width: 95%;
    margin-top: 10px;
    .title {
      .text {
        font-weight: 700;
      }
    }
    .item {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: 40px;
      background-color: white;
      position: relative;
      .text {
        display: inline-block;
        width: 135px;
        text-align: center;
      }
    }
    .listItem {
      cursor: pointer;
      color: #9A9A9A;
    }
    .listItem:nth-of-type(even) {
      background-color: #F8F8F8;
    }
  }
</style>