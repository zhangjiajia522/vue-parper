<template>
  <div class="app-container">
    <el-table :data="userList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="用户id" width="150">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户名称" width="150">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="性别" width="150">
        <template slot-scope="scope">
          {{ scope.row.sex }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色" width="150">
        <template slot-scope="scope">
          {{ scope.row.role }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" width="150">
        <template slot-scope="scope">
          {{ scope.row.email }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话号码" width="150">
        <template slot-scope="scope">
          {{ scope.row.phone }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="地址">
        <template slot-scope="scope">
          {{ scope.row.adress }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="用户注册时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.createtime }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="用户信息修改" :visible="dialogFormVisible">
      <el-form :model="formUser">
        <el-form-item label="id">
          <el-input v-model="formUser.id" disabled />
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="formUser.name" />
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="formUser.role" placeholder="请选择角色">
            <el-option value="管理员" />
            <el-option value="用户" />
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formUser.email" />
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input v-model="formUser.phone" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="formUser.adress" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCancelClick(formUser)">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleSureClick(formUser)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRoutes, deleteRole } from '@/api/role'
import { getUser, updateUser } from '@/api/user'

const defaultRole = {
  key: '',
  name: '',
  id: '',
  routes: []
}

export default {
  data() {
    return {
      dialogFormVisible: false,
      formUser: {},
      role: Object.assign({}, defaultRole),
      routes: [],
      userList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },
  created() {
    this.getRoles()
  },
  methods: {
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getRoles() {
      this.userList = [
        {
          id: 'admin',
          name: 'admin',
          sex: '男',
          adress: '上海市长宁区',
          phone: '13489946700',
          email: '49088789@qq.com',
          count: 5,
          role: '管理员',
          createtime: '2025-03-03 11:32:28'
        },
        {
          id: 'liss',
          name: '李思思',
          sex: '女',
          adress: '上海市浦东新区',
          phone: '18516679927',
          email: '30897826@qq.com',
          role: '用户',
          count: 15,
          createtime: '2025-03-02 22:45:08'
        },
        {
          id: 'wangxw',
          name: '王小五',
          sex: '男',
          adress: '上海市浦东新区',
          phone: '13916979928',
          role: '用户',
          count: 6,
          email: '',
          createtime: '2025-03-03 09:16:29'
        }
      ]
      // getUser().then(response => {
      //   // 后台返回有数据时候渲染
      //   this.userList = response.data
      // })
    },
    handleAddRole() {
      this.role = Object.assign({}, defaultRole)
      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogFormVisible = true
      this.formUser = {
        id: 'wangxw',
        name: '王小五',
        sex: '男',
        adress: '上海市浦东新区',
        phone: '13916979928',
        role: '用户',
        email: ''
      }
      // getUser(scope.id).then(response => {
      //   // 后台返回有数据时候渲染
      //   this.formUser = response.data
      // })
    },
    dialogFormVisibleCancelClick(formUser) {
      this.dialogFormVisible = false
    },
    dialogFormVisibleSureClick(formUser) {
      this.dialogFormVisible = false
      this.$message({
        message: `修改User成功`,
        type: 'success'
      })
      this.userList = [
        {
          imgs: require('./img/pingfan.png'),
          id: 'admin',
          name: 'admin',
          sex: '男',
          adress: '上海市长宁区',
          phone: '13489946700',
          email: '49088789@qq.com',
          count: 5,
          role: '管理员',
          createtime: '2025-03-18 11:32:28'
        },
        {
          imgs: require('./img/honglou.png'),
          id: 'liss',
          name: '李思思',
          sex: '女',
          adress: '上海市浦东新区',
          phone: '18516679927',
          email: '30897826@qq.com',
          role: '用户',
          count: 15,
          createtime: '2025-03-08 11:32:28'
        },
        {
          imgs: require('./img/huanghe.png'),
          id: 'wangxw',
          name: '王小五',
          sex: '男',
          adress: '上海市浦东新区',
          phone: '13916979928',
          count: 6,
          email: '10453786@qq.com',
          role: '用户',
          createtime: '2025-03-15 11:32:28'
        }
      ]
      // updateUser(formUser).then(response => {
      //   this.$message({
      //     message: `修改User成功`,
      //     type: 'success'
      //   })
      // }).catch(error => {
      //   console.log(error)
      // })
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除这个用户嘛?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.id)
          this.$message({
            type: 'success',
            message: '删除用户成功!'
          })
          this.userList = [
            {
              imgs: require('./img/pingfan.png'),
              id: 'admin',
              name: 'admin',
              sex: '男',
              adress: '上海市长宁区',
              phone: '13489946700',
              email: '49088789@qq.com',
              count: 5,
              role: '管理员',
              createtime: '2025-03-18 11:32:28'
            },
            {
              imgs: require('./img/huanghe.png'),
              id: 'wangxw',
              name: '王小五',
              role: '用户',
              sex: '男',
              adress: '上海市浦东新区',
              phone: '13916979928',
              count: 6,
              email: '10453786@qq.com',
              createtime: '2025-03-08 11:32:28'
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
