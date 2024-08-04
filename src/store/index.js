// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    user: null,
    projects: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setProjects(state, projects) {
      state.projects = projects;
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axios.post('http://localhost:5075/api/users/login', credentials);
        if (response.data.userId) {
          commit('setUser', response.data.userId);
          sessionStorage.setItem('userId', response.data.userId);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        throw new Error('Invalid username or password');
      }
    },
    async fetchProjects({ commit }) {
      const response = await axios.get('http://localhost:8000/api/projects');
      commit('setProjects', response.data);
    },
    logout({ commit }) {
      commit('setUser', null);
      sessionStorage.removeItem('userId');
    }
  }
});

export default store;