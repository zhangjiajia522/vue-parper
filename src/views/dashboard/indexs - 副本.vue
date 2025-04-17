<template>
  <div class="dashboard-container">
    <div class="dashboard-top">
      <div class="dashboard-top-left-top">
        图书销售系统
      </div>
    </div>
    <div class="dashboard-body">
      <el-row
        :gutter="20"
      >
        <el-col
          v-for="(item, id) of reports"
          :key="id"
          :span="6"
        >
          <div v-if="item.isShow" class="dashboard-list-tab" @click="imgClick(item.route)">
            <img
              class="dashboard-list-img"
              :src="item.icon"
            >
            <div>{{ item.title }}</div>
            <div class="dashboard-list-text">{{ item.price }}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<!--  -->
<script>
import { mapGetters } from 'vuex'
import { getCar } from '@/api/car'

export default {
  name: 'Dashboards',
  data() {
    return {
      reports: [
        {
          id: 1,
          title: '奔驰glc',
          price: '￥29.90',
          icon: require('./img/glc.jpg'),
          route: 'sanguo',
          role: ['admin', 'User']
        },
        {
          id: 7,
          title: '奥迪A7',
          price: '￥29.90',
          icon: require('./img/a7.jpg'),
          route: 'shuihu',
          role: ['admin', 'User']
        },
        {
          id: 8,
          title: '宝马3系',
          price: '￥29.90',
          icon: require('./img/3x.jpg'),
          route: 'xiyou',
          role: ['admin', 'User']
        },
        {
          id: 2,
          title: '宝马5系',
          price: '￥38.89',
          icon: require('./img/5x.jpg'),
          route: 'pingfan',
          role: ['admin', 'User']
        },
        {
          id: 3,
          title: '沃尔沃xc60',
          price: '￥68.80',
          icon: require('./img/xc60.jpg'),
          route: 'huanghe',
          role: ['admin', 'User']
        },
        {
          id: 4,
          title: '奥迪Q5',
          price: '￥49.80',
          icon: require('./img/q5.jpg'),
          route: 'shendiao',
          role: ['admin', 'User']
        },
        {
          id: 5,
          title: '奔驰glc2020版',
          price: '￥49.80',
          icon: require('./img/glc0.jpg'),
          route: 'xiaoao',
          role: ['admin', 'User']
        },
        {
          id: 9,
          title: '沃尔沃xc90',
          price: '￥29.90',
          icon: require('./img/xc90.jpg'),
          route: 'honglou',
          role: ['admin', 'User']
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  created() {
    const roles = this.$store.state.user.roles
    this.reports = this.reports.map(item => {
      item.role.forEach(i => {
        if (roles.includes(i)) {
          item.isShow = true
        }
      })
      return item
    })
    // getCar(this.$route.params.id).then(response => {
    //   // 后台返回有数据时候渲染
    //   this.reports = response.data
    // })
  },
  methods: {
    imgClick(url) {
      console.log(url)
      this.$router.push({
        name: 'car',
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
