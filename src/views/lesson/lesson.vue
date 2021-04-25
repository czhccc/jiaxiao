<template>
  <div id="lesson">

    <TabBar :itemList="itemList" />

    <div class="main-content" v-if="this.$route.path == '/lesson/lesson'">

      <div class="main main1">
        <div class="searchBar">
          <a-input placeholder="查询车辆" v-model="searchCarValue" />
          <a-button type="primary" @click="searchCar">查询</a-button>
        </div>
        <div class="list-title">车辆</div>
        <div class="list">
          <div class="list-item"
               :style="{background: index == carChoosed ? 'pink' : '' }" 
               v-for="(item, index) in carData" 
               :key="index" 
               @click="carItemClick(item, index)" >
            {{item.card}}
          </div>
        </div>
      </div>

      <div class="main main2">
        <div class="list-title">教练</div>
        <div class="list">
          <div class="list-item" 
               :style="{background: index == trainerChoosed ? 'pink' : '' }"
               v-for="(item, index) in trainerData" 
               :key="index" 
               @click="trainerItemClick(item, index)" >
            {{item.name}}
          </div>
        </div>
      </div>

      <div class="main main3">
        <div class="list">
          <div class="list-title">学员</div>
          <div class="list">
            <div class="list-item" 
                 :style="{background: (index == studentChoosed[0] || index == studentChoosed[1] || index == studentChoosed[2] ) ? 'pink' : '' }" 
                 v-for="(item, index) in studentData" 
                 :key="index" 
                 @click="studentItemClick(item, index)" >
              {{item.name}}
            </div>
          </div>
        </div>
      </div>

      <div class="main4">
        <div class="time">选择上课时间</div>
        <a-date-picker class="data2" v-model="lessonTime" @change="lessonTimeChange" />
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

  import { toSearchCar, toSearchTrainerOrStudent, toInsertTeach } from '../../network/network'

  import moment from 'moment'

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
        carData: [],
        trainerData: [],
        studentData: [],
        lessonTime: "",
        searchCarValue: "",
        searchTrainerValue: "",
        searchStudentValue: "",
        carChoosed: -1,
        trainerChoosed: -1,
        studentChoosed: [],
        coachID: "",
      };
    },
    created() {
      this.getCarList()
    },
    methods: {
      moment,
      getCarList() {
        toSearchCar().then(res => {
          this.carData = res.data.result
        })
      },
      searchCar() {
        toSearchCar({
          card: this.searchCarValue
        }).then(res => {
          console.log(res)
          this.carData = res.data.result
        })
      },
      carItemClick(item, index) {
        console.log(item)
        this.carChoosed = index
        toSearchTrainerOrStudent({
          carId: item.id
        }).then(res => {
          console.log(res)
          this.trainerData = res.data.result.coach
          this.studentData = res.data.result.student
        })
      },
      saveBtnClick() {
        toInsertTeach({
          carId: this.carData[this.carChoosed].id,
          coachId: this.trainerData[this.trainerChoosed].id,
          userId: `${this.studentData[this.studentChoosed[0]].id},${this.studentData[this.studentChoosed[1]].id},${this.studentData[this.studentChoosed[2]].id}`,
          teachDate: moment(this.lessonTime).format('YYYY-MM-DD'),
        }).then(res => {
          console.log(res)
          if (res.data.code == '200') {
            this.$message.info('操作成功')
            this.getCarList()
          } else {
            this.$message.info('操作失败')
          }
        })
      },
      trainerItemClick(item, index) {
        this.trainerChoosed = index
      },
      studentItemClick(item, index) {
        if (this.studentChoosed.length < 3) {
          this.studentChoosed.push(index)
        } else {
          this.studentChoosed.shift()
          this.studentChoosed.push(index)
        }
      },
      lessonTimeChange(value) {
        this.lessonTime = value
      },
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
        width: 20%;
        .list-title {
          font-size: 24px;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        .searchBar {
          display: flex;
        }
        .list {
          .list-item {
            cursor: pointer;
            text-align: center;
            border: 1px solid black;
            margin-top: 10px;
          }
          .list-item2 {
            text-align: center;
          }
          .list-item:hover {
            background-color: pink;
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