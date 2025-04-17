<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddSales">新增</el-button>
    <el-table :data="salesList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="售后服务单号">
        <template slot-scope="scope">
          {{ scope.row.sales_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="销售订单编号">
        <template slot-scope="scope">
          {{ scope.row.order_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="名称" width="150">
        <template slot-scope="scope">
          <div style="color:red; font-weight: bold; cursor: pointer;" @click="jump(scope.row)">
            {{ scope.row.car_name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="服务单状态">
        <template slot-scope="scope">
          {{ scope.row.sales_status }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="售后服务内容">
        <template slot-scope="scope">
          {{ scope.row.sales_content }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="售后评价内容">
        <template slot-scope="scope">
          {{ scope.row.sales_rate }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button v-if="scope.row.sales_status === '受理中'" type="primary" size="small" @click="handleEdit(scope)">修改</el-button>
          <el-button v-if="scope.row.sales_status === '受理中'" type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
          <el-button
            v-if="scope.row.sales_status === '已完成'"
            type="success"
            size="small"
            @click="handleRate(scope)"
          >评价</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :title="dialogType==='edit'?'修改售后服务信息':'新增售后服务信息'"
    >
      <el-form :model="formSales">
        <el-form-item label="销售订单编号">
          <el-input v-model="formSales.sales_id" />
        </el-form-item>
        <el-form-item label="售后服务内容">
          <el-input v-model="formSales.sales_content" />
        </el-form-item>
        <el-form-item label="售后服务状态">
          <el-select v-model="formSales.sales_status" placeholder="请选择汽车状态">
            <el-option value="已完成" />
            <el-option value="受理中" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCancelClick(formSales)">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleSureClick(formSales)">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogRateVisible"
      title="请对本次售后服务进行评价"
    >
      <el-form :model="formSalesRate">
        <el-rate v-model="formSalesRate.rateValue" style="margin-bottom: 20px;" show-text />
        <el-input
          v-model="formSalesRate.sales_rate"
          type="textarea"
          :rows="2"
          placeholder="请输入评价内容"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRateVisibleCancelClick(formSalesRate)">取 消</el-button>
        <el-button type="primary" @click="dialogRateVisibleSureClick(formSalesRate)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoutes } from '@/api/role'
// import { deleteSales, getSales } from '@/api/sales'
// import { deleteCar } from '@/api/car'

const defaultRole = {
  key: '',
  name: '',
  id: '',
  description: '',
  routes: []
}

export default {
  name: 'Sales',
  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      salesList: [],
      formSales: {},
      formSalesRate: {},
      dialogFormVisible: false,
      dialogRateVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      textarea: '',
      rateValue: '',
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
    this.getSales()
  },
  methods: {
    jump(scope) {
      this.$router.push({
        name: 'car',
        params: { pkey: scope.pkey }
      })
    },
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getSales(id) {
      this.salesList = [
        // {
        //   order_id: 'XS1709982546',
        //   sales_id: 'SH1710242996',
        //   car_name: '沃尔沃XC902021款B5智行豪华版5座',
        //   pkey: 'pingfan',
        //   sales_status: '受理中',
        //   sales_content: '定期更换润滑油',
        //   create_time: '2025-03-12 19:29:56'
        // },
        {
          order_id: 'XS1710130329',
          sales_id: 'SH1710230985',
          car_name: '宝马3系2022款325iM运动套装',
          pkey: 'pingfan',
          sales_status: '已完成',
          sales_content: '汽车保养',
          create_time: '2025-03-12 16:09:45'
        }
      ]
      // getSales(id).then(response => {
      //   this.salesList = response.data
      // })
    },
    dialogFormVisibleCancelClick(formOrder) {
      this.dialogFormVisible = false
      // if (this.dialogType === 'new') {
      //   addOrder(this.formOrder).then(response => {
      //     this.$message({
      //       message: `新增Order成功`,
      //       type: 'success'
      //     })
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }
      // updateOrder(formOrder).then(response => {
      //   this.$message({
      //     message: `修改Order成功`,
      //     type: 'success'
      //   })
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    dialogFormVisibleSureClick(formOrder) {
      this.dialogFormVisible = false
      if (this.dialogType === 'new') {
        this.$message({
          message: `新增售后服务信息成功`,
          type: 'success'
        })
        this.salesList = [
          {
            order_id: 'XS1709982546',
            sales_id: 'SH1710242996',
            car_name: '沃尔沃XC902021款B5智行豪华版5座',
            pkey: 'pingfan',
            sales_status: '受理中',
            sales_content: '定期更换润滑油',
            create_time: '2025-03-12 19:29:56'
          },
          {
            order_id: 'XS1710130329',
            sales_id: 'SH1710230985',
            car_name: '宝马3系2022款325iM运动套装',
            pkey: 'pingfan',
            sales_status: '已完成',
            sales_content: '汽车保养',
            create_time: '2025-03-12 16:09:45'
          }
        ]
      } else {
        this.$message({
          message: `修改售后服务信息成功`,
          type: 'success'
        })
        this.salesList = [
          {
            order_id: 'XS1709982546',
            sales_id: 'SH1710242996',
            car_name: '沃尔沃XC902021款B5智行豪华版5座',
            pkey: 'pingfan',
            sales_status: '受理中',
            sales_content: '定期更换润滑油,小保养',
            create_time: '2025-03-12 19:29:56'
          },
          {
            order_id: 'XS1710130329',
            sales_id: 'SH1710230985',
            car_name: '宝马3系2022款325iM运动套装',
            pkey: 'pingfan',
            sales_content: '汽车保养',
            sales_status: '已完成',
            create_time: '2025-03-12 16:09:45'
          }
        ]
      }
    },
    dialogRateVisibleCancelClick(formOrder) {
      this.dialogRateVisible = false
    },
    dialogRateVisibleSureClick(formOrder) {
      this.dialogRateVisible = false
      this.salesList = [
        {
          order_id: 'XS1709982546',
          sales_id: 'SH1710242996',
          car_name: '沃尔沃XC902021款B5智行豪华版5座',
          pkey: 'pingfan',
          sales_status: '受理中',
          sales_content: '定期更换润滑油，小保养',
          create_time: '2025-03-12 19:29:56'
        },
        {
          order_id: 'XS1710130329',
          sales_id: 'SH1710230985',
          car_name: '宝马3系2022款325iM运动套装',
          pkey: 'pingfan',
          sales_status: '已评价',
          sales_rate: '非常专业',
          sales_content: '汽车保养',
          create_time: '2025-03-12 16:09:45'
        }
      ]
    },
    handleRate(row) {
      this.dialogRateVisible = true
      // const confirmTitle = '请对本次售后服务评价：'
      // const confirmResult = await this.$prompt('<strong>这是 <i>HTML</i> 片段</strong>',confirmTitle, {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   inputType: 'textarea',
      //   inputErrorMessage: '最多可输入1000个字符',
      //   inputValidator: (val) => {
      //     return !val || val.length <= 1000
      //   }
      // })
    },
    handleDelete(row) {
      this.$confirm('确认删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // deleteSales(row.id).then(response => {
        //   this.$message(
        //     {
        //       message: response.message,
        //       type: 'success'
        //     }
        //   )
        this.$message({
          type: 'success',
          message: '删除订单成功!'
        })
        this.salesList = [
          {
            order_id: 'XS1709982546',
            sales_id: 'SH202503192265711',
            car_name: '沃尔沃XC902021款B5智行豪华版5座',
            pkey: 'pingfan',
            sales_status: '受理中',
            sale_content: '定期更换润滑油',
            create_time: '2023-03-19 19:09:96'
          },
          {
            order_id: 'XS20250323452309',
            sales_id: 'SH20250326437608',
            car_name: '宝马3系2022款325iM运动套装',
            pkey: 'pingfan',
            sales_status: '已完成',
            sale_content: '汽车保养',
            create_time: '2023-03-19 19:09:96'
          }
        ]
        // }).catch(error => {
        //   console.log(error)
        // })
      }).catch(() => {
      })
    },
    handleAddSales() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.formSales = {
        order_id: 'XS1709982546',
        sales_id: 'SH202503192265711',
        car_name: '沃尔沃XC902021款B5智行豪华版5座',
        pkey: 'woerwo',
        sales_status: '受理中',
        sales_content: '定期更换润滑油',
        create_time: '2023-03-19 19:09:96'
      }
      // getSales(scope.id).then(response => {
      //   // 将当前数据渲染到页面上进行修改
      //   this.formSales = response.data
      // })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除嘛？', 'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // await deleteSales(row.key)
          // this.salesList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.salesList = [
            {
              order_id: 'XS1710130329',
              sales_id: 'SH1710230985',
              car_name: '宝马3系2022款325iM运动套装',
              pkey: 'pingfan',
              sales_status: '已完成',
              sales_content: '汽车保养',
              create_time: '2025-03-12 16:09:45'
            }
          ]
        })
        .catch(err => { console.error(err) })
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
</style>
