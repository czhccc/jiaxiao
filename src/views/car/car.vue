<template>
  <div id="car">

    <TabBar :itemList="itemList" />

    <div class="main main1">
      <div class="title">录入区</div>
      <div class="line line1">
        <div class="item">
          车牌号：
          <a-input class="input" v-model="carID" />
        </div>
        <div class="item">
          型号：
          <a-input class="input" v-model="carType1" />
        </div>
        <div class="item">
          车型：
          <a-input class="input" v-model="carType2" />
        </div>
        <div class="item">
          保险日期：
          <a-date-picker class="date" @change="insuranceTimeChange" />
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
          <a-select default-value="chepai" style="width: 120px" @change="searchFactorChange">
            <a-select-option value="chepai">车牌</a-select-option>
            <a-select-option value="xinghao">型号</a-select-option>
            <a-select-option value="jiaolian">教练</a-select-option>
          </a-select>
          <a-input class="input" v-model="searchFactor" />
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
        <List :title='title' :theData="theData" />
      </div>
    </div>

  </div>
</template>


<script>
  import TabBar from "../../components/tabBar/TabBar";
  import List from '../../components/list/List'

  import { toGetCarList } from '../../network/network'

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
        title: ['车牌号', '型号', '登记日期', '保险时间'],
        theData: [
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
          ['001455', '捷达', '2020-20-20', '2010-08-04'],
        ],
        carID: "",
        carType1: "",
        carType2: "",
        insuranceTime: "",
        searchFactor: "",
        searchTime1: "",
        searchTime2: "",
      };
    },
    created() {
      this.getCarList()
    },
    methods: {
      getCarList() {
        toGetCarList().then(res => {
          console.log(res)
        })
      },
      insuranceTimeChange(value) {
        this.insuranceTime = value
      },
      addBtnClick() {

      },
      saveBtnClick() {

      },
      searchFactorChange(value) {
        this.searchFactor = value
      },
      searchTimeChange1(date, dateString) {
        this.searchTime1 = dateString
      },
      searchTimeChange2(date, dateString) {
        this.searchTime2 = dateString
      },
      searchBtnCLick() {
        
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