<template>
  <div id="trainerRate">

     <div class="main main2">
      <div class="title">教练检索</div>
      <div class="line">
        <div class="item">
          姓名：
          <a-input class="input" v-model="searchName" />
        </div>
        <div class="item">
          时间段：
          <a-input class="input" v-model="searchYear" placeholder="请输入年份" />
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="searchBtnClick">查询</a-button>
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
  import List from '../../components/list/List'

  import { toGetTrainerRateList } from '../../network/network'

  export default {
    name: 'trainerRate',
    components: {
      List
    },
    data () {
      return {
        title: ['姓名', '身份证号', '科目二通过率', '科目三通过率', '总通过率'],
        theData: [],
        searchYear: "2021",
        searchName: "",
      };
    },
    created() {
      this.getTrainerRateList()
    },
    methods: {
      getTrainerRateList() { // 获取列表
        toGetTrainerRateList({
          year: '2021'
        }).then(res => {
          console.log(res)
          let tempArr = []
          for (let i=0; i<res.data.result.length; i++) {
            let j = res.data.result[i]
            let tempObj = {
              name: j.name,
              shenfen: j.identity_card,
              kemu2: (j.er_yes_num / j.er_num).toFixed(3),
              kemu3: (j.san_yes_num / j.san_num).toFixed(3),
              zong: ((j.er_yes_num + j.san_yes_num) / (j.er_num + j.san_num)).toFixed(3),
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      searchFactorChange(value) { // 姓名
        this.searchFactor = value
      },
      searchTimeChange(value) { // 搜索时间
        this.searchTime1 = value
      },
      searchBtnClick() { // 查询按钮
        if(this.searchYear == '') {
          this.$message.info('请输入年份')
        } else {
          toGetTrainerRateList({
            name: this.searchName,
            year: this.searchYear,
          }).then(res => {
            console.log(res)
            let tempArr = []
            for (let i=0; i<res.data.result.length; i++) {
              let j = res.data.result[i]
              let tempObj = {
                name: j.name,
                shenfen: j.identity_card,
                kemu2: (j.er_yes_num / j.er_num).toFixed(3),
                kemu3: (j.san_yes_num / j.san_num).toFixed(3),
                zong: ((j.er_yes_num + j.san_yes_num) / (j.er_num + j.san_num)).toFixed(3),
              }
              tempArr.push(tempObj)
            }
            this.theData = tempArr
          })
        }
      },
    },
  }
</script>

<style scoped lang="less">
  #trainerRate {
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