<template>
    <div class="container">
      <h2>{{ isEdit ? 'Edit Project' : 'Create Project' }}</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="projectName">Project Name</label>
          <input type="text" v-model="form.projectName" class="form-control" id="projectName" required>
        </div>
        <div class="form-group">
          <label for="projectLocation">Project Location</label>
          <input type="text" v-model="form.projectLocation" class="form-control" id="projectLocation" required>
        </div>
        <div class="form-group">
          <label for="projectStage">Project Stage</label>
          <select v-model="form.projectStage" class="form-control" id="projectStage" required>
            <option value="Concept">Concept</option>
            <option value="Design & Documentation">Design & Documentation</option>
            <option value="Pre-Construction">Pre-Construction</option>
            <option value="Construction">Construction</option>
          </select>
        </div>
        <div class="form-group">
          <label for="projectCategory">Project Category</label>
          <select v-model="form.projectCategory" class="form-control" id="projectCategory" required>
            <option value="Education">Education</option>
            <option value="Health">Health</option>
            <option value="Office">Office</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div class="form-group" v-if="form.projectCategory === 'Others'">
          <label for="otherCategory">Other Category</label>
          <input type="text" v-model="form.otherCategory" class="form-control" id="otherCategory">
        </div>
        <div class="form-group">
          <label for="constructionStartDate">Construction Start Date</label>
          <input type="date" v-model="form.constructionStartDate" class="form-control" id="constructionStartDate" required>
        </div>
        <div class="form-group">
          <label for="projectDetails">Project Details</label>
          <textarea v-model="form.projectDetails" class="form-control" id="projectDetails" required></textarea>
        </div>
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Update' : 'Create' }}</button>
        <button @click="goBack" type="button" class="btn btn-secondary" style="margin-left: 20px;">Back to Dashboard</button>
      </form>
      <div v-if="errorMessage" class="alert alert-danger" role="alert">
        {{ errorMessage }}
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { v4 as uuidv4 } from 'uuid';
  
  export default {
    data() {
      return {
        form: {
          projectID: '',
          projectName: '',
          projectLocation: '',
          projectStage: '',
          projectCategory: '',
          otherCategory: '',
          constructionStartDate: '',
          projectDetails: '',
          projectCreatorID: ''
        },
        isEdit: false,
        errorMessage: ''
      };
    },
    created() {
      const projectID = this.$route.params.id;
      if (projectID) {
        this.isEdit = true;
        this.fetchProjectData(projectID);
      } else {
        this.form.projectID = uuidv4();
      }
      // Set projectCreatorID from session storage
      this.form.projectCreatorID = sessionStorage.getItem('userId');
    },
    methods: {
      async fetchProjectData(projectID) {
        try {
          const response = await axios.get(`http://localhost:5075/api/projects/${projectID}`);
          const project = response.data;
          // Convert constructionStartDate to YYYY-MM-DD format
          project.constructionStartDate = new Date(project.constructionStartDate).toISOString().split('T')[0];
          this.form = project;
        } catch (error) {
          console.error('Error fetching project data:', error);
          this.errorMessage = 'Failed to fetch project data. Please try again.';
        }
      },
      async submitForm() {
        try {
          // Convert constructionStartDate to the desired format
          const formattedDate = new Date(this.form.constructionStartDate).toISOString().split('T')[0] + 'T00:00:00Z';
          const formData = { ...this.form, constructionStartDate: formattedDate };
  
          let response;
          if (this.isEdit) {
            response = await axios.put(`http://localhost:5075/api/projects/${this.form.projectID}`, formData);
          } else {
            response = await axios.post('http://localhost:5075/api/projects', formData);
          }
  
          if (response.status >= 200 && response.status < 300) {
            console.log('Form submitted successfully:', response.data);
            // Navigate to the dashboard
            this.$router.push('/dashboard');
          } else {
            this.errorMessage = 'Failed to save the project. Please try again.';
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          this.errorMessage = 'Failed to save the project. Please try again.';
        }
      },
      goBack() {
        this.$router.push('/dashboard');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>