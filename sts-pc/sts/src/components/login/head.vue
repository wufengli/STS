<template>
  <div class="NavHead">
    <nav>
      <div class="logo"></div>
      <div class="telephone">
        <span class="phone"></span>
        <span class="hotline">联系热线：400-800-4488</span>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'headNav'
}
</script>

<style lang="less" scoped>
.NavHead{
  width:100%;
  height:3.2rem;
  background: #262626;
  font-size: 18px;
  color:#fff;
  line-height: 3.2rem;
  nav{
    width:100%;
    height:100%;
    display: flex;
    justify-content: space-between;
    .logo{
      width: 7rem;
      height:100%;
      margin-left: 0.5rem;
      background:url('../../assets/imgs/login/logo.png') no-repeat center;
      box-sizing: border-box;
    }
    .telephone{
      margin-right: 1rem;
      display: flex;
      .phone{
        display: inline-block;
        width:1.4rem;
        height:100%;
        background:url('../../assets/imgs/login/phone.png') no-repeat center;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
