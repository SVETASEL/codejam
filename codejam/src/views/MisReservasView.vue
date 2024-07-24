<template>
  <div class="crudProductTable">
    <h2 class="crudProductTable__title text-center">Mis reservas</h2>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Tipo de Sala</th>
          <th scope="col">Imagen</th>
          <!-- <th scope="col">Descripción</th> -->
          <!--   <th scope="col">Precio</th> -->
          <th scope="col">Participntes</th>
          <th scope="col">Categoría</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in reservas" :key="reserva.id">
          <th scope="row">{{ reserva.id }}</th>
          <td>{{ reserva.area }}</td>
          <!-- <td>
            <img :src="sala.image" :alt="sala.name" width="50px" />
          </td> -->

          <td>{{ reserva.noParticipants }}</td>
          <td>{{ reserva.nombresParticipantes }}</td>
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
              :to="{ name: 'updateReserva', params: { id: reserva.id } }"
              ><i class="bi bi-pencil"></i
            ></router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "MisReservasView",
  props: {
    reservas: [],
  },
  methods: {
    deleteReserva(id) {
      this.$emit("delete-reserva", id);
    },
  },
  mounted() {
    this.reservas = [
      {
        id: 1,
        user_id: 2,
        area: "videojuegos",
        noParticipantes: 4,
        nombresParticipantes:
          "Carlos Godoy, Pedro Gonzalez, María Martínez, Anita Jeria",
        fecha: "2024-08-22",
        hora: "15:00",
        tiempo: 3,
      },
      {
        id: 1,
        user_id: 2,
        area: "ludoteca",
        noParticipantes: 2,
        nombresParticipantes: "Carlos Godoy, Anita Jeria",
        fecha: "2024-08-12",
        hora: "11:00",
        tiempo: 1,
      },
    ];
  },
};
</script>

<style scoped lang="scss">
.crudProductTable {
  &__title {
    color: rgb(24, 23, 23);
  }
}
</style>
