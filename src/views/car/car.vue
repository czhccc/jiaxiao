<template>
  <div id="car">

    <TabBar :itemList="itemList" />

    <div class="main main1">
      <div class="title">录入区</div>
      <div class="line line1">
        <div class="item">
          车牌号：
          <a-input class="input" v-model="carCard" />
        </div>
        <div class="item">
          型号：
          <a-input class="input" v-model="carBrand" />
        </div>
        <div class="item">
          车型：
          <a-input class="input" v-model="carStatus" />
        </div>
        <div class="item">
          保险日期：
          <a-date-picker class="date" v-model="insuranceTime" @change="insuranceTimeChange" />
        </div>
      </div>
      <div class="line line2">
        <div class="item">
          <a-button class="btn" type="primary" @click="addBtnClick">增加</a-button>
        </div>
        <div class="item">
          <a-button class="btn" type="primary" @click="saveBtnClick">保存</a-button>
        </div>
      </div>
    </div>

    <div class="main main2">
      <div class="title">车辆检索</div>
      <div class="line">
        <div class="item">
          检索条件：
          <a-select default-value="card" style="width: 120px" v-model="searchFactor" @change="searchFactorChange">
            <a-select-option value="card">车牌号</a-select-option>
            <a-select-option value="status">型号</a-select-option>
            <a-select-option value="coachName">教练</a-select-option>
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
          <a-button type="primary" class="btn" @click="searchBtnCLick">查询</a-button>
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
  import TabBar from "../../components/tabBar/TabBar";
  import List from '../../components/list/List'

  import { toGetCarList, toAddCar, toUpdateCar } from '../../network/network'

  import moment from 'moment'

  export default {
    name: 'Car',
    components: {
      TabBar,
      List
    },
    data () {
      return {
        itemList: [
          {value: '车辆查询', path: '/car'},
        ],
        title: ['车辆ID', '车牌号', '型号', '车型', '登记日期', '保险时间'],
        theData: [],
        id: "",
        carCard: "",
        carBrand: "",
        carStatus: "",
        insuranceTime: "",
        searchFactor: "card",
        searchFactorValue: "",
        searchTime1: "",
        searchTime2: "",
      };
    },
    created() {
      this.getCarList() 
    },
    methods: {
      moment,
      getCarList() {
        toGetCarList().then(res => { // 网络请求车辆列表
          let tempArr = []
          for (const i of res.data.result) { // 重组数据结构
            let tempObj = {
              id: i.id,
              carCard: i.card,
              carBrand: i.brand,
              carStatus: i.status,
              registrationTime: moment(i.create_date*1000).format('YYYY-MM-DD'),
              insuranceTime: moment(i.insure_date*1000).format('YYYY-MM-DD'),
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr // 保存重组后的数据
        })
      },
      insuranceTimeChange(value) { // 保险日期 改变后保存改变的值
        this.insuranceTime = value
      },
      addBtnClick() { // 增加 按钮
        toAddCar({ // 增加车辆的网络请求
          card: this.carCard,
          brand: this.carBrand,
          status: this.carStatus,
          insureDate: moment(this.insuranceTime).format('YYYY-MM-DD')
        }).then(res => {
          if(res.data.code == '200') {
            this.$message.info('增加成功')
            this.carCard = ""
            this.carBrand = ""
            this.carStatus = ""
            this.insuranceTime = ""
            this.getCarList()
          } else {
            this.$message.info('增加失败')
          }
        })
      },
      saveBtnClick() { // 保存 按钮
        toUpdateCar({
          id: this.id,
          card: this.carCard,
          brand: this.carBrand,
          status: this.carStatus,
          insureDate: moment(this.insuranceTime).format('YYYY-MM-DD')
        }).then(res => {
          this.getCarList()
        })
      },
      searchFactorChange(value) { // 检索条件 改变
        this.searchFactor = value
      },
      searchTimeChange1(date, dateString) { // 车辆检索 时间段1 保存
        this.searchTime1 = dateString
      },
      searchTimeChange2(date, dateString) { // 车辆检索 时间段2 保存
        this.searchTime2 = dateString
      },
      searchBtnCLick() { // 车辆检索 查询 按钮
        toGetCarList({ // 查询车辆的网络请求
          [this.searchFactor]: this.searchFactorValue,
          createDate: this.searchTime1,
          endDate: this.searchTime2
        }).then(res => {
          let tempArr = []
          for (const i of res.data.result) {
            let tempObj = {
              id: i.id,
              carCard: i.card,
              carBrand: i.brand,
              carStatus: i.status,
              registrationTime: moment(i.create_date*1000).format('YYYY-MM-DD'),
              insuranceTime: moment(i.insure_date*1000).format('YYYY-MM-DD'),
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      listItemClick(item) { // 点击列表的具体项 将具体项的数据保存到录入区相关的数据
        this.id = item.id
        this.carCard = item.carCard
        this.carBrand = item.carBrand
        this.carStatus = item.carStatus
        this.registrationTime = item.registrationTime
        this.insuranceTime = moment(item.insuranceTime)
        console.log(moment(item.insuranceTime))
      }
    },
  }
</script>

<style scoped lang="less">
  #car {
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
      .line2 {
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
    .main3 {
      
    }
  }
</style>