<template>
  <div id="trainerSelect">

    <TabBar :itemList="itemList" />

    <div class="manage" v-if="this.$route.path == '/trainer/trainerSelect'">
      <div class="main main1">
        <div class="title">教练信息编辑、录入</div>
        <div class="content">
          <div class="line line1">
            <div class="item">
              姓名：
              <a-input class="input" v-model="name" />
            </div>
            <div class="item">
              身份证：
              <a-input class="input" v-model="identityCard" />
            </div>
            <div class="item">
              性别：
              <a-select default-value="0" v-model="sex" style="width: 120px" @change="sexChange">
                <a-select-option value="0">女</a-select-option>
                <a-select-option value="1">男</a-select-option>
              </a-select>
            </div>
            <div class="item">
              联系电话：
              <a-input class="input" v-model="phone" />
            </div>
          </div>
          <div class="line line2">
            <div class="item">
              准驾车型：
              <a-select default-value="A1" v-model="driveCar" style="width: 120px" @change="driveCarChange">
                <a-select-option value="A1">A1</a-select-option>
                <a-select-option value="A2">A2</a-select-option>
                <a-select-option value="A3">A3</a-select-option>
                <a-select-option value="A4">A4</a-select-option>
              </a-select>
            </div>
            <div class="item">
              准教车型：
              <a-select default-value="大型客车" v-model="teachCar" style="width: 120px" @change="teachCarChange">
                <a-select-option value="大型客车">大型客车</a-select-option>
                <a-select-option value="大型货车">大型货车</a-select-option>
                <a-select-option value="小型自动挡汽车">小型自动挡汽车</a-select-option>
                <a-select-option value="城市公交车">城市公交车</a-select-option>
              </a-select>
            </div>
            <div class="item">
              证号：
              <a-input class="input" v-model="trainCardNumber" />
            </div>
            <div class="item">
              工资：
              <a-input class="input" v-model="salary" />
            </div>
          </div>
          <div class="line line3">
            <div class="item">
              <a-button class="btn" type="primary" @click="addBtnClick">增加</a-button>
            </div>
            <div class="item">
              <a-button class="btn" type="primary" @click="saveBtnClick">保存</a-button>
            </div>
          </div>
        </div>
      </div>

      <div class="main main2">
        <div class="title">教练检索</div>
        <div class="line">
          <div class="item">
            检索条件：
            <a-select default-value="name" v-model="searchFactor" style="width: 120px" @change="searchFactorChange">
              <a-select-option value="name">姓名</a-select-option>
              <a-select-option value="identityCard">身份证号</a-select-option>
            </a-select>
            <a-input class="input" v-model="searchFactorValue" />
          </div>
          <div class="item">
            时间段：
            <a-date-picker class="data1" @change="searchTime1Change" />
            至
            <a-date-picker class="data2" @change="searchTime2Change" />
          </div>
          <div class="item">
            <a-button type="primary" class="btn" @click="searchBtnClick">查询</a-button>
          </div>
        </div>
      </div>

      <div class="main main3">
        <div class="title">列表</div>
        <div class="list">
          <List :title='title' :theData="theData" @listItemClick="listItemClick" />
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

  import { toGetTrainerList, toAddTrainer, toUpdateTrainer } from '../../network/network'

  export default {
    name: 'trainerSelect',
    components: {
      TabBar,
      List
    },
    data () {
      return {
        itemList: [
          {value: '教练查询', path: '/trainer/trainerSelect'},
          {value: '教练评级', path: '/trainer/trainerRate'},
          {value: '教练离职', path: '/trainer/trainerDropOut'},
        ],
        title: ['姓名', '编号', '性别', '身份证号', '准驾车型', '准教车型', '证号', '工资', '联系电话'],
        theData: [
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
        ],
        id: "",
        name: "",
        identityCard: "",
        sex: "",
        phone: "",
        driveCar: "",
        teachCar: "",
        trainCardNumber: "",
        salary: "",
        searchFactor: "name",
        searchFactorValue: "",
        searchTime1: "",
        searchTime2: "",
        
      };
    },
    created() {
      this.getTrainerList()
    },
    methods: {
      getTrainerList() {
        toGetTrainerList().then(res => {
          console.log(res)
          let tempArr = []
          for (const i of res.data.result) {
            let tempObj = {
              name: i.name,
              id: i.id,
              sex: i.sex,
              identityCard: i.identityCard,
              driveCar: i.level,
              teachCar: i.model,
              trainCardNumber: i.credentials,
              salary: i.amount,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      sexChange(value) {
        this.sex = value
      },
      driveCarChange(value) {
        this.driveCar = value
      },
      teachCarChange(value) {
        this.teachCar = value
      },
      addBtnClick() {
        toAddTrainer({
          name: this.name,
          identityCard: this.identityCard,
          sex: this.sex,
          phone: this.phone,
          level: this.driveCar,
          model:  this.teachCar,
          credentials: this.trainCardNumber,
          amount: this.salary
        }).then(res => {
            console.log(res)
          if(res.data.code == '200') {
            this.$message.info('增加成功')
            this.name = ""
            this.identityCard = ""
            this.sex = ""
            this.phone = ""
            this.driveCar = ""
            this.teachCar = ""
            this.trainCardNumber = ""
            this.salary = ""
            this.getTrainerList()
          } else {
            this.$message.info('增加失败')
          }
        })
      },
      saveBtnClick() {
        toUpdateTrainer({
          id: this.id,
          name: this.name,
          identityCard: this.identityCard,
          sex: this.sex,
          phone: this.phone,
          level: this.driveCar,
          model:  this.teachCar,
          credentials: this.trainCardNumber,
          amount: this.salary
        }).then(res => {
          console.log(res)
          if(res.data.code == '200') {
            this.$message.info('修改成功')
            this.getTrainerList()
          } else {
            this.$message.info('修改失败')
          }
        })
      },
      searchFactorChange(value) {
        this.searchFactor = value 
      },
      searchTime1Change(date, dateString) {
        this.searchTime1 = dateString
      },
      searchTime2Change(date, dateString) {
        this.searchTime2 = dateString
      },
      searchTimeChange2(value, dateString) {
        this.searchTime2 = dateString
      },
      searchBtnClick() {
        toGetTrainerList({
          [this.searchFactor]: this.searchFactorValue,
          createDate: this.searchTime1,
          endDate: this.searchTime2
        }).then(res => {
          console.log(res)
          let tempArr = []
          for (const i of res.data.result) {
            let tempObj = {
              name: i.name,
              id: i.id,
              sex: i.sex,
              identityCard: i.identityCard,
              driveCar: i.model,
              teachCar: i.model,
              trainCardNumber: i.credentials,
              salary: i.amount,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      listItemClick(item) {
        this.name = item.name
        this.id = item.id
        this.identityCard = item.identityCard
        this.sex = item.sex
        this.phone = item.phone
        this.driveCar = item.driveCar
        this.teachCar = item.teachCar
        this.trainCardNumber = item.trainCardNumber
        this.salary = item.salary
      }
    },
  }
</script>

<style scoped lang="less">
  #trainerSelect {
    .main {
      margin-top: 20px;
      margin-left: 30px;
      .title {
        font-size: 24px;
      }
      .line {
        display: flex;
        margin-top: 20px;
      }
      .item {
        display: flex;
        align-items: center;
        margin-left: 20px;
        .date {
          width: 150px;
        }
      }
      .input {
        width: 200px;
      }
      .btn {
        width: 100px;
      }
    }
    .main1 {
      .line3 {
        margin-left: 60%;
      }
    }
    .main2 {
      .item {
        display: flex;
        .input {
          margin-left: 10px;
        }
        .data1 {
          margin-right: 10px;
          width: 150px;
        }
        .data2 {
          margin-left: 10px;
          width: 150px;
        }
      }
    }
  }
</style>