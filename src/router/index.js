import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProjectDetailView from '../views/ProjectDetailView.vue';
import ProjectForm from '../views/ProjectForm.vue'; // Import ProjectForm
import LoginHistory from '../views/LoginHistory.vue'; // Import LoginHistory

const routes = [
  { path: '/', component: LoginView },
  { path: '/dashboard', component: DashboardView },
  { path: '/project/:id', component: ProjectDetailView, meta: { requiresAuth: true } },
  { path: '/project-form', component: ProjectForm, meta: { requiresAuth: true } }, // Add route for ProjectForm
  { path: '/project-form/:id', component: ProjectForm, props: { isEdit: true }, meta: { requiresAuth: true } }, // Add route for editing project
  { path: '/login-history', component: LoginHistory, meta: { requiresAuth: true } } // Add route for LoginHistory
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const userId = sessionStorage.getItem('userId');
    if (!userId) {
      next({ path: '/' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;