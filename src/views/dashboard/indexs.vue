<template>
  <div class="dashboard-container">
    <div class="dashboard-top">
      <el-tabs
        v-model="activeName"
        class="dashboard-tabs"
        @tab-click="handleClick"
      >
        <el-tab-pane label="主打" name="first" />
        <el-tab-pane label="小说" name="second" />
        <el-tab-pane label="童书" name="third" />
        <el-tab-pane label="计算机网络" name="fourth" />
        <el-tab-pane label="文化" name="five" />
      </el-tabs>
    </div>
    <div class="dashboard-body">
      <el-row :gutter="20">
        <el-col v-for="(item, id) of filteredReports" :key="id" :span="6">
          <div v-if="item.isShow" class="dashboard-list-tab" @click="imgClick(item.route)">
            <img class="dashboard-list-img" :src="item.icon">
            <div>{{ item.title }}</div>
            <div class="dashboard-list-text">{{ item.price }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboards',
  data() {
    return {
      activeName: 'first', // 默认激活的第一个标签页
      tabReports: {
        first: [
          {
            id: 8,
            title: 'Vue.js前端开发实战',
            price: '￥36.90',
            icon: require('./img/vue.jpg'),
            route: 'vue',
            category: '计算机网络',
            role: ['admin', 'User']
          },
          {
            id: 2,
            title: '平凡的世界',
            price: '￥38.89',
            icon: require('./img/pingfan.png'),
            route: 'pingfan',
            category: '小说',
            role: ['admin', 'User']
          },
          {
            id: 1,
            title: 'Java从入门到精通',
            price: '￥44.00',
            icon: require('./img/java.jpg'),
            route: 'java',
            category: '计算机网络',
            role: ['admin', 'User']
          },
          {
            id: 7,
            title: 'Node.js从入门到精通',
            price: '￥28.15',
            icon: require('./img/nodejs.jpg'),
            route: 'nodejs',
            category: '计算机网络',
            role: ['admin', 'User']
          },
          {
            id: 3,
            title: '黄河之旅',
            price: '￥22.88',
            category: '文化',
            icon: require('./img/huanghe.png'),
            route: 'huanghe',
            role: ['admin', 'User']
          },
          {
            id: 4,
            title: '十万个为什么',
            price: '￥4.80',
            icon: require('./img/shiwan.jpg'),
            route: 'shiwan',
            category: '童书',
            role: ['admin', 'User']
          },
          {
            id: 5,
            title: '敖丙转',
            price: '￥29.80',
            icon: require('./img/aobing.jpg'),
            route: 'aobing',
            category: '童书',
            role: ['admin', 'User']
          },
          {
            id: 9,
            title: '红楼梦',
            price: '￥29.90',
            icon: require('./img/honglou.png'),
            route: 'honglou',
            category: '小说',
            role: ['admin', 'User']
          }
        ],
        second: [
          {
            id: 2,
            title: '平凡的世界',
            price: '￥38.89',
            icon: require('./img/pingfan.png'),
            route: 'pingfan',
            category: '小说',
            role: ['admin', 'User']
          },
          {
            id: 9,
            title: '红楼梦',
            price: '￥29.90',
            icon: require('./img/honglou.png'),
            route: 'honglou',
            category: '小说',
            role: ['admin', 'User']
          }
        ],
        third: [
          {
            id: 4,
            title: '十万个为什么',
            price: '￥4.80',
            icon: require('./img/shiwan.jpg'),
            route: 'shiwan',
            category: '童书',
            role: ['admin', 'User']
          },
          {
            id: 5,
            title: '敖丙转',
            price: '￥29.80',
            category: '童书',
            icon: require('./img/aobing.jpg'),
            route: 'aobing',
            role: ['admin', 'User']
          }
        ],
        fourth: [
          {
            id: 8,
            title: 'Vue.js前端开发实战',
            price: '￥36.90',
            category: '计算机网络',
            icon: require('./img/vue.jpg'),
            route: 'vue',
            role: ['admin', 'User']
          },
          {
            id: 1,
            title: 'Java从入门到精通',
            price: '￥44.00',
            icon: require('./img/java.jpg'),
            route: 'java',
            category: '计算机网络',
            role: ['admin', 'User']
          },
          {
            id: 7,
            title: 'Node.js从入门到精通',
            price: '￥28.15',
            icon: require('./img/nodejs.jpg'),
            route: 'nodejs',
            category: '计算机网络',
            role: ['admin', 'User']
          }
        ],
        five: [
          {
            id: 3,
            title: '黄河之旅',
            price: '￥22.88',
            icon: require('./img/huanghe.png'),
            route: 'huanghe',
            category: '文化',
            role: ['admin', 'User']
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'roles']),
    filteredReports() {
      const currentTabReports = this.tabReports[this.activeName]
      return currentTabReports.map(item => {
        item.isShow = item.role.some(role => this.roles.includes(role))
        return item
      })
    }
  },
  created() {
    const roles = this.$store.state.user.roles
    // 初始化 reports
    this.filteredReports // 计算属性会自动初始化
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab)
      // 只需要更新 activeName，计算属性会自动处理
    },
    imgClick(url) {
      console.log(url)
      this.$router.push({
        name: 'book',
        params: { pkey: url }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  background-color: #edf2f5;
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-top {
  display: flex;
  justify-content: left;
  width: 100%;
  height: 20px;
  background-color: #fff;
}
.dashboard-body {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.dashboard-top-left {
  padding: 50px 50px 0;
}
.dashboard-tabs {
  width: 100%;
}
.dashboard-top-left-top {
  font-family: HelveticaInseratLTStd-Roman;
  font-size: 24px;
  color: var(--cobalt);
  padding-bottom: 30px;
}
.dashboard-top-left-bottom {
  font-family: HelveticaInseratLTStd-Roman;
  font-size: 24px;
  color: #f62585;
}
.dashboard-list-tab {
  min-width: 170px;
  cursor: pointer;
  // margin-right: 20px;
  margin-bottom: 20px;
  padding: 30px 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}
.dashboard-list-img {
  width: 200px;
  height: 200px;
}
.dashboard-list-text {
  font-family: HelveticaInseratLTStd-Roman;
  font-size: 16px;
  color: #f62585;
  padding: 10px;
}
.el-row {
  margin-bottom: 20px;
  width: 100%;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
