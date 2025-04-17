<template>
  <div>
    <h1>支付页面</h1>
    <form @submit.prevent="handlePayment">
      <div>
        <label for="amount">金额:</label>
        <input id="amount" v-model="paymentAmount" type="number" required>
      </div>
      <button type="submit">支付</button>
    </form>
    <div v-if="paymentStatus">{{ paymentStatus }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paymentAmount: '',
      paymentStatus: null
    }
  },
  methods: {
    async handlePayment() {
      try {
        const response = await this.makePayment(this.paymentAmount)
        this.paymentStatus = response.message // 根据API响应更新状态信息
      } catch (error) {
        this.paymentStatus = '支付失败: ' + error.message
      }
    },
    makePayment(amount) {
      // 调用后端API进行支付处理
      // 返回一个Promise，模拟API调用
      return new Promise((resolve, reject) => {
        // 模拟API调用，实际应用中应该是axios.post等请求
        setTimeout(() => {
          if (Math.random() > 0.5) { // 随机模拟成功或失败
            resolve({ message: '支付成功!' })
          } else {
            reject(new Error('网络错误'))
          }
        }, 1000)
      })
    }
  }
}
</script>
