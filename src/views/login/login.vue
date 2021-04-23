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
  import { toLogin } from '../../network/network'

  export default {
    name: 'Login',
    components: {
    },
    data () {
      return {
        account: '793210471@qq.com',
        password: '1234567'  
      };
    },
    created() {
      let loginAccout = sessionStorage.getItem('loginAccount')
      if (loginAccout == '') {
        this.$router.replace('/login')
      }
    },
    methods: {
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
      forgetPassword() {
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