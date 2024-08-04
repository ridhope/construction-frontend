import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './router'; // Import router
import store from './store'; // Pastikan jalur impor benar

const app = createApp(App);
app.use(router); // Gunakan router
app.use(store); // Gunakan store
app.mount('#app');