<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h2>Project Details</h2>
        <div v-if="project" class="card">
          <div class="card-body">
            <p><strong>ID:</strong> {{ project.projectid }}</p>
            <p><strong>Name:</strong> {{ project.projectname }}</p>
            <p><strong>Location:</strong> {{ project.projectlocation }}</p>
            <p><strong>Stage:</strong> {{ project.projectstage }}</p>
            <p><strong>Category:</strong> {{ project.projectcategory }}</p>
            <p><strong>Details:</strong> {{ project.projectdetails }}</p>
            <p><strong>Other Category:</strong> {{ project.othercategory }}</p>
            <p><strong>Construction Start Date:</strong> {{ project.constructionstartdate }}</p>
            <p><strong>Creator ID:</strong> {{ project.projectcreatorid }}</p>
          </div>
        </div>
        <div v-else class="alert alert-info">
          Loading...
        </div>
        <button class="btn btn-primary" @click="goBack">Back to Dashboard</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      project: null
    };
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:8000/api/projects/${this.$route.params.id}`);
      console.log(response.data); // Tambahkan log untuk memeriksa data
      this.project = response.data;
    } catch (error) {
      console.error('Failed to fetch project details:', error);
    }
  },
  methods: {
    goBack() {
      this.$router.push('/dashboard');
    }
  }
};
</script>

<style scoped>
/* Tambahkan gaya khusus jika diperlukan */
</style>