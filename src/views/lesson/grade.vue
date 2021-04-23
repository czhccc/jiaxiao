<template>
  <div id="grade">

    <div class="main main1">
      <div class="title">送考相关信息</div>
      <div class="line line1">
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
          指定考试时间：
          <a-date-picker class="data1" @change="examTimeChange" />
        </div>
        <div class="item">
          指定带考教练：
          <a-input class="input" v-model="trainer" />
        </div>
        <div class="item">
          指定学员姓名：
          <a-input class="input" v-model="studentName" />
        </div>
        <div class="item">
          <a-button type="primary" @click="showBtnClick">显示记录</a-button>
        </div>
      </div>
    </div>

    <div class="main main2">
      <div class="title">考试结果成绩登记</div>
      <div class="line">
        <div class="item">
          <a-button type="primary" class="btn" @click="examPass">考试合格</a-button>
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="examFail">不合格</a-button>
        </div>
      </div>
    </div>

    <div class="main main3">
      <div class="list">
        <List :title="title" :theData="listData" />
      </div>
    </div>

  </div>
</template>


<script>
  import List from '../../components/list/List'

  export default {
    name: 'Grade',
    components: {
      List
    },
    data () {
      return {
        title: ['学员编号', '姓名', '性别', '证件号码', '业务类型', '考试科目', '考试成绩'],
        listData: [
          ['0000065465413', '张三', '女', '3306843154651', 'A1', '科目一', '99'],
          ['0000065465413', '张三', '女', '3306843154651', 'A1', '科目一', '99'],
          ['0000065465413', '张三', '女', '3306843154651', 'A1', '科目一', '99'],
          ['0000065465413', '张三', '女', '3306843154651', 'A1', '科目一', '99'],
          ['0000065465413', '张三', '女', '3306843154651', 'A1', '科目一', '99'],
        ],
        examType: "",
        examTime: "",
        trainer: "",
        studentName: "",
      };
    },
    methods: {
      examTypeChange(value) {
        this.examType = value
      },
      examTimeChange(date, dateString) {
        this.examTime = dateString
      },
      showBtnClick() {

      },
      examPass() {

      },
      examFail() {

      },
    },
  }
</script>

<style scoped lang="less">
  #grade {
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