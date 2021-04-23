<template>
  <div id="trainerDropOut">

    <div class="main main1">
      <div class="title">教练检索</div>
      <div class="line">
        <div class="item">
          检索条件：
          <a-select default-value="name" style="width: 120px" @change="searchFactorChange">
            <a-select-option value="name">姓名</a-select-option>
            <a-select-option value="identityCard">身份证号</a-select-option>
          </a-select>
          <a-input class="input" v-model="searchFactorValue" />
        </div>
        <div class="item">
          时间段：
          <a-date-picker class="data1" @change="searchTimeChange1" />
          至
          <a-date-picker class="data2" @change="searchTimeChange2" />
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="searhBtnClick">查询</a-button>
        </div>
      </div>
    </div>

    <div class="main main2">
      <div class="title">教练基本信息</div>
      <div class="line line1">
        <div class="item">
          教练编号：
          <a-input disabled class="input" v-model="id" />
        </div>
        <div class="item">
          教练状态：
          <div class="status">{{trainerStatus}}</div>
        </div>
        <div class="item">
          教练证号：
          <a-input disabled class="input" v-model="trainerLicenseNumber" />
        </div>
        <div class="item">
          工资：
          <a-input disabled class="input" v-model="salary" />
        </div>
      </div>
      <div class="line line2">
        <div class="item">
          姓名：
          <a-input disabled class="input" v-model="name" />
        </div>
        <div class="item">
          性别：
          <a-select default-value="0" v-model="sex" style="width: 120px" @change="sexChange" disabled>
            <a-select-option value="0">女</a-select-option>
            <a-select-option value="1">男</a-select-option>
          </a-select>
        </div>
        <div class="item">
          证件号码：
          <a-input disabled class="input" v-model="identityCard" />
        </div>
        <div class="item">
          联系电话：
          <a-input disabled class="input" v-model="phone" />
        </div>
      </div>
      <div class="line line3">
        <div class="item">
          准驾车型：
          <a-select default-value="A1" v-model="driveCar" style="width: 120px" @change="driveCarChange" disabled>
            <a-select-option value="A1">A1</a-select-option>
            <a-select-option value="A2">A2</a-select-option>
            <a-select-option value="A3">A3</a-select-option>
            <a-select-option value="A4">A4</a-select-option>
          </a-select>
        </div>
        <div class="item">
          准教车型：
          <a-select default-value="大型客车" v-model="teachCar" style="width: 120px" @change="teachCarChange" disabled>
            <a-select-option value="大型客车">大型客车</a-select-option>
            <a-select-option value="大型货车">大型货车</a-select-option>
            <a-select-option value="小型自动挡汽车">小型自动挡汽车</a-select-option>
            <a-select-option value="城市公交车">城市公交车</a-select-option>
          </a-select>
        </div>
        <div class="item">
          受理人：
          <a-input disabled class="input" v-model="handler" />
        </div>
      </div>
      <div class="line line4">
        <div class="item">
          离职日期：
          <a-date-picker disabled class="data1" :default-value="moment(new Date(), 'YYYY-MM-DD')" @change="dropOutTimeChange" />
        </div>
        <div class="item">
          <a-button type="primary" @click="confirmDropOutBtnClick">确认离职</a-button>
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
</template>


<script>
  import List from '../../components/list/List'

  import { toGetTrainerList, toTrainerDropOut } from '../../network/network'

  import moment from 'moment'

  export default {
    name: 'trainerDropOut',
    components: {
      List
    },
    data () {
      return {
        title: ['姓名', '教练编号', '性别', '身份证号', '准驾车型', '准教车型', '证号', '工资', '联系电话'],
        theData: [
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
          ['张三', '男', '3358743235131321', 'A2', '小型汽车', '香（以）1432', '999', '1254865932'],
        ],
        searchFactor: "name",
        searchFactorValue: "",
        searchTime1: "",
        searchTime2: "",
        trainerStatus: "",
        trainerLicenseNumber: "",
        salary: "",
        identityCard: "",
        name: "",
        id: "",
        sex: "",
        phone: "",
        driveCar: "",
        teachCar: "",
        handler: sessionStorage.getItem('loginAccount'),
        dropOutTime: "",
      };
    },
    created() {
      this.getTrainerList()
    },
    methods: {
      moment,
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
              trainerLicenseNumber: i.identityCard,
              salary: i.amount,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      searchFactorChange(value) {
        this.searchFactor = value
      },
      sexChange(value) {
        this.sex = value
      },
      searchTimeChange1(date, dateString) {
        this.searchTime1 = dateString
      },
      searchTimeChange2(date, dateString) {
        this.searchTime2 = dateString
      },
      searhBtnClick() {
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
              sex: i.sex,
              identityCard: i.identityCard,
              driveCar: i.level,
              teachCar: i.model,
              trainerLicenseNumber: i.identityCard,
              salary: i.amount,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      driveCarChange(value) {
        this.driveCar = value
      },
      teachCarChange(value) {
        this.teachCar = value
      },
      dropOutTimeChange(date, dateString) {
        this.dropOutTime = dateString
      },
      confirmDropOutBtnClick() {
        toTrainerDropOut({
          id: this.id,
          email: sessionStorage.getItem('loginAccount')
        }).then(res => {
          console.log(res)
        })
      },
      listItemClick(item) {
        this.name = item.name
        this.id = item.id
        this.sex = item.sex
        this.identityCard = item.identityCard
        this.driveCar = item.driveCar
        this.teachCar = item.teachCar
        this.trainerLicenseNumber = item.trainerLicenseNumber
        this.salary = item.salary
        this.phone = item.phone
        this.trainerStatus = '已受理'
      }
    },
  }
</script>

<style scoped lang="less">
  #trainerDropOut {
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
    .main2 {
      .status {
        font-size: 24px;
        color: cyan;
      }
      .line4 {
        margin-left: 50%;
      }
    }
  }
</style>