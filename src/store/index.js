// store/index.js
import { createStore } from 'vuex';
import axios from 'axios';
import { API_BASE_DOTNET_USER } from '@/config';
import { API_BASE_SYMFONY_PROJECT } from '@/config';

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
        const response = await axios.post(`${API_BASE_DOTNET_USER}/login`, credentials);
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
      const response = await axios.get(`${API_BASE_SYMFONY_PROJECT}`);
      commit('setProjects', response.data);
    },
    logout({ commit }) {
      commit('setUser', null);
      sessionStorage.removeItem('userId');
    }
  }
});

export default store;