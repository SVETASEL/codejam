import { createStore } from "vuex";
import usersService from "@/services/usersService";

export default createStore({
  state: {
    users: [],
    user: null,
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("SET_USER", user);
      localStorage.setItem("user", JSON.stringify(user));
    },
    clearUser({ commit }) {
      commit("SET_USER");
      localStorage.removeItem("user");
    },
    initUser({ commit }) {
      let user = localStorage.getItem("user");
      if (user) {
        user = JSON.parse(user);
        commit("SET_USER", user);
      }
    },
    async setUsers({ commit, state }) {
      try {
        let users = localStorage.getItem("users");

        if (users) {
          console.log("Existe users en localStorage");
          users = JSON.parse(users);
        } else {
          console.log("No Existe users en localStorage");
          if (state.users.length == 0) {
            users = await usersService.getUsers();
            localStorage.setItem("users", JSON.stringify(users));
          }
        }

        commit("SET_USERS", users);
      } catch (error) {
        console.log(error);
        localStorage.clear();
        throw new Error("Error al obtener la información de usuarios.");
      }
    },
  },
  modules: {},
});
