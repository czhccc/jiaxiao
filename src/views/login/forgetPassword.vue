<template>
  <div id="forgetPassword">

    <div class="main">
      <div class="item">
        email：
        <a-input v-model="email" class="input" placeholder="请输入邮箱" />
      </div>
      <div class="item">
        验证码：
        <div class="temp">
          <a-input v-model="yzm" class="input" placeholder="请输入验证码" />
          <a-button class="sys" @click="yzmClick" type="primary">
            发送验证码
          </a-button>
        </div>
      </div>
      <div class="item">
        密码：
        <a-input-password v-model="password" class="input" placeholder="请输入6位数以上的新密码" />
      </div>
      <div class="item">
        确认密码：
        <a-input-password v-model="confirmPassword" class="input" placeholder="请确认密码" />
      </div>
      <div class="item">
        <a-button class="btn" @click="completeClick" type="primary">
          完成
        </a-button>
      </div>
    </div>

  </div>
</template>


<script>
  import { toModifyPassword, toCompleteModifyPassword } from '../../network/network'

  export default {
    name: 'ForgetPassword',
    components: {
      
    },
    data () {
      return {
        email: '',
        yzm: '',
        password: '',
        confirmPassword: ''
      };
    },
    methods: {
      yzmClick() { // 发送验证码按钮
        if(this.email == '') {
          this.$message.info('请输入邮箱')
        } else {
          toModifyPassword({
            "receiveMailAccount": this.email, 
            "isForget": "true"
          }).then(res => {
            console.log(res)
          })
        }
      },
      completeClick() { // 完成按钮
        if(this.password !== this.confirmPassword) {
          this.$message.info('确认密码错误')
        }
        if(this.password.length <= 6) {
          this.$message.info('请输入6位数以上的密码')
        } else {
          toCompleteModifyPassword({
            "email": this.email, 
            "password": this.password, 
            "record": this.yzm
          }).then(res => {
            console.log(res)
            if(res.data == 200) {
              this.$message.info('密码修改成功')
            } else {
              this.$message.info(res.data)
            }
          })
        }
      }
    },
  }
</script>

<style scoped lang="less">
  #forgetPassword {
    .main {
      width: 500px;
      padding: 30px;
      text-align: center; 
      position: absolute;
      left: 35%;
      margin-top: 5%;
      border: 1px solid black;
      .item {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;
        .temp {
          width: 60%;
          display: flex;
          align-items: center;
        }
        .input {
          width: 60%;
        }
        .sys {
          width: 100px;
        }
      }
      .btn {
        width: 100%;
      }
      .forgetPassword {
        cursor: pointer;
        margin-top: 30px;
      }
    }
  }
</style>