<template>
  <div class="index">
    <img src="@imgs/home/index.png" alt="" class="title">
    <div class="map">
    </div>
  </div>

</template>
<script>
export default {
  name: 'index'
}
</script>
<style lang="less" scoped>
.index {
  position: relative;
  background-image: url(../assets/imgs/home/bg.png);
  background-size: cover;
  height: 100vh;
  .title {
    position: absolute;
    top: calc(50% - 2rem);
    left: 5rem;
  }
  .map {
    width: 43.8rem;
    height: 19.95rem;
    background: url(../assets/imgs/home/map.png);
    position: absolute;
    top: calc(50% - 6.825rem);
    right: 5rem;
  }
}
</style>
