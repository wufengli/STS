<template>
  <div class="content">
    <div class="login-box">
      <div class="title"></div>
      <div class="row user">
        <span class="icon"></span>
        <input type="text" placeholder="请输入用户名" id="user" class="input" v-model="Userinfo.userName">
      </div>
      <div class="row password">
        <span class="icon password"></span>
        <input type="password" placeholder="请输入密码" id="password" class="input" v-model="Userinfo.userPassword">
      </div>
      <div class="row login">
        <button class="btn" @click="submit">登 录</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import Api from '@/api/api'
export default {
  name: 'login',
  data () {
    return {
      Userinfo: {
        userName: '',
        userPassword: ''
      }
    }
  },
  methods: {
    submit () {
      this.$post('/api/userinfo/login/', this.Userinfo)
        .then((response) => {
          console.log(response)
          if (response.userId) {
            console.log('登录成功')
            Api.setCookie('userName', response.userName, 7)
            Api.setCookie('userPassword', response.userPassword, 7)
            this.setUserId(response.userId)
            this.setUserName(response.userName)
            this.$router.push('/')
          } else {
            console.log('用户名或密码错误')
          }
        })
    },
    ...mapMutations(['setUserId', 'setUserName'])
  }
}
</script>

<style lang="less" scoped>
.content{
  flex: 1;
  background: #262626;
  .login-box{
    position: absolute;
    left:50%;
    top:50%;
    width: 21.8rem;
    height: 18rem;
    padding: 2rem 2.7rem;
    box-sizing: border-box;
    margin-top:-9rem;
    margin-left: -10.9rem;
    background: rgba(46, 49, 53, 0.5);
    .title{
      background:url("../../assets/imgs/login/loginBox-title.png") no-repeat left;
      width:100%;
      height:2rem;
    }
    .row{
      height:2.7rem;
      margin:1rem 0rem;
      display: flex;
      .icon{
        display: inline-block;
        height:100%;
        width: 2.7rem;
        background:#fba603 url("../../assets/imgs/login/username.png") no-repeat center;
        border-bottom-left-radius:0.3rem;
        border-top-left-radius:0.3rem;
        &.password{
          background:#fba603 url("../../assets/imgs/login/password.png") no-repeat center;
        }
      }
      .input{
        flex: 1;
        height:100%;
        background:#262626;
        border:none;
        padding:0.1rem 0.4rem;
        border-bottom-right-radius:0.3rem;
        border-top-right-radius:0.3rem;
        font-size: 0.7rem;
        border:1px solid #828486;
        border-left:none;
        box-sizing:border-box;
        color:#fff;
      }
      .btn{
        flex: 1;
        background: #00a0e9;
        border:none;
        outline-style: none;
        color:#fff;
        border-radius:0.2rem;
        font-size: 1.1rem;
        font-weight:400
      }
    }
  }
}
</style>
