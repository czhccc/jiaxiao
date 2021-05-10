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
          约考科目：
          <a-select default-value="1" v-model="examType" style="width: 120px" @change="examTypeChange">
            <a-select-option value="1">科目一</a-select-option>
            <a-select-option value="2">科目二</a-select-option>
            <a-select-option value="3">科目三</a-select-option>
            <a-select-option value="4">科目四</a-select-option>
          </a-select>
        </div>
        <div class="item">
          带考教练：
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
          <a-button type="primary" class="btn" @click="searchBtnClick">查询</a-button>
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
      <div class="title">可约考学员条件</div>
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
          约考科目：
          <a-select default-value="1" v-model="examType2" style="width: 120px" @change="examTypeChange2">
            <a-select-option value="1">科目一</a-select-option>
            <a-select-option value="2">科目二</a-select-option>
            <a-select-option value="3">科目三</a-select-option>
            <a-select-option value="4">科目四</a-select-option>
          </a-select>
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="filterBtnClick">查询</a-button>
        </div>
      </div>
    </div>

    <div class="main main5">
      <div class="title">可约考学员列表</div>
      <div class="line">
        <div class="item">
          指定考试时间：
          <a-date-picker class="data1" @change="arrangeExamTimeChange" />
        </div>
        <div class="item">
          约考科目：
          <a-select default-value="1" v-model="arrangeExamType" style="width: 120px" @change="examTypeChange">
            <a-select-option value="1">科目一</a-select-option>
            <a-select-option value="2">科目二</a-select-option>
            <a-select-option value="3">科目三</a-select-option>
            <a-select-option value="4">科目四</a-select-option>
          </a-select>
        </div>
        <div class="item">
          带考教练：
          <a-select
            show-search
            option-filter-prop="children"
            style="width: 200px"
            @search="handleSearch2"
            @change="handleChange2" >
            <a-select-option v-for="(item, index) in trainerSearchArr2" :value="item.id" :key="index" >
              {{item.name}}
            </a-select-option>
          </a-select>
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="arrange">安排考试</a-button>
        </div>
      </div>
      <div class="list">
        <List :title="title2" :theData="listData2" @listItemClick="listItemClick" />
      </div>
    </div>

  </div>
</template>


<script>
  import List from '../../components/list/List'

  import { toSelectStudentGrade, toFindNoExamUser, toArrangeExam, toGetTrainerList } from '../../network/network'

  export default {
    name: 'Exam',
    components: {
      List
    },
    data () {
      return {
        title1: ['学员编号', '姓名', '性别', '证件号码', '科目考试'],
        listData1: [],
        title2: ['学员编号', '姓名', '性别', '证件号码', '联系方式'],
        listData2: [],
        examTime: "",
        examType: "1",
        examType2: "1",
        trainer: "",
        identityCard: "",
        name: "",
        trainerSearchArr: [],
        trainerSearchArr2: [],
        trainerSearchValue: "",
        trainerSearchValue2: "",
        arrangeTime: "",
        arrangeItem: {},
        arrangeExamType: "1",
      };
    },
    methods: {
      examTimeChange(date, dateString) { // 考试信息 考试时间
        this.examTime = dateString
      },
      arrangeExamTimeChange(date, dateString) { // 安排考试 时间
        this.arrangeTime = dateString
      },
      examTypeChange(value) { // 考试信息 约考科目
        this.examType = value
      },
      examTypeChange2(value) { // 可约考学员条件 约考科目
        this.examType = value
      },
      handleSearch(value) { // 考试信息 带考教练 的 模糊查询
        toGetTrainerList({
          name: value
        }).then(res => {
          console.log(res)
          this.trainerSearchArr = res.data.result
        })
      },
      handleChange(value) { // 考试信息 带考教练 
        this.trainerSearchValue = value
      },
      handleSearch2(value) { // 考试信息 带考教练 的 模糊查询
        toGetTrainerList({
          name: value
        }).then(res => {
          console.log(res)
          this.trainerSearchArr2 = res.data.result
        })
      },
      handleChange2(value) { // 考试信息 带考教练 
        this.trainerSearchValue2 = value
      },
      searchBtnClick() { // 考试信息 查询按钮
        toSelectStudentGrade({
          coachId: this.trainerSearchValue,
          level: this.examType,
          examDate: this.examTime,
        }).then(res => {
          console.log(res)
          let tempListArr = []
          for (const i of res.data.result) {
            let tempObj = {
              user_id: i.user_id,
              name: i.name,
              sex: (i.sex==0 ? '女' : '男'),
              identity_card: i.identity_card,
              level: i.level,
            }
            tempListArr.push(tempObj)
          }
          this.listData1 = tempListArr
        })
      },
      filterBtnClick() { // 可约考学员条件 查询按钮
        toFindNoExamUser({
          identityCard: this.identityCard,
          name: this.name,
          level: this.examType2
        }).then(res => {
          console.log(res)
          let tempListArr = []
          for (const i of res.data.result) {
            let tempObj = {
              user_id: i.id,
              name: i.name,
              sex: (i.sex==0 ? '女' : '男'),
              identity_card: i.identity_card,
              phone: i.phone,
            }
            tempListArr.push(tempObj)
          }
          this.listData2 = tempListArr
        })
      },
      listItemClick(item, index) { // 点击可约考学员列表项
        this.arrangeItem = item
        console.log(item)
      },
      arrange() { // 安排考试 按钮
        if(this.arrangeTime == '') {
          this.$message.info('请指定考试时间')
        } else if(this.trainerSearchValue2 == '') {
          this.$message.info('请指定带考教练')
        } else {
          toArrangeExam({
            userId: this.arrangeItem.user_id,
            coachId: this.trainerSearchValue2,
            level: this.examType2,
            examDate: this.arrangeTime
          }).then(res => {
            console.log(res)
            toSelectStudentGrade({
              coachId: this.trainerSearchValue,
              level: this.examType,
              examDate: this.examTime,
            }).then(res => {
              console.log(res)
              let tempListArr = []
              for (const i of res.data.result) {
                let tempObj = {
                  user_id: i.user_id,
                  name: i.name,
                  sex: (i.sex==0 ? '女' : '男'),
                  identity_card: i.identity_card,
                  level: i.level,
                }
                tempListArr.push(tempObj)
              }
              this.listData1 = tempListArr
            })
            toFindNoExamUser({
              identityCard: this.identityCard,
              name: this.name,
              level: this.examType2
            }).then(res => {
              console.log(res)
              let tempListArr = []
              for (const i of res.data.result) {
                let tempObj = {
                  user_id: i.id,
                  name: i.name,
                  sex: (i.sex==0 ? '女' : '男'),
                  identity_card: i.identity_card,
                  phone: i.phone,
                }
                tempListArr.push(tempObj)
              }
              this.listData2 = tempListArr
            })
          })
        }
      }
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