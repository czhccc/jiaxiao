<template>
  <div id="list">

    <div class="title item">
      <span class="text" v-for="(item, index) in title" :key="index">{{item}}</span>
    </div>

    <div class="listItem item" v-for="(iten, indey) in theData" :key="indey" @click="listItemClick(iten)" @dblclick="listItemDbclick(iten)">
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
        
      };
    },
    methods: {
      listItemClick(item) {
        this.$emit('listItemClick', item)
      },
      listItemDbclick(item) {
        if(this.$route.path == '/student/studentDropOut' || this.$route.path == '/student/studentManage' || this.$route.path == '/student/studentGraduation') {
          console.log('发出事件')
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
        // text-overflow: ellipsis;
        // overflow: hidden;
        // white-space: nowrap;
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