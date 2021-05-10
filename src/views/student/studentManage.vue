<template>
  <div id="studentManage">

    <TabBar :itemList="itemList" />

    <div class="manage" v-if="this.$route.path == '/student/studentManage'">
      <div class="main main1">
        <div class="title">学员信息编辑、录入</div>
        <div class="content">
          <div class="line line1">
            <div class="item">
              姓名：
              <a-input v-model="name" class="input" />
            </div>
            <div class="item">
              身份证：
              <a-input v-model="identityCard" class="input" />
            </div>
            <div class="item">
              性别：
              <a-select default-value="0" v-model="sex" style="width: 120px" @change="sexChange">
                <a-select-option value="0">女</a-select-option>
                <a-select-option value="1">男</a-select-option>
              </a-select>
            </div>
            <div class="item">
              出生日期：
              <a-date-picker class="date" v-model="birthday" @change="birthdayChange" />
            </div>
          </div>
          <div class="line line2">
            <div class="item">
              地址：
              <a-input v-model="address" class="input" />
            </div>
            <div class="item">
              联系电话：
              <a-input v-model="phone" class="input" />
            </div>
            <div class="item">
              学员编号：
              <a-input v-model="studentID" class="input" disabled />
            </div>
          </div>
          <div class="line line3">
            <div class="item">
              <a-button class="btn" type="primary" @click="addBtnClick">增加</a-button>
            </div>
            <div class="item">
              <a-button class="btn" type="primary" @click="saveBtnClick">保存</a-button>
            </div>
          </div>
        </div>
      </div>

      <div class="main main2">
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
            <a-date-picker class="data1" @change="searchTime1Change" />
            至
            <a-date-picker class="data2" @change="searchTime2Change" />
          </div>
          <div class="item">
            <a-button type="primary" class="btn" @click="searchBtnClick">查询</a-button>
          </div>
        </div>
      </div>

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

    <keep-alive>
      <router-view />
    </keep-alive>

  </div>
</template>


<script>
  import TabBar from "../../components/tabBar/TabBar";
  import List from '../../components/list/List'

  import moment from 'moment'

  import { toGetStudentList, toAddStudentData, toUpdateStudentData, toGetStudentPersonalData } from '../../network/network'

  export default {
    name: 'studentManage',
    components: {
      TabBar,
      List
    },
    data () {
      return {
        itemList: [
          {value: '学员管理', path: '/student/studentManage'},
          {value: '学员退学', path: '/student/studentDropOut'},
          {value: '学员结业', path: '/student/studentGraduation'},
        ],
        title: ['学员编号', '姓名', '性别', '身份证号', '出生日期', '联系地址', '联系电话'],
        theData: [
          ['001455', '张三', '男', '3358743235131321', '1999-99-99', '青青草原羊村', '1546852358'],
          ['001455', '张三', '男', '3358743235131321', '1999-99-99', '青青草原羊村', '1546852358'],
        ],
        name: "",
        identityCard: "",
        sex: "0",
        birthday: "",
        address: "",
        phone: "",
        studentID: "",
        searchFactor: "name",
        searchFactorValue: "",
        searchTime1: "",
        searchTime2: "",

        visible: false,
        studentPersonalData: {}
      };
    },
    computed: {
      
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
              birthdayList: moment(i.birth*1000).format('YYYY-MM-DD'),
              address: i.address,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      sexChange(value) { // 性别
        this.sex = value
      },
      birthdayChange(date, dateString) { // 出生日期
        this.birthday = dateString
      },
      searchFactorChange(value) { // 检索条件改变
        this.searchFactor = value 
      },
      searchTime1Change(date, dateString) { // 学员检索 时间1
        console.log(dateString)
        this.searchTime1 = dateString
      },
      searchTime2Change(date, dateString) { // 学员检索 时间2
        this.searchTime2 = dateString
      },
      addBtnClick() { // 增加按钮
        toAddStudentData({
          id: this.studentID, 
          name: this.name, 
          phone: this.phone, 
          sex: this.sex, 
          address: this.address, 
          IDCard: this.identityCard, 
          birth: this.birthday.format('YYYY-MM-DD'), 
        }).then(res => {
          console.log(res)
          if (res.data.code == '200') {
            this.$message.info('增加成功')
            this.studentID = ""
            this.name = ""
            this.phone = ""
            this.address = ""
            this.identityCard = ""
            this.birthday = ""
            this.getStudentList()
          } else {
            this.$message.info('增加失败')
          }
        })
      },
      saveBtnClick() { // 保存按钮
        toUpdateStudentData({ 
          id: this.studentID, 
          name: this.name, 
          phone: this.phone, 
          sex: this.sex, 
          address: this.address, 
          identityCard: this.identityCard, 
          birth: this.birthday, 
        }).then(res => {
          if (res.data.code == '200') {
            this.$message.info('修改成功')
            this.getStudentList()
          } else {
            this.$message.info('修改失败')
          }
        })
      },
      searchBtnClick() { // 查询按钮
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
              birthdayList: moment(i.birth*1000).format('YYYY-MM-DD'),
              address: i.address,
              phone: i.phone,
            }
            tempArr.push(tempObj)
          }
          this.theData = tempArr
        })
      },
      listItemClick(item) { // 点击列表项
        console.log(moment(item.birthdayList).format('YYYY-MM-DD'))
        // console.log(moment(moment(item.birthdayList).unix()).format('YYYY-MM-DD'))
        this.name = item.name
        this.identityCard = item.identityCard
        this.sex = item.sex
        this.birthday = moment(item.birthdayList),
        this.address = item.address
        this.phone = item.phone
        this.studentID = item.studentID
      },
      listItemDbclick(item) { // 双击列表项
        console.log(item)
        toGetStudentPersonalData({id: item.studentID}).then(res => {
          console.log(res)
          let i = res.data.result
          let tempObj = {
            name: i.name,
            identityCard: i.identityCard,
            createDate: moment(i.createDate*1000).format('YYYY-MM-DD'),
            status: i.status,
            nextExam: i.nextExam
          }
          this.studentPersonalData = tempObj
          this.showDrawer()
        })
      },
      showDrawer() {  // 控制双击列表项后的右边信息栏显示
        this.visible = true;
      },
      onClose() {  // 控制双击列表项后的右边信息栏关闭
        this.visible = false;
      },
    },
  }
</script>

<style scoped lang="less">
  #studentManage {
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
      .line3 {
        margin-left: 54%;
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