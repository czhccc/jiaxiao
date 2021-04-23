<template>
  <div id="lesson">

    <TabBar :itemList="itemList" />

    <div class="main-content" v-if="this.$route.path == '/lesson/lesson'">

      <div class="main main1">
        <a-input placeholder="查询车辆" v-model="searchCar" />
        <div class="list-title">车辆</div>
        <div class="list">
          <div class="list-item" v-for="(item, index) in carData" :key="index" >
            {{item}}
          </div>
        </div>
      </div>

      <div class="main main2">
        <a-input placeholder="查询教练" v-model="searchTrainer" />
        <div class="list-title">教练</div>
        <div class="list">
          <div class="list-item" v-for="(item, index) in trainerData" :key="index" >
            {{item}}
          </div>
        </div>
      </div>

      <div class="main main3">
        <div class="list">
          <a-input placeholder="查询学员"  v-model="searchStudent" />
          <div class="list-title">学员</div>
          <div class="list">
            <div class="list-item" v-for="(item, index) in studentData" :key="index" >
              {{item}}
            </div>
          </div>
        </div>
      </div>

      <div class="main4">
        <div class="time">选择上课时间</div>
        <a-date-picker class="data2" @change="lessonTimeChange" />
        <div>
          <a-button class="btn" type="primary" @click="saveBtnClick">保存</a-button>
        </div>
      </div>

    </div>

    <keep-alive>
      <router-view />
    </keep-alive>


  </div>
</template>


<script>
  import TabBar from "../../components/tabBar/TabBar";
  import List from '../../components/list/List'

  export default {
    name: 'Lesson',
    components: {
      TabBar,
      List
    },
    data () {
      return {
        itemList: [
          {value: '课程安排', path: '/lesson/lesson'},
          {value: '考试安排', path: '/lesson/exam'},
          {value: '成绩管理', path: '/lesson/grade'},
        ],
        title: ['姓名', '性别', '身份证号', '准驾车型', '准教车型', '证号', '工资', '联系电话'],
        carData: [
          '浙A-BU4654',
          '浙A-BU4654',
          '浙A-BU4654',
          '浙A-BU4654',
          '浙A-BU4654',
          '浙A-BU4654',
          '浙A-BU4654',
          '浙A-BU4654',
        ],
        trainerData: [
          '张三',
          '张三',
          '张三',
          '张三',
          '张三',
          '张三',
          '张三',
          '张三',
        ],
        studentData: [
          '李四',
          '李四',
          '李四',
          '李四',
          '李四',
          '李四',
          '李四',
          '李四',
        ],
        lessonTime: "",
        searchCar: "",
        searchTrainer: "",
        searchStudent: "",
      };
    },
    methods: {
      lessonTimeChange(value) {
        this.lessonTime = value
      },
      saveBtnClick() {

      }
    },
  }
</script>

<style scoped lang="less">
  #lesson {
    .main-content {
      display: flex;
      justify-content: space-around;
      width: 95%;
      margin: 0 auto;
      margin-top: 2%;
      .main {
        background-color: white;
        border: 1px solid black;
        padding: 10px;
        .list-title {
          font-size: 24px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .list {
          .list-item {
            text-align: center;
            border: 1px solid black;
            margin-top: 5px;
          }
        }
      }
      .main1 {
        .carList {
          
        }
      }
      .main4 {
        .time {
          font-size: 24px;
          margin-bottom: 10px;
        }
        .btn {
          margin-top: 50px;
          width: 200px;
          height: 50px;
        }
      }
    }
  }
</style>