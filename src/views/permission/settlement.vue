<template>
  <el-dialog
    title="请扫描下方二维码付款"
    :visible.sync="dialogCodeVisible"
    class="dialog-qrcode"
  >
    <div id="qrcode" class="qr_codes">
      <img :src="qrCodeDataUrl" alt="二维码">
    </div>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcode'
import { getRoutes } from '@/api/role'

export default {
  name: 'Settlement',
  data() {
    return {
      qrCodeDataUrl: '',
      dialogCodeVisible: false,
      dialogRateVisible: false
    }
  },
  computed: {
    routesData() {
      return this.routes
    }
  },
  created() {
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
