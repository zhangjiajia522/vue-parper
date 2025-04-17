<template>
  <div class="dashboard-container">
    <div class="dashboard-top">
      <div class="dashboard-top-left-top">
        图书详情
      </div>
    </div>
    <div class="dashboard-body">
      <img
        class="dashboard-list-img"
        :src="reports.img"
      >
      <div class="book-right">
        <div class="dashboard-list-text" style="font-weight: bold; font-size: 24px;">{{ reports.title }}</div>
        <div class="dashboard-list-text">
          <div>单价:
            <span style="color: red; font-weight: bold; font-size: 20px;">
              ￥ {{ reports.price }}
            </span>
            <span class="price-css">定价:
              <span style="text-decoration: line-through;">
                ￥ {{ reports.fix_price }}
              </span>
            </span>
          </div>
        </div>
        <div class="dashboard-list-text">分类：{{ reports.category }}</div>
        <div class="dashboard-list-text">出版社：{{ reports.book_from }}</div>
        <div class="dashboard-list-text">出版时间：{{ reports.publication_time }}</div>
        <div class="dashboard-list-text">
          <el-input
            v-model="num"
            oninput="value=value.replace(/[^\d]/g,'')"
            autocomplete="off"
            style="width:140px"
            size="mini"
            @change="handleInput(num)"
          >
            <el-button slot="prepend" size="mini" @click="del(num)">
              <i class="el-icon-minus" />
            </el-button>
            <el-button slot="append" size="mini" @click="add(num)">
              <i class="el-icon-plus" />
            </el-button>
          </el-input>
        </div>
        <div class="dashboard-list-text">
          实际库存数量：
          <span style="font-weight: bold;">
            {{ reports.numbers }}
          </span>
        </div>
        <div>
          <el-button type="primary" size="small" @click="shop()">加入购物车</el-button>
          <el-button type="warning" size="small" @click="settlement()">立即下单</el-button>
        </div>
      </div>
    </div>
    <div class="dashboard-title">
      <h3>书籍主要内容介绍：</h3>
      <div>{{ reports.book_detail }}</div>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogCodeVisible"
      class="dialog-qrcode"
    >
      <div>
        已生成订单编号为:
        <span style="font-weight: bold; font-size: 16px; color: #333;">JS20250311231807</span>
        数量：
        <span style="font-weight: bold; font-size: 16px; color: #333;">1</span>
        实际应付金额:
        <span style="font-weight: bold; font-size: 16px; color: #E52222;">￥22.88</span>
        请扫描下方二维码付款
      </div>
      <div id="qrcode" class="qr_codes">
        <img :src="qrCodeDataUrl" alt="二维码">
      </div>
    </el-dialog>
  </div>
</template>
<!--  -->
<script>
// import { OrderCreate } from '@/api/order'
// import settlement from './settlement'
// import { getBook } from '@/api/book'
import QRCode from 'qrcode'

export default {
  name: 'Book',
  // components: { settlement },
  data() {
    return {
      num: 1,
      reports: {},
      dialogCodeVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    settlement(scope) {
      this.dialogCodeVisible = true
      this.getQRcode()
    },
    async getQRcode() {
      this.qrCodeDataUrl = await QRCode.toDataURL('22.88')
    },
    getList() {
      if (this.$route.params.pkey === 'huanghe') {
        this.reports =
            {
              numbers: 5,
              title: '黄河之旅',
              price: '22.88',
              fix_price: '29.90',
              img: require('./img/huanghe.png'),
              category: '文化',
              book_from: '四川文艺出版社',
              publication_time: '2018-06-01',
              book_detail: '《黄河之旅》，著名美国汉学家比尔·波特所著，作为中国传统文化的仰慕者和研究者，作者于1991年春进行了一次追寻中国母亲河——黄河源头的旅行，探访了黄河沿岸的重要历史遗迹和自然景观。他凭借着对中国文化的执著与热情和对黄河之源的强烈好奇，战胜重重困难，坚持走完全程。再次为广大读者带来了这本充满文化底蕴的行走笔记。内容简介这一天是公元1991年5月25日，是我成功到达黄河源头的日子。追随着这条黄色的巨龙，我历时两个多月，行程五千公里。'
            }
      }
      if (this.$route.params.pkey === 'honglou') {
        this.reports =
          {
            numbers: 25,
            title: '红楼梦',
            price: '29.90',
            fix_price: '39.90',
            img: require('./img/honglou.png'),
            category: '小说',
            book_from: '中国文联出版社',
            publication_time: '2012-06-01',
            role: ['admin', 'User'],
            book_detail: '《红楼梦》这本书写于清代，故事讲述的是发生在一个未知朝代的封建大家庭中的人事物。别名《石头记》等，中国古代章回体长篇小说，中国古典四大名著之一，通行本共120回。小说以贾、史、王、薛四大家族的兴衰为背景，以富贵公子贾宝玉为视角，以贾宝玉与林黛玉、薛宝钗的爱情婚姻悲剧为主线，描绘了一些闺阁佳人的人生百态，展现了真正的人性美和悲剧美，可以说是一部从各个角度展现女性美以及中国古代社会百态的史诗性著作。'
          }
      }
      // getBook(this.$route.params.id).then(response => {
      //   // 后台返回有数据时候渲染
      //   this.reports = response.data
      // })
    },
    add(addGood) {
      if (typeof addGood.number === 'string') {
        addGood.number = parseInt(addGood.number)
      }
      if (this.num > 8) {
        this.num === 0
        this.$message('加购数量不能超过库存')
      } else {
        this.num = addGood + 1
      }
    },
    del(delGood) {
      if (typeof delGood.number === 'string') {
        delGood.number = parseInt(delGood.number)
      }
      if (this.num < 1) {
        this.num === 0
        this.$message('库存数量不能为0')
      } else {
        this.num = delGood - 1
      }
    },
    shop() {
      const routes = this.$route.params.pkey
      this.$router.push({
        name: 'shop',
        params: { pkey: routes, num: this.num }
      })
    }
    // settlement(id) {
    // this.$message('下单成功自动跳转推荐继续浏览选购！')
    // this.$router.push({
    //   name: 'Dashboard'
    // })
    // OrderCreate(id).then(response => {
    //   this.$message('下单成功自动跳转主页继续浏览选购！')
    //   this.$router.push({
    //     name: 'Dashboard'
    //   })
    // }).catch(err => { console.error(err) })
    // }
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
  height: 50px;
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
  font-size: 28px;
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
  width: 400px;
  height: 400px;
}
.dashboard-list-text {
  font-family: HelveticaInseratLTStd-Roman;
  font-size: 16px;
  padding: 15px;
}
.book-right {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  // padding-top: 20px;
}
.price-css {
  display: inline-block;
  margin-left: 20px;
  font-size: 12px;
}
.qr_codes {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
