// 订单列表页面
<template>
  <div class="app-container">
    <el-select
      v-model="categary"
      placeholder="请选择交易是否成功"
      class="left-input"
      clearable
      @change="selectChange"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-input v-model="bookName" placeholder="请输入订单编号" class="left-input" style="width: 200px;margin-left: 20px;" @keyup.enter.native="handleFilter" />
    <el-table :data="orderList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="订单编号">
        <template slot-scope="scope">
          {{ scope.row.order_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="图书图片" width="150">
        <template slot-scope="scope">
          <img style="width:100px; height: 100px;" :src="scope.row.imgs">
        </template>
      </el-table-column>
      <el-table-column align="center" label="图书姓名" width="150">
        <template slot-scope="scope">
          <div style="color:red; font-weight: bold; cursor: pointer;" @click="jump(scope.row)">
            {{ scope.row.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单时间">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="下单数量">
        <template slot-scope="scope">
          {{ scope.row.order_book_count }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="交易是否成功">
        <template slot-scope="scope">
          {{ scope.row.order_status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="付款金额">
        <template slot-scope="scope">
          {{ scope.row.order_amount }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.order_status === '待付款'"
            size="small"
            type="success"
            @click="handleMoney(scope)"
          >
            去付款
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title=""
      :visible.sync="dialogCodeVisible"
      class="dialog-qrcode"
    >
      <div>
        已生成订单编号为:
        <span style="font-weight: bold; font-size: 16px; color: #333;">JS20250312190936</span>
        数量：
        <span style="font-weight: bold; font-size: 16px; color: #333;">2</span>
        实际应付金额:
        <span style="font-weight: bold; font-size: 16px; color: #E52222;">￥77.78</span>
        请扫描下方二维码付款
      </div>
      <div id="qrcode" class="qr_codes">
        <img :src="qrCodeDataUrl" alt="二维码">
      </div>
    </el-dialog>
  </div>
</template>

<script>
import QRCode from 'qrcode'
import { getRoutes } from '@/api/role'
import { deleteOrder, getOrder } from '@/api/order'
// import { deleteBook } from '@/api/book'

const defaultRole = {
  key: '',
  name: '',
  id: '',
  description: '',
  routes: []
}

export default {
  name: 'Order',
  data() {
    return {
      qrCodeDataUrl: '',
      role: Object.assign({}, defaultRole),
      routes: [],
      orderList: [],
      formSalesRate: {},
      dialogVisible: false,
      dialogCodeVisible: false,
      dialogRateVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
    this.getOrder()
  },
  methods: {
    handleMoney(scope) {
      this.dialogCodeVisible = true
      this.getQRcode()
    },
    async getQRcode() {
      this.qrCodeDataUrl = await QRCode.toDataURL('请按照订单金额付款')
    },
    jump(scope) {
      this.$router.push({
        name: 'book',
        params: { pkey: scope.pkey }
      })
    },
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getOrder(id) {
      this.orderList = [
        {
          imgs: require('./img/pingfan.png'),
          order_id: 'JS20250312190936',
          name: '平凡的世界',
          pkey: 'pingfan',
          category: '中国文学',
          order_status: '待付款',
          // order_status: '是',
          author: '路遥',
          name1: '北京十月文艺文艺出版社',
          create_time: '2025-03-12 19:09:36',
          order_book_count: 'X2',
          order_amount: '￥77.78'
        },
        {
          imgs: require('./img/honglou.png'),
          order_id: 'JS20250310121209',
          name: '红楼梦',
          pkey: 'honglou',
          category: '中国文学',
          author: '曹雪芹',
          order_status: '已付款',
          name1: '北京文联出版社',
          create_time: '2025-03-10 12:12:09',
          order_book_count: 'X5',
          order_amount: '￥149.50'
        },
        {
          imgs: require('./img/huanghe.png'),
          order_id: 'JS20250311231807',
          name: '黄河之旅',
          pkey: 'huanghe',
          category: '外国文学',
          author: '比尔.波特',
          order_status: '已付款',
          name1: '四川文艺出版社',
          create_time: '2025-03-11 23:18:07',
          order_book_count: 'X1',
          order_amount: '￥22.88'
        }
      ]
      getOrder(id).then(response => {
        this.orderList = response.data
      })
    },
    handleDelete(row) {
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrder(row.id).then(response => {
          this.$message(
            {
              message: response.message,
              type: 'success'
            }
          )
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
      })
    },
    handleRate(row) {
      this.dialogRateVisible = true
    },
    dialogRateVisibleCancelClick(formOrder) {
      this.dialogRateVisible = false
    },
    dialogRateVisibleSureClick(formOrder) {
      this.dialogRateVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }
  .permission-tree {
    margin-bottom: 30px;
  }
}
.qr_codes {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
