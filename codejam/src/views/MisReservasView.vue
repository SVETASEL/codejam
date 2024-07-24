<template>
  <div class="crudProductTable">
    <h2 class="crudProductTable__title text-center">Mis reservas</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tipo de Sala</th>
          <th scope="col">Participantes</th>
          <th scope="col">Fecha</th>
          <th scope="col">Hora</th>
          <th scope="col">Duración</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in reservas" :key="reserva.id">
          <th scope="row">{{ reserva.id }}</th>
          <td>{{ reserva.area }}</td>
          <td>{{ reserva.noParticipants }}</td>
          <td>{{ reserva.fecha }}</td>
          <td>{{ reserva.hora }}</td>
          <td>{{ reserva.tiempo }}</td>
          <td>
            <button class="btn btn-danger" @click="deleteReserva(reserva.id)">
              <i class="bi bi-trash"></i>
            </button>
            &nbsp;
            <router-link
              class="btn btn-warning"
              :to="{ name: 'update', params: { id: reserva.id } }"
              ><i class="bi bi-pencil"></i
            ></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  name: "MisReservasView",
  props: {
    reservas: [],
  },
  methods: {
    ...mapActions(["setReserva", "removeReserva"]),
    async deleteReserva(id) {
      try {
                await this.removeReserva(id);
                alert(`Se ha eliminado correctamente la reserva con id: ${id}`);
            } catch (error) {
                alert(error.message);
            }       
    }
  },
  computed: {
    ...mapState(["reservas"])
  },
  async mounted() {
    await this.setReserva()
    // this.reservas = this.$store.getters.getReservaByUser()
  },
};
</script>

<style scoped lang="scss">

</style>
