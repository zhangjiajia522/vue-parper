<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddCar">新增</el-button>
    <el-table :data="roleList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="角色编号">
        <template slot-scope="scope">
          {{ scope.row.role_id }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色名称">
        <template slot-scope="scope">
          {{ scope.row.role_name }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="角色状态">
        <template slot-scope="scope">
          {{ scope.row.role_status }}
        </template>
      </el-table-column>
      <el-table-column align="left" label="角色描述">
        <template slot-scope="scope">
          {{ scope.row.role_description }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button v-if="scope.row.role_status === '停用'" type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialogType==='edit'?'修改角色信息':'新增角色信息'"
      :visible="dialogFormVisible"
    >
      <el-form :model="formUser">
        <el-form-item label="角色编号">
          <el-input v-model="formUser.role_id" />
        </el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="formUser.role_name" />
        </el-form-item>
        <el-form-item label="角色状态">
          <el-select v-model="formUser.role_status" placeholder="请选择角色状态">
            <el-option value="启用" />
            <el-option value="停用" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="formUser.role_description" />
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
  role_name: '',
  role_id: '',
  routes: []
}

export default {
  data() {
    return {
      dialogFormVisible: false,
      formUser: {},
      role: Object.assign({}, defaultRole),
      routes: [],
      roleList: [],
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
    handleAddCar() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
    },
    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },
    async getRoles() {
      this.roleList = [
        {
          role_id: 'admin',
          role_name: '管理员',
          role_status: '启用',
          role_description: '管理所有的用户修改及权限分配'
        },
        {
          role_id: 'editor',
          role_name: '用户',
          role_status: '启用',
          role_description: '在线查看图书信息并下单购买'
        }
      ]
      // getUser().then(response => {
      //   // 后台返回有数据时候渲染
      //   this.roleList = response.data
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
      this.dialogType = 'edit'
      this.formUser = {
        role_id: 'other',
        role_name: '其他角色',
        role_status: '停用',
        role_description: '测试角色'
      }
      // this.roleList = [
      //   {
      //     role_id: 'admin',
      //     role_name: '管理员',
      //     role_status:'启用',
      //     role_description: '管理所有的用户修改及权限分配',
      //   },
      //   {
      //     role_id: 'editor',
      //     role_name: '用户',
      //     role_status:'启用',
      //     role_description: '可以查看汽车等信息'
      //   },
      //   {
      //     role_id: 'other',
      //     role_name: '其他角色',
      //     role_status:'启用',
      //     role_description: '测试角色',
      //   }
      // ]
      // getUser(scope.role_id).then(response => {
      //   // 后台返回有数据时候渲染
      //   this.formUser = response.data
      // })
    },
    dialogFormVisibleCancelClick(formUser) {
      this.dialogFormVisible = false
      this.$message({
        message: `修改Role成功`,
        type: 'success'
      })
      this.roleList = [
        {
          role_id: 'admin',
          role_name: '管理员',
          role_status: '启用',
          role_description: '管理所有的用户修改及权限分配'
        },
        {
          role_id: 'editor',
          role_name: '用户',
          role_status: '启用',
          role_description: '在线查看图书信息并下单购买'
        },
        {
          role_id: 'other',
          role_name: '其他角色',
          role_status: '启用',
          role_description: '测试角色'
        }
      ]
    },
    dialogFormVisibleSureClick(formUser) {
      this.dialogFormVisible = false
      // if (this.dialogType === 'new') {
      //   this.$message({
      //     message: `新增Role成功`,
      //     type: 'success'
      //   })
      // }
      this.$message({
        message: `修改Role成功`,
        type: 'success'
      })
      this.roleList = [
        {
          role_id: 'admin',
          role_name: '管理员',
          role_status: '启用',
          role_description: '管理所有的用户修改及权限分配'
        },
        {
          role_id: 'editor',
          role_name: '用户',
          role_status: '启用',
          role_description: '可以查看汽车等信息'
        },
        {
          role_id: 'other',
          role_name: '其他角色',
          role_status: '停用',
          role_description: '测试角色'
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
      this.$confirm('确定删除这个角色嘛?', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.role_id)
          this.$message({
            type: 'success',
            message: '删除角色成功!'
          })
          this.roleList = [
            {
              role_id: 'admin',
              role_name: '管理员',
              role_status: '启用',
              role_description: '管理所有的用户修改及权限分配'
            },
            {
              role_id: 'editor',
              role_name: '用户',
              role_status: '启用',
              role_description: '可以查看汽车等信息'
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
