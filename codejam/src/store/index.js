import { createStore } from "vuex";
import usersService from "@/services/usersService";
import reservationServices from "@/services/reservationServices";

export default createStore({
  state: {
    users: [],
    user: null,
    reservas: [],
  },
  getters: {
    getReservaById: (state) => (id) => {
      return state.reservas.find((reserva) => reserva.id == id);
    },
    getReservaByUser: (state) => () => {
      return state.reservas.filter(
        (reserva) => reserva.user_id == state.user.id
      );
    },
  },
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
    SET_RESERVAS(state, reservas) {
      state.reservas = reservas;
    },
    ADD_RESERVA(state, reservas) {
      state.reservas.push(reservas);
    },
    UPDATE_RESERVA(state, data) {
      state.reservas[data.index] = data.reserva;
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

    async setReserva({ commit, state }) {
      try {
        let reservas = localStorage.getItem("reservas");
        if (reservas) {
          console.log("Existe reserva en localStorage");
          reservas = JSON.parse(reservas);
        } else {
          console.log("No Existe reserva en localStorage");
          if (!state.reserva) {
            reserva = await reservationServices.getReservas();
            localStorage.setItem("reservas", JSON.stringify(reservas));
          }
        }
        commit("SET_RESERVAS", reservas);
        return true;
      } catch (error) {
        console.log(error);
        localStorage.clear();
        throw new Error("Error al obtener la información de la reserva.");
      }
    },
    async addReserva({ commit, state }, reserva) {
      try {
        commit("ADD_RESERVA", reserva);
        localStorage.setItem("reservas", JSON.stringify(state.reservas));
        return true;
      } catch (error) {
        console.log(error);
        throw new Error("Error al crear la reserva.");
      }
    },
    async removeReserva({ commit, state }, id) {
      try {
        let indexReserva = state.reservas.findIndex(
          (reserva) => reserva.id == id
        );
        let reservas = [];
        if (indexReserva >= 0) {
          reservas = state.reservas;
          reservas.splice(indexReserva, 1);

          commit("SET_RESERVAS", reserva);
          localStorage.setItem("reservas", JSON.stringify(state.reservas));

          return true;
        } else {
          throw new Error("La reserva que intenta eliminar no existe.");
        }
      } catch (error) {
        throw new Error(error.message);
      }
    },
    updateReserva({ commit, state }, reservaUpdate) {
      try {
        let index = state.reservas.findIndex(
          (reserva) => reserva.id == reservaUpdate.id
        );
        if (index == -1) {
          return alert("Reserva no encontrado");
        }
        commit("UPDATE_RESERVA", { index, reserva: reservaUpdate });
        localStorage.setItem("reservas", JSON.stringify(state.reservas));
        return true;
      } catch (error) {
        alert(
          `No fue posible actualizar la reserva con ID: ${reservaUpdate.id}`
        );
      }
    },
  },
  modules: {},
});
