<template>
  <div class="content shopCart">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/dashboard' }">产品</el-breadcrumb-item>
        <el-breadcrumb-item>购物车</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="table">
      <el-table
        ref="multipleTable"
        style="width: 100%"
        element-loading-text="正在为您拼命加载中..."
        :data="tableData"
        :header-cell-style="{background:'#f8f8f8',color:'#999'}"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="75" align="center" />
        <el-table-column prop="shopImg" align="center" width="150" label="商品">
          <template slot-scope="scope">
            <img :src="scope.row.shopImg" class="shopImg" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="shop" align="center">
          <template slot-scope="scope">
            <span class="shop">{{ scope.row.shop }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="单价" align="center">
          <template slot-scope="scope">
            <span class="price">¥{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量" align="center">
          <template slot-scope="scope">
            <el-input
              v-model.number="scope.row.number"
              oninput="value=value.replace(/[^\d]/g,'')"
              autocomplete="off"
              style="width:140px"
              size="mini"
              @change="handleInput(scope.row)"
            >
              <el-button slot="prepend" size="mini" @click="del(scope.row)">
                <i class="el-icon-minus" />
              </el-button>
              <el-button slot="append" size="mini" @click="add(scope.row)">
                <i class="el-icon-plus" />
              </el-button>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column prop="count" label="小计" align="center">
          <template slot-scope="scope">
            <span class="count">¥{{ scope.row.goodTotal }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <i
              class="el-icon-delete"
              style="font-size:18pxcursor: pointer"
              @click="handleDelete(scope.$index, scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
      <div class="submit">
        <p class="submitBar">
          <span>继续购物</span>
          <span>
            共 <b> {{ tableData.length }} </b> 件商品,
            已选择 <b> {{ multipleSelection.length }} </b> 件
          </span>
        </p>
        <div class="submit-price submitBar">
          <span style="background: #fff;">产品总额：{{ totalPrice }}</span>
          <el-button
            size="small"
            :disabled="multipleSelection.length<=0"
            button-color="#bfa548"
            @click="settlement"
          >
            去结算
          </el-button>
        </div>
      </div>
    </div>
    <el-dialog
      title=""
      :visible.sync="dialogCodeVisible"
      class="dialog-qrcode"
    >
      <div>
        已生成订单编号为:
        <span style="font-weight: bold; font-size: 16px; color: #333;">JS20250310121209</span>
        数量：
        <span style="font-weight: bold; font-size: 16px; color: #333;">5</span>
        实际应付金额:
        <span style="font-weight: bold; font-size: 16px; color: #E52222;">￥149.50</span>
        请扫描下方二维码付款
      </div>
      <div id="qrcode" class="qr_codes">
        <img :src="qrCodeDataUrl" alt="二维码">
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { OrderCreate } from '@/api/order'
import QRCode from 'qrcode'
// import { getShop } from '@/api/shop'
export default {
  name: 'Shop',
  data() {
    return {
      tableData: [
      ],
      totalPrice: 0,
      dialogCodeVisible: false,
      multipleSelection: []
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
      this.qrCodeDataUrl = await QRCode.toDataURL('请按照订单金额付款')
    },
    getList() {
      if (this.$route.params.pkey === 'huanghe') {
        this.tableData = [
          {
            shopImg: require('./img/huanghe.png'),
            shop: '黄河之旅',
            price: '22.88',
            number: this.$route.params.num,
            // goodTotal: parseFloat(22.88 * this.$route.params.num)
            goodTotal: (22.88 * this.$route.params.num)
          }
        ]
      }
      if (this.$route.params.pkey === 'honglou') {
        this.tableData = [
          {
            shopImg: require('./img/honglou.png'),
            shop: '红楼梦',
            price: 29.90,
            number: this.$route.params.num,
            // goodTotal: parseFloat(29.90 * this.$route.params.num)
            goodTotal: (29.90 * this.$route.params.num)
          }
        ]
      }
      // getShop(this.$route.params.id).then(response => {
      //   // 后台返回有数据时候渲染
      //   this.tableData = response.data
      // })
    },
    //  删除单个商品
    handleDelete(index, row) {
      this.$confirm('确定删除该商品？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除数组中指定的元素
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //  数量变化触发
    handleInput(value) {
      console.log(value)
      if (value.number === null || value.number === '' || value.number === 0) {
        value.number = 1
      }
      value.goodTotal = (value.number * value.price).toFixed(2) // 保留两位小数
      // 增加商品数量也需要重新计算商品总价
      console.log(value, 'value')
      this.handleSelectionChange(this.multipleSelection)
    },
    add(addGood) {
      if (typeof addGood.number === 'string') {
        addGood.number = parseInt(addGood.number)
      }
      addGood.number += 1
      addGood.goodTotal = (addGood.number * addGood.price).toFixed(2)// 保留两位小数
      this.handleSelectionChange(this.multipleSelection)
    },
    del(delGood) {
      if (typeof delGood.number === 'string') {
        delGood.number = parseInt(delGood.number)
      }
      if (delGood.number > 1) {
        delGood.number -= 1
        delGood.goodTotal = (delGood.number * delGood.price).toFixed(2)// 保留两位小数
        this.handleSelectionChange(this.multipleSelection)
      }
    },
    handleSelectionChange(selection) {
      console.log(selection)
      this.multipleSelection = selection
      this.totalPrice = 0
      // 此处不支持forEach循环，只能用原始方法了
      for (var i = 0; i < selection.length; i++) {
        // 判断返回的值是否是字符串
        if (typeof selection[i].goodTotal === 'string') {
          selection[i].goodTotal = parseFloat(selection[i].goodTotal)
        }
        this.totalPrice += selection[i].goodTotal
      }
    }
    // settlement() {
    //   OrderCreate(id).then(response => {
    //     this.$message('下单成功自动跳转主页继续浏览选购！')
    //     this.$router.push({
    //       name: 'Dashboard'
    //     })
    //   }).catch(err => { console.error(err) })
    // }
  }
}
</script>

<style lang="scss" scoped>
.shopCart {
  margin-bottom: 30px;
  padding: 0 15px;
  .breadcrumb {
    margin-top: 20px;
    ::v-deep .el-breadcrumb__inner.is-link {
      color: #bfa548
    }
  }
  .steps {
    margin-top: 30px;
    ::v-deep .el-step__head {
      border-color: #d8d8d8;
      color: #fff;
    }
    ::v-deep .el-step__head.is-finish {
      color: #fff;
      border-color: #bfa548;
    }
    ::v-deep .el-step__title {
      font-size: 15px;
    }
    ::v-deep .el-step__title.is-finish {
      color: #bfa548;
    }
    ::v-deep .el-step__title.is-process {
      color: #d8d8d8;
    }
    ::v-deep .is-finish {
      .is-text {
        background: #bfa548;
      }
    }
    ::v-deep .is-process {
      .is-text {
        background: #d8d8d8;
      }
    }
    ::v-deep .is-wait {
      .is-text {
        background: #d8d8d8;
      }
    }
    ::v-deep .el-step__line {
      height: 5px;
      top: 10px;
      background-color: #f1f1f1;
    }
  }
  .table {
    margin-top: 30px;
    position: relative;
    padding-bottom: 100px;
    ::v-deep .el-input__inner {
      text-align: center;
    }
    ::v-deep .el-input-group__append {
      padding: 0 15px;
    }
    ::v-deep .el-input-group__prepend {
      padding: 0 15px;
    }
    .shopImg {
      width: 100%;
    }
    .price,
    .shop {
      color: #000733;
    }
    .count {
      color: #bfa548
    }
    ::v-deep .el-checkbox__inner {
      width: 20px;
      height: 20px;
      border-radius: 50%;
    }
    ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #bfa548;
      border-color: #bfa548;
    }
    ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #bfa548;
      border-color: #bfa548;
    }
    ::v-deep .el-checkbox__inner::after {
      left: 7px;
      top: 3px;
    }
    ::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      top: 7px;
    }
    .submit {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      ::v-deep .van-submit-bar {
        position: absolute;
        top: 20px;
      }
      .submitBar {
        color: #757575;
        display: flex;
        align-items: center;
        b {
          color: #bfa548;
          margin: 0 5px;
        }
        span {
          display: flex;
          align-items: center;
          &:first-child {
            cursor: pointer;
            &:hover {
              color: #bfa548;
            }
            &::after {
              display: inline-block;
              content: "";
              width: 1px;
              height: 12px;
              background: #ccc;
              margin: 0 10px;
            }
          }
        }
      }
      .submit-price span{
        background: #fff !important;
      }
      ::v-deep .van-submit-bar__price {
        color: #bfa548;
      }
      ::v-deep .van-submit-bar__text {
        padding-right: 30px;
        color: #000733;
      }
    }
  }
}
.qr_codes {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
