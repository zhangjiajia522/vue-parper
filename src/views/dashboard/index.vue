<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole" /> -->
    <indexs />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import indexs from './indexs.vue'
// import adminDashboard from './admin'
// import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  components: { indexs },
  data() {
    return {
      // currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard'
    }
  }
}
</script>
