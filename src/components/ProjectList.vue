<template>
  <div class="container">
    <div class="row mb-4">
      <div class="col">
        <h2 class="text-center">Project List</h2>
      </div>
    </div>
    <div class="row mb-4">
      <div class="col text-right">
        <button class="btn btn-primary mr-2" @click="createProject">Create Project</button>
        <button class="btn btn-info btn-sm mr-2" @click="historyLogin" style="margin-left: 20px;">History Login</button>
        <button class="btn btn-secondary" @click="handleLogout" style="margin-left: 20px;">Logout</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Project Name</th>
              <th scope="col">Project Location</th>
              <th scope="col">Project Stage</th>
              <th scope="col">Project Category</th>
              <th scope="col">Construction Start Date</th>
              <th scope="col">Project Details</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="project in projects" :key="project.projectID">
              <td>{{ project.projectName }}</td>
              <td>{{ project.projectLocation }}</td>
              <td>{{ project.projectStage }}</td>
              <td>{{ project.projectCategory }}</td>
              <td>{{ new Date(project.constructionStartDate).toLocaleDateString() }}</td>
              <td>{{ project.projectDetails }}</td>
              <td>
                <button class="btn btn-info btn-sm mr-2" @click="viewProject(project.projectID)" style="margin-left: 5px;">View</button>
                <button class="btn btn-warning btn-sm mr-2" @click="editProject(project.projectID)" style="margin-left: 5px;">Edit</button>
                <button class="btn btn-danger btn-sm" @click="confirmDelete(project.projectID)" style="margin-left: 5px;">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="showDeleteModal" class="modal fade show" tabindex="-1" role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteModalLabel">Confirm Delete</h5>
          </div>
          <div class="modal-body">
            Are you sure you want to delete this project?
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button type="button" class="btn btn-danger" @click="deleteProject">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapActions } from 'vuex';
import { API_BASE_DOTNET_PROJECT } from '@/config';

export default {
  data() {
    return {
      projects: [],
      projectToDelete: null,
      showDeleteModal: false
    };
  },
  computed: {
    ...mapState(['projects'])
  },
  methods: {
    ...mapActions(['fetchProjects', 'logout']),
    async fetchProjects() {
      try {
        const response = await axios.get(`${API_BASE_DOTNET_PROJECT}`);
        this.projects = response.data;
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    },
    viewProject(id) {
      this.$router.push(`/project/${id}`);
    },
    editProject(id) {
      this.$router.push(`/project-form/${id}`);
    },
    confirmDelete(id) {
      this.projectToDelete = id;
      this.showDeleteModal = true;
    },
    async deleteProject() {
      try {
        await axios.delete(`${API_BASE_DOTNET_PROJECT}/${this.projectToDelete}`);
        this.projects = this.projects.filter(project => project.projectID !== this.projectToDelete);
        this.closeModal();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    },
    createProject() {
      this.$router.push('/project-form');
    },
    historyLogin() {
      this.$router.push('/login-history');
    },
    handleLogout() {
      this.logout();
      this.$router.push('/');
    },
    closeModal() {
      this.showDeleteModal = false;
    }
  },
  created() {
    this.fetchProjects();
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
.modal.fade.show {
  display: block;
}
</style>