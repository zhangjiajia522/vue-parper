<template>
  <div class="app-container">
    <el-button type="primary" @click="handleAddBook">新增</el-button>
    <el-select
      v-model="categary"
      placeholder="请选择图书类型"
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
    <el-input v-model="bookName" placeholder="请输入图书名称" class="left-input" style="width: 200px;" @keyup.enter.native="handleFilter" />
    <el-table :data="bookList" style="width: 100%;margin-top:30px;" border>
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
      <el-table-column align="center" label="图书类型">
        <template slot-scope="scope">
          {{ scope.row.category }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者">
        <template slot-scope="scope">
          {{ scope.row.author }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出版社">
        <template slot-scope="scope">
          {{ scope.row.book_from }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="出版时间">
        <template slot-scope="scope">
          {{ scope.row.publication_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="入库时间">
        <template slot-scope="scope">
          {{ scope.row.create_time }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="库存数量">
        <template slot-scope="scope">
          {{ scope.row.count }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="价格">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="图书状态">
        <template slot-scope="scope">
          <a href="" style="color:#1890ff;">{{ scope.row.status }}</a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :visible.sync="dialogFormVisible"
      :title="dialogType==='edit'?'修改图书信息':'新增图书信息'"
    >
      <el-form :model="formBook">
        <el-form-item label="id">
          <el-input v-model="formBook.id" disabled />
        </el-form-item>
        <el-form-item label="书名">
          <el-input v-model="formBook.name" />
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formBook.author" />
        </el-form-item>
        <el-form-item label="出版时间">
          <el-input v-model="formBook.publication_time" />
        </el-form-item>
        <el-form-item label="图书类型">
          <el-select v-model="formBook.categary" clearable placeholder="请选择图书类型" class="left-input">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="formBook.price" />
        </el-form-item>
        <el-form-item label="库存数量">
          <el-input v-model="formBook.count" />
        </el-form-item>
        <el-form-item label="图书状态">
          <el-select v-model="formBook.status" placeholder="请选择图书状态">
            <el-option value="在售" />
            <el-option value="下架" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleCancelClick(formBook)">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisibleSureClick(formBook)">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getBook, addBook, updateBook, deleteBook } from '@/api/book'

const defaultRole = {
  key: '',
  name: '',
  id: '',
  description: '',
  routes: []
}
export default {
  data() {
    return {
      dialogType: 'new',
      categary: '',
      bookName: '',
      options: [
        {
          value: '1',
          label: '小说'
        }, {
          value: '2',
          label: '计算机网络'
        }, {
          value: '3',
          label: '文化'
        }, {
          value: '4',
          label: '童书'
        }
      ],
      dialogFormVisible: false,
      formBook: {},
      role: Object.assign({}, defaultRole),
      routes: [],
      bookList: [],
      checkStrictly: false,
      dialogCodeVisible: false,
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
    this.getBooks()
  },
  methods: {
    jump(scope) {
      console.log(scope)
      this.$router.push({
        name: 'book',
        params: { pkey: scope.pkey }
      })
    },
    async getBooks() {
      this.bookList = [
        {
          imgs: require('./img/vue.jpg'),
          name: 'Vue.js前端开发实战',
          price: '￥36.90',
          category: '计算机网络',
          role: ['admin', 'User'],
          pkey: 'vue',
          id: 'vue',
          author: '黑马程序员',
          book_from: '人民邮电出版社',
          publication_time: '2023-08-01',
          create_time: '2025-03-10',
          count: 17,
          status: '在售'
        },
        {
          imgs: require('./img/pingfan.png'),
          pkey: 'pingfan',
          id: 'huanghe',
          name: '平凡的世界',
          category: '小说',
          author: '路遥',
          publication_time: '2021-06-01',
          book_from: '北京十月文艺文艺出版社',
          create_time: '2025-03-10',
          count: 7,
          status: '在售',
          price: '￥38.89'
        },
        {
          imgs: require('./img/honglou.png'),
          pkey: 'honglou',
          id: 'huanghe',
          name: '红楼梦',
          category: '小说',
          author: '曹雪芹',
          book_from: '北京文联出版社',
          publication_time: '2012-06-01',
          create_time: '2025-03-07',
          count: 25,
          status: '在售',
          price: '￥29.90'
        },
        {
          imgs: require('./img/huanghe.png'),
          pkey: 'huanghe',
          id: 'huanghe',
          publication_time: '2018-06-01',
          name: '黄河之旅',
          category: '文化',
          author: '比尔.波特',
          book_from: '四川文艺出版社',
          create_time: '2025-03-08',
          count: 5,
          status: '在售',
          price: '￥22.88'
        }
      ]
      getBook().then(response => {
        // 后台返回有数据时候渲染
        this.bookList = response.data
      })
    },
    dialogFormVisibleSureClick(formBook) {
      this.dialogFormVisible = false
      // if (this.dialogType === 'new') {
      //   addBook(this.formBook).then(response => {
      //     this.$message({
      //       message: `新增Book成功`,
      //       type: 'success'
      //     })
      //   }).catch(error => {
      //     console.log(error)
      //   })
      // }
      // updateBook(formBook).then(response => {
      //   this.$message({
      //     message: `修改Book成功`,
      //     type: 'success'
      //   })
      // }).catch(error => {
      //   console.log(error)
      // })
      this.$message({
        message: `修改Book成功`,
        type: 'success'
      })
      this.bookList = [
        {
          imgs: require('./img/vue.jpg'),
          name: 'Vue.js前端开发实战',
          price: '￥36.90',
          category: '计算机网络',
          role: ['admin', 'User'],
          pkey: 'vue',
          id: 'vue',
          author: '黑马程序员',
          book_from: '人民邮电出版社',
          publication_time: '2023-08-01',
          create_time: '2025-03-10',
          count: 17,
          status: '在售'
        },
        {
          imgs: require('./img/pingfan.png'),
          pkey: 'pingfan',
          id: 'huanghe',
          name: '平凡的世界',
          category: '小说',
          author: '路遥',
          publication_time: '2021-06-01',
          book_from: '北京十月文艺文艺出版社',
          create_time: '2025-03-10',
          count: 107,
          status: '在售',
          price: '￥38.89'
        },
        {
          imgs: require('./img/honglou.png'),
          pkey: 'honglou',
          id: 'huanghe',
          name: '红楼梦',
          category: '小说',
          author: '曹雪芹',
          book_from: '北京文联出版社',
          publication_time: '2012-06-01',
          create_time: '2025-03-07',
          count: 25,
          status: '在售',
          price: '￥29.90'
        },
        {
          imgs: require('./img/huanghe.png'),
          pkey: 'huanghe',
          id: 'huanghe',
          publication_time: '2018-06-01',
          name: '黄河之旅',
          category: '文化',
          author: '比尔.波特',
          book_from: '四川文艺出版社',
          create_time: '2025-03-08',
          count: 5,
          status: '在售',
          price: '￥22.88'
        }
      ]
    },
    dialogFormVisibleCancelClick(formBook) {
      this.dialogFormVisible = false
    },
    handleAddBook() {
      this.dialogType = 'new'
      this.dialogFormVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogFormVisible = true
      this.formBook = {
        imgs: require('./img/pingfan.png'),
        pkey: 'pingfan',
        id: 'pingfan',
        name: '平凡的世界',
        publication_time: '2021-06-01',
        category: '中国文学',
        author: '路遥',
        book_from: '北京十月文艺文艺出版社',
        create_time: '2025-03-10',
        count: 7,
        status: '在售',
        price: '￥38.89'
      }
      getBook(scope.id).then(response => {
        // 将当前数据渲染到页面上进行修改
        this.formBook = response.data
      })
    },
    selectChange(val, event) {
      this.bookList = [
        {
          imgs: require('./img/vue.jpg'),
          name: 'Vue.js前端开发实战',
          price: '￥36.90',
          category: '计算机网络',
          role: ['admin', 'User'],
          pkey: 'vue',
          id: 'vue',
          author: '黑马程序员',
          book_from: '人民邮电出版社',
          publication_time: '2023-08-01',
          create_time: '2025-03-10',
          count: 17,
          status: '在售'
        }
      ]
    },
    handleFilter(val, event) {
      console.log(val)
      console.log(event)
      this.bookList = [
        {
          imgs: require('./img/huanghe.png'),
          pkey: 'huanghe',
          id: 'huanghe',
          publication_time: '2018-06-01',
          name: '黄河之旅',
          category: '文化',
          author: '比尔.波特',
          book_from: '四川文艺出版社',
          create_time: '2025-03-08',
          count: 5,
          status: '在售',
          price: '￥22.88'
        }
      ]
    },
    handleDelete({ $index, row }) {
      this.$confirm('确定删除嘛？', 'Warning', {
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        type: 'warning'
      })
        .then(async() => {
          // await deleteBook(row.key)
          // this.bookList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.bookList = [
            {
              imgs: require('./img/pingfan.png'),
              pkey: 'pingfan',
              id: 'huanghe',
              name: '平凡的世界',
              category: '小说',
              author: '路遥',
              publication_time: '2021-06-01',
              book_from: '北京十月文艺文艺出版社',
              create_time: '2025-03-10',
              count: 7,
              status: '在售',
              price: '￥38.89'
            },
            {
              imgs: require('./img/honglou.png'),
              pkey: 'honglou',
              id: 'huanghe',
              name: '红楼梦',
              category: '小说',
              author: '曹雪芹',
              book_from: '北京文联出版社',
              publication_time: '2012-06-01',
              create_time: '2025-03-07',
              count: 25,
              status: '在售',
              price: '￥29.90'
            },
            {
              imgs: require('./img/huanghe.png'),
              pkey: 'huanghe',
              id: 'huanghe',
              publication_time: '2018-06-01',
              name: '黄河之旅',
              category: '文化',
              author: '比尔.波特',
              book_from: '四川文艺出版社',
              create_time: '2025-03-08',
              count: 5,
              status: '在售',
              price: '￥22.88'
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
  .left-input {
    margin-left: 20px;
  }
}
</style>
