<template>
  <div id="login">

    <div class="text">XX驾校欢迎您</div>

    <div class="main">
      <div class="item">
        账号：
        <a-input v-model="account" class="input" placeholder="请输入账号" />
      </div>
      <div class="item">
        密码：
        <a-input-password v-model="password" class="input" placeholder="请输入6位数以上密码" />
      </div>

      <a-button class="btn" @click="btnClick" type="primary">
        登录
      </a-button>

      <div class="forgetPassword" @click="forgetPassword">
        忘记密码？点击找回
      </div>
    </div>

  </div>
</template>


<script>
  // 导入组件、函数等
  import { toLogin } from '../../network/network'

  export default {
    name: 'Login', // 当前组件在vue插件中显示的名称，
    components: { // 导入的组件需要在此注册
    },
    data () { // 当前组件中定义的变量
      return {
        account: '793210471@qq.com',
        password: '1234567'  
      };
    },
    created() { // 组件生命周期函数之一
      let loginAccout = sessionStorage.getItem('loginAccount')
      if (loginAccout == '') {
        this.$router.replace('/login')
      }
    },
    methods: { // 当前组件定义的函数
      btnClick() {
        if(this.account == '') {
          this.$message.info('请输入账号');
        } else {
          if (this.password == '') {
            this.$message.info('请输入密码');
          } else {
            toLogin({
              'email': this.account,
              'password': this.password
            }).then(res => {
              console.log(res)
              if(res.data.code == '200') {
                sessionStorage.setItem('loginAccount', this.account)
                this.$router.push('/home')
              } else {
                this.$message.info('登录失败');
              }
            })
          }
        }
      },
      forgetPassword() { // 跳转到忘记密码页面
        this.$router.push('/forgetPassword')
      }
    },
  }
</script>

<style scoped lang="less">
  #login {
    width: 100%;
    position: fixed;
    .text {
      font-size: 48px;
      position: absolute;
      margin-top: 5%;
    }
    .main {
      width: 400px;
      height: 270px;
      text-align: center; 
      position: absolute;
      right: 25%;
      margin-top: 5%;
      border: 1px solid black;
      .item {
        margin-top: 30px;
        .input {
          width: 70%;
        }
      }
      .btn {
        margin-top: 30px;
        width: 80%;
      }
      .forgetPassword {
        cursor: pointer;
        margin-top: 30px;
      }
    }
  }
</style>