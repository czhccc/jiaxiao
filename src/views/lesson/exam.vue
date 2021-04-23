<template>
  <div id="exam">

    <div class="main main1">
      <div class="title">考试信息</div>
      <div class="line">
        <div class="item">
          考试时间：
          <a-date-picker class="data1" @change="examTimeChange" />
        </div>
        <div class="item">
          考约科目：
          <a-select default-value="one" style="width: 120px" @change="examTypeChange">
            <a-select-option value="one">科目一</a-select-option>
            <a-select-option value="two">科目二</a-select-option>
            <a-select-option value="three">科目三</a-select-option>
            <a-select-option value="four">科目四</a-select-option>
          </a-select>
        </div>
        <div class="item">
          带考教练：
          <a-input class="input" v-model="trainer" />
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="searchBtnClick">查询</a-button>
        </div>
      </div>
    </div>

    <div class="main main2">
      <div class="title">科目</div>
      <div class="line">
        <div class="item">
          <a-button type="primary" class="btn" @click="examTypeOneClick">科目一</a-button>
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="examTypeTwoClick">科目二</a-button>
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="examTypeThreeClick">科目三</a-button>
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="examTypeFourClick">科目四</a-button>
        </div>
      </div>
    </div>

    <div class="main main3">
      <div class="title">已约考学员列表</div>
      <div class="list">
        <List :title="title1" :theData="listData1" />
      </div>
    </div>

    <div class="main main4">
      <div class="title">约考学员条件</div>
      <div class="line">
        <div class="item">
          指定身份证：
          <a-input class="input" v-model="identityCard" />
        </div>
        <div class="item">
          指定姓名：
          <a-input class="input" v-model="name" />
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="filterBtnClick">过滤</a-button>
        </div>
      </div>
    </div>

    <div class="main main5">
      <div class="title">已约考学员列表</div>
      <div class="list">
        <List :title="title2" :theData="listData2" />
      </div>
    </div>

  </div>
</template>


<script>
  import List from '../../components/list/List'

  export default {
    name: 'Exam',
    components: {
      List
    },
    data () {
      return {
        title1: ['学员编号', '姓名', '性别', '证件号码', '科目考试'],
        listData1: [
          ['0000132131', '张三', '女', '56413213', '科目一'],
          ['0000132131', '张三', '女', '56413213', '科目一'],
          ['0000132131', '张三', '女', '56413213', '科目一'],
          ['0000132131', '张三', '女', '56413213', '科目一'],
        ],
        title2: ['学员编号', '姓名', '性别', '证件号码', '联系方式'],
        listData2: [
          ['0000132131', '张三', '女', '56413213', '13864654654'],
          ['0000132131', '张三', '女', '56413213', '13864654654'],
          ['0000132131', '张三', '女', '56413213', '13864654654'],
          ['0000132131', '张三', '女', '56413213', '13864654654'],
        ],
        examTime: "",
        examType: "",
        trainer: "",
        identityCard: "",
        name: "",
      };
    },
    methods: {
      examTimeChange(date, dateString) {
        this.examTime = dateString
      },
      examTypeChange(value) {
        this.examType = value
      },
      searchBtnClick() {

      },
      examTypeOneClick() {

      },
      examTypeTwoClick() {

      },
      examTypeThreeClick() {

      },
      examTypeFourClick() {

      },
      filterBtnClick() {

      },
    },
  }
</script>

<style scoped lang="less">
  #exam {
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
  }
</style>