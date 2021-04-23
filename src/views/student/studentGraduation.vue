<template>
  <div id="studentGraduation">

    <div class="main main1">
      <div class="title">学员检索</div>
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
          <a-date-picker class="data1" @change="searchTimeChange1" />
          至
          <a-date-picker class="data2" @change="searchTimeChange2" />
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="searchBtnClick">查询</a-button>
        </div>
      </div>
    </div>

    <div class="main main2">
      <div class="title">结业操作</div>
      <div class="line line1">
        <div class="item">
          学员编号：
          <a-input disabled class="input" v-model="studentID" />
        </div>
        <div class="item">
          学员状态：
          <div class="status">科目二合格{{studentStatus}}</div>
        </div>
        <div class="item">
          受理人：
          <a-input disabled class="input" v-model="handler" />
        </div>
      </div>
      <div class="line line2">
        <div class="item">
          姓名：
          <a-input disabled class="input" v-model="name" />
        </div>
        <div class="item">
          性别：
          <a-select default-value="0" v-model="sex" style="width: 120px" disabled>
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
          结业证号（驾照号）：
          <a-input class="input" v-model="licenseNumber" />
        </div>
        <div class="item">
          结业时间：
          <a-date-picker class="data1" :default-value="moment(new Date(), 'YYYY-MM-DD')" @change="graduationTimeChange" />
        </div>
        <div class="item">
          <a-button type="primary" class="btn" @click="graduationBtnClick">结业</a-button>
        </div>
      </div>
    </div>

    <a-drawer
      title="学生详细信息"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose"
    >
      <p>姓名：{{studentPersonalData.name}}</p>
      <p>身份证号码：{{studentPersonalData.identityCard}}</p>
      <p>报名时间：{{studentPersonalData.createDate}}</p>
      <p>当前状态：{{studentPersonalData.status || '暂无'}}</p>
      <p>下一场考试：{{studentPersonalData.nextExam || '暂无'}}</p>
    </a-drawer>

    <div class="main main3">
      <div class="title">列表</div>
      <div class="list">
        <List :title='title' :theData="theData" @listItemClick="listItemClick" @listItemDbclick="listItemDbclick" />
      </div>
    </div>

  </div>
</template>


<script>
  import List from '../../components/list/List'

  import moment from 'moment'

  import { toGetStudentList, toGetStudentPersonalData, toStudentGraduation } from '../../network/network'

  export default {
    name: 'studentGraduation',
    components: {
      List
    },
    props: {
      
    },
    data () {
      return {
        title: ['学员编号', '姓名', '性别', '身份证号', '出生日期', '联系地址', '联系电话'],
        theData: [
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
          ['001455', '张三', '男', '3358743235131321', '', '1546852358', 'C1'],
        ],
        searchFactor: "name",
        searchFactorValue: "",
        searchTime1: "",
        searchTime2: "",
        studentID: "",
        studentStatus: "",
        handler: sessionStorage.getItem('loginAccount'),
        name: "",
        sex: "",
        identityCard: "",
        phone: "",
        licenseNumber: "",
        graduationTime: "",

        visible: false,
        studentPersonalData: {}
      };
    },
    created() {
      this.getStudentList()
    },
    methods: {
      moment,
      getStudentList() {
        toGetStudentList().then(res => {
          console.log(res)
          let tempArr = []
          for (const i of res.data.result) {
            let tempObj = {
              studentID: i.id,
              name: i.name,
              sex: i.sex,
              identityCard: i.identityCard,
              birthday: i.birth,
              address: i.address,
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
      searchTimeChange1(date, dateString) {
        this.searchTime1 = dateString
      },
      searchTimeChange2(date, dateString) {
        this.searchTime2 = dateString
      },
      searchBtnClick() {
        console.log(this.searchFactorValue)
        console.log(this.searchFactor)
        toGetStudentList({
          [this.searchFactor]: this.searchFactorValue,
          createDate: this.searchTime1,
          endDate: this.searchTime2
        }).then(res => {
          console.log(res)
          let tempArr = []
          for (const i of res.data.result) {
            let tempObj = {
              studentID: i.id,
              name: i.name,
              sex: i.sex,
              identityCard: i.identityCard,
              birthday: i.birth,
              address: i.address,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      graduationTimeChange(date, dateString) {
        this.graduationTime = dateString
      },
      graduationBtnClick() {
        if (this.studentID == '') {
          this.$message.info('请填入学生信息')
        } else if (this.licenseNumber == '') {
          this.$message.info('请输入驾照号')
        } else {
          toStudentGraduation({
            id: this.studentID,
            email: sessionStorage.getItem('loginAccount'),
            license: this.license
          }).then(res => {
            if (res.data.code == '200') {
              this.$message.info('结业成功')
              this.getStudentList()
            } else {
              this.$message.info('操作失败')
            }
          })
        }
      },
      listItemClick(item) {
        this.studentID = item.studentID
        this.name = item.name
        this.identityCard = item.identityCard
        this.sex = item.sex
        this.birthday = "2021-4-15"
        // this.birthday = item.birth
        this.address = item.address
        this.phone = item.phone
      },
      listItemDbclick(item) {
        toGetStudentPersonalData({id: item.studentID}).then(res => {
          console.log('222')
          console.log(res)
          this.studentPersonalData = res.data.result
          this.showDrawer()
        })
      },
      showDrawer() {
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
    },
  }
</script>

<style scoped lang="less">
  #studentGraduation {
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
      .line3 {
        
      }
    }
    .main3 {

    }
  }
</style>