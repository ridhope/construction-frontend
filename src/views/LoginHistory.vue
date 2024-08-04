<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col">
        <h2 class="text-center">Login History</h2>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col text-right">
        <button class="btn btn-secondary" @click="goBack" style="margin-left: 20px;">Back to Dashboard</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Login ID</th>
              <th scope="col">User ID</th>
              <th scope="col">Login Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="login in loginHistory" :key="login.loginid">
              <td>{{ login.loginid }}</td>
              <td>{{ login.userid }}</td>
              <td>{{ new Date(login.logintimestamp).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      loginHistory: []
    };
  },
  methods: {
    async fetchLoginHistory() {
      try {
        const response = await axios.get('http://localhost:5075/api/users/login-history/554afc45-d2b8-4583-ac8d-b0afe83c4239');
        this.loginHistory = response.data;
      } catch (error) {
        console.error('Error fetching login history:', error);
      }
    },
    goBack() {
      this.$router.push('/dashboard');
    }
  },
  created() {
    this.fetchLoginHistory();
  }
};
</script>

<style scoped>
.text-center {
  text-align: center;
}
.text-right {
  text-align: right;
}
</style>