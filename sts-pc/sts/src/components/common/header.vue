<template>
  <div class="header">
    <div class="section">
      <div class="nav">
        <router-link class="logo" to="/">
          <img src="@imgs/header/logo.png" alt="九州通物流">
        </router-link>
        <div class="navwrap">
          <div class="nav-all">
            <div class="nav-all-btn">
              <i class="el-icon-mo-websiteNavigation"></i>
            </div>
          </div>
          <div class="main-nav" @mouseleave="hideItem">
            <ul class="menu">
              <li v-for="(item, index) of menu" :key="index">
                <div class="main-nav-wrap" @mouseenter="showItem(item)">
                  <span class="nav-router">{{ item.title }}</span>
                  <div class="leader" v-if="item.state"></div>
                </div>
              </li>
            </ul>
            <ul class="menu-item" v-if="showitem" @mouseenter="enterItem" @mouseleave="leaveItem">
              <li v-for="(item, index) of menuItem" :key="index" class="menu-item-li">
                <div class="main">
                  {{ item.main }}
                </div>
                <div v-for="(items, indexs) of item.content" :key="indexs" @click="toHideItem">
                  <router-link class="content" :to="items.link">{{ items.tip }}</router-link>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="userInfo">
        <div class="userAccount">
          <div class="user-icon">
            <i class="el-icon-mo-user"></i>
          </div>
          <div class="user-name">
            <span v-if="this.login==='登录'">
              <router-link to='/login' class="user-name-color">{{ login }}</router-link>
            </span>
            <el-dropdown v-if="this.login!=='登录'">
              <span class="el-dropdown-link">
                <span class="user-name-color">{{ login }}</span>
              </span>
              <el-dropdown-menu slot="dropdown" class="change-pass">
                <el-dropdown-item>修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="tool">
          <div class="quit">
            <i class="el-icon-mo-websiteQuit"></i>
          </div>
          <div class="order">
            <i class="el-icon-mo-websiteOrder"></i>
          </div>
          <div class="refresh" @click="refreshData">
            <i class="el-icon-refresh"></i>
          </div>
          <div class="message">
            <i class="el-icon-mo-websiteNews"></i>
          </div>
          <div class="application">
            <i class="el-icon-mo-websiteApplication"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  mounted () {
    this.login = this.getUserName
  },
  data () {
    return {
      login: '登录',
      enterState: false,
      showitem: false,
      menu: [
        {
          state: false,
          title: '管理平台',
          data: [
            {
              main: '认证管理',
              content: [
                {
                  tip: '应用资料',
                  link: '/'
                },
                {
                  tip: '车辆资料',
                  link: '/'
                },
                {
                  tip: '客户资料',
                  link: '/'
                }
              ]
            },
            {
              main: '主数据管理',
              content: [
                {
                  tip: '账户管理',
                  link: '/'
                }
              ]
            }
          ]
        }, {
          state: false,
          title: '质量平台',
          data: [
            {
              main: '认证管理',
              content: [
                {
                  tip: '认证合同',
                  link: '/'
                }
              ]
            },
            {
              main: '主数据管理',
              content: [
                {
                  tip: '应用资料',
                  link: '/'
                },
                {
                  tip: '功能资料',
                  link: '/'
                },
                {
                  tip: '应用方法',
                  link: '/'
                }
              ]
            }
          ]
        }, {
          state: false,
          title: '业务平台',
          data: [
            {
              main: '一单一标制',
              content: [
                {
                  tip: '在线下单',
                  link: '/order'
                },
                {
                  tip: '订单处理',
                  link: '/pack'
                },
                {
                  tip: '竞拍',
                  link: '/bidding'
                },
                {
                  tip: '竞拍结果查询',
                  link: '/result'
                },
                {
                  tip: '竞拍管理',
                  link: '/manage'
                }
              ]
            }
          ]
        }, {
          state: false,
          title: '配送平台',
          data: [
            {
              main: '认证管理',
              content: [
                {
                  tip: '应用资料',
                  link: '/'
                },
                {
                  tip: '功能资料',
                  link: '/'
                },
                {
                  tip: '应用方法',
                  link: '/'
                }
              ]
            },
            {
              main: '主数据管理',
              content: [
                {
                  tip: '应用资料',
                  link: '/'
                }
              ]
            }
          ]
        }, {
          state: false,
          title: '调度中心',
          data: [
            {
              main: '认证管理',
              content: [
                {
                  tip: '应用资料',
                  link: '/'
                }
              ]
            }
          ]
        }, {
          state: false,
          title: 'API',
          data: [
            {
              main: 'API',
              content: [
                {
                  tip: '日常日志处理',
                  link: '/'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  computed: {
    // 子菜单
    menuItem () {
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].state === true) {
          return this.menu[i].data
        }
      }
    },
    ...mapGetters(['getUserName'])
  },
  methods: {
    // hover显示子菜单
    showItem (item) {
      this.showitem = true
      for (let i = 0; i < this.menu.length; i++) {
        if (this.menu[i].title === item.title) {
          this.menu[i].state = true
        } else {
          this.menu[i].state = false
        }
      }
    },
    // 隐藏子菜单
    hideItem () {
      if (!this.enterState) {
        for (let i = 0; i < this.menu.length; i++) {
          this.menu[i].state = false
        }
        this.showitem = false
      }
    },
    toHideItem () {
      for (let i = 0; i < this.menu.length; i++) {
        this.menu[i].state = false
      }
      this.showitem = false
      this.showitem = false
    },
    // 鼠标移入子菜单
    enterItem () {
      this.enterState = true
    },
    // 鼠标移除子菜单
    leaveItem () {
      for (let i = 0; i < this.menu.length; i++) {
        this.menu[i].state = false
      }
      this.showitem = false
      this.enterState = false
    },
    // 刷新
    refreshData () {
      this.$emit('refreshData')
    }
  }
}
</script>

<style lang="less" scoped>
.change-pass {
  top: 2.55rem !important;
}
.header {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
  font-size: .6rem;
  color: #eee;
  width: 100%;
  background-color: rgb(16, 95, 170);
  .section {
    padding-left: 1.4rem;
    display: flex;
    position: relative;
    height: 3.15rem;
    line-height: 3.15rem;
    .nav {
      flex: 1;
      display: flex;
      .logo {
        color: #fff;
        padding: 1rem 0;
        img {
          width: 100%;
          display: block;
        }
      }
      .navwrap {
        flex: 1;
        min-width: 28rem;
        display: flex;
        .nav-all {
          padding-left: 2.25rem;
          .nav-all-btn {
            font-size: 1rem;
            width: 1rem;
            line-height: 3.3rem;
            height: 100%;
            cursor: pointer;
          }
        }
        .main-nav {
          margin-left: .25rem;
          .menu {
            display: flex;
            .main-nav-wrap {
              position: relative;
              padding: 0 .9rem;
              .nav-router {
                position: relative;
                box-sizing: border-box;
                display: block;
                color: #eee;
              }
              .leader {
                position: absolute;
                margin-right: -0.6rem;
                width: 0;
                height: 0;
                right: 50%;
                bottom: 0;
                border-left: .5rem solid transparent;
                border-right: .5rem solid transparent;
                border-bottom: .6rem solid #fff;
              }
            }
          }
          .menu-item {
            position: absolute;
            top: 3.15rem;
            left: 0;
            width: 100%;
            background: #fff;
            color: red;
            padding: 12px 100px 22px;
            box-shadow: 0 0 10px #ccc;
            display: flex;
            .menu-item-li {
              width: 6rem;
              .main {
                font-size: 14px;
                line-height: 25px;
                padding-bottom: 10px;
                color: #000;
              }
              .content {
                color: #6b6b6b;
                font-size: 12px;
                line-height: 25px;
                display: block;
                &:hover {
                  color: #105faa;
                }
              }
            }
          }
        }
      }
    }
    .userInfo {
      display: flex;
      align-items: center;
      .userAccount {
        display: flex;
        margin-right: 2.5rem;
        align-items: center;
        div {
          display: inline-block;
          vertical-align: middle;
          position: relative;
          &.user-name {
            padding-left: .5rem;
            top: -.1rem;
            cursor: pointer;
            .user-name-color {
              color: #eee;
            }
          }
          i {
            font-size: .95rem;
          }
        }
      }
      .tool {
        display: flex;
        height: 100%;
        div {
          display: inline-block;
          vertical-align: middle;
          position: relative;
          cursor: pointer;
          width: 1rem;
          font-size: 1rem;
          line-height: 3.15rem;
          margin-left: 1.75rem;
          &.quit {
            margin-left: 0;
          }
          &.refresh {
            font-size: 1.1rem;
            top: -0.05rem;
          }
          &.application {
            width: .9rem;
            margin: 0;
            padding: 0 1.75rem;
          }
        }
      }
    }
  }
}
</style>
