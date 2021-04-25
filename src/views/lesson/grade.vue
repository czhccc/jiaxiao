<template>
  <div id="grade">

    <div class="main main1">
      <div class="title">送考相关信息</div>
      <div class="line line1">
        <div class="item">
          考约科目：
          <a-select default-value="1" v-model="examType" style="width: 120px" @change="examTypeChange">
            <a-select-option value="1">科目一</a-select-option>
            <a-select-option value="2">科目二</a-select-option>
            <a-select-option value="3">科目三</a-select-option>
            <a-select-option value="4">科目四</a-select-option>
          </a-select>
        </div>
        <div class="item">
          指定考试时间：
          <a-date-picker class="data1" @change="examTimeChange" />
        </div>
        <div class="item">
          指定带考教练：
          <a-select
            show-search
            option-filter-prop="children"
            style="width: 200px"
            @search="handleSearch"
            @change="handleChange" >
            <a-select-option v-for="(item, index) in trainerSearchArr" :value="item.id" :key="index" >
              {{item.name}}
            </a-select-option>
          </a-select>
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
        <List :title="title" :theData="listData" @listItemClick="listItemClick" />
      </div>
    </div>

  </div>
</template>


<script>
  import List from '../../components/list/List'

  import { toSelectStudentGrade, toGetTrainerList, toAdapterStudentGrade } from '../../network/network'

  export default {
    name: 'Grade',
    components: {
      List
    },
    data () {
      return {
        title: ['学员编号', '姓名', '性别', '证件号码', '考试科目', '考试成绩'],
        listData: [],
        studentData: [],
        examType: "1",
        examTime: "",
        trainerName: "",
        studentName: "",
        trainerSearchValue: '',
        trainerSearchArr: [],
        currentListIndex: '',
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
        toSelectStudentGrade({
          coachId: this.trainerSearchValue,
          level: this.examType,
          name: this.studentName,
          examDate: this.examTime,
        }).then(res => {
          console.log(res)
          let tempListArr = []
          let tempStudentArr = []
          for (const i of res.data.result) {
            let tempObj = {
              user_id: i.user_id,
              name: i.name,
              sex: (i.sex==0 ? '女' : '男'),
              identity_card: i.identity_card,
              level: i.level,
              grade: i.grade
            }
            tempListArr.push(tempObj)
            tempStudentArr.push(i)
          }
          this.listData = tempListArr
          this.studentData = tempStudentArr
        })
      },
      examPass() {
        toAdapterStudentGrade({
          id: this.studentData[this.currentListIndex].exam_id,
          userId: this.studentData[this.currentListIndex].user_id,
          grade: true,
          level: this.examType
        }).then(res => {
          console.log(res)
        })
      },
      examFail() {

      },
      handleSearch(value) {
        toGetTrainerList({
          name: value
        }).then(res => {
          console.log(res)
          this.trainerSearchArr = res.data.result
        })
      },
      handleChange(value) {
        this.trainerSearchValue = value
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
      listItemClick(item, index) {
        this.currentListIndex = index
        console.log(index)
      }
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