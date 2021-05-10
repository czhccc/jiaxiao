<template>
  <div id="studentDropOut">

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
      <div class="title">学员基本信息</div>
      <div class="line line1">
        <div class="item">
          学员编号：
          <a-input disabled v-model="studentID" class="input" />
        </div>
        <div class="item">
          学员状态：
          <div class="status" >{{studentStatus}}</div>
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
          退学日期：
          <a-date-picker disabled class="data1" :default-value="moment(new Date(), 'YYYY-MM-DD')" />
        </div>
        <div class="item">
          <a-button type="primary" @click="confirmDropOutBtnClick">确认退学</a-button>
        </div>
      </div>
    </div>

    <a-drawer
      title="学生详细信息"
      placement="right"
      :closable="false"
      :visible="visible"
      @close="onClose" >
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

  </div>
</template>


<script>
  import List from '../../components/list/List'

  import moment from 'moment'

  import { toGetStudentList, toGetStudentPersonalData, toStudentDropOut } from '../../network/network'

  export default {
    name: 'studentDropOut',
    components: {
      List
    },
    props: {
      
    },
    data () {
      return {
        title: ['学员编号', '姓名', '性别', '身份证号', '出生日期', '联系地址', '联系电话'],
        theData: [],
        searchFactor: "name",
        searchFactorValue: "",
        searchTime1: "",
        searchTime2: "",
        studentID: "",
        studentStatus: "",
        name: "",
        identityCard: "",
        sex: "0",
        birthday: "",
        address: "",
        phone: "",
        studentID: "",

        visible: false,
        studentPersonalData: {}
      };
    },
    created() {
      this.getStudentList()
    },
    methods: {
      moment,
      getStudentList() { // 获取学生列表
        toGetStudentList().then(res => {
          console.log(res)
          let tempArr = []
          for (const i of res.data.result) {
            let tempObj = {
              studentID: i.id,
              name: i.name,
              sex: i.sex,
              identityCard: i.identityCard,
              birthday: moment(i.birth*1000).format('YYYY-MM-DD'),
              address: i.address,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      searchFactorChange(value) { // 学员检索 检索条件改变
        this.searchFactor = value
      },
      searchTimeChange1(date, dateString) { // 学员检索 时间1
        this.searchTime1 = dateString
      },
      searchTimeChange2(date, dateString) { // 学员检索 时间2
        this.searchTime2 = dateString
      },
      searchBtnClick() { // 点击 学员检索 查询按钮
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
              birthday: moment(i.birth*1000),
              address: i.address,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      confirmDropOutBtnClick() { // 确认退学 按钮
        toStudentDropOut({
          id: this.studentID,
          email: sessionStorage.getItem('loginAccount')
        }).then(res => {
          if(res.data.code == '200') {
            this.$message.info('退学成功')
            this.studentID = ""
            this.name = "",
            this.identityCard = "",
            this.phone = ""
            this.studentStatus = ""
            this.getStudentList()
          } else {
            this.$message.info('操作失败')
          }
        })
      },
      listItemClick(item) { // 点击列表项
        console.log(item)
        this.name = item.name
        this.identityCard = item.identityCard
        this.sex = item.sex
        this.birthday = "2021-4-15"
        this.address = item.address
        this.phone = item.phone
        this.studentID = item.studentID
        this.studentStatus =  "已受理"
      },
      listItemDbclick(item) { // 双击列表项
        console.log(item)
        toGetStudentPersonalData({id: item.studentID}).then(res => {
          console.log(res)
          this.studentPersonalData = res.data.result
          this.showDrawer()
        })
      },
      showDrawer() { // 双击列表项后显示
        this.visible = true;
      },
      onClose() {
        this.visible = false;
      },
    },
  }
</script>

<style scoped lang="less">
  #studentDropOut {
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
        .btn {
          width: 100px;
        }
      }
    }
    .main2 {
      .status {
        font-size: 24px;
        color: cyan;
      }
      .line3 {
        margin-left: 53%;
      }
    }
  }
</style>