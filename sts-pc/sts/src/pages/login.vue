<template>
  <div class="login">
    <login-head/>
    <login-content/>
    <login-footer/>
  </div>
</template>

<script>
import LoginHead from '@/components/login/head'
import LoginContent from '@/components/login/content'
import LoginFooter from '@/components/login/footer'
export default {
  name: 'login',
  components: {
    LoginHead,
    LoginContent,
    LoginFooter
  }
}
</script>
<style lang="less" scoped>
.login{
  position: absolute;
  width:100%;
  height: 100%;
  top:0;
  left:0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
}
</style>
