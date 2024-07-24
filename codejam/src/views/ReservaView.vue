<template>
  <header class="text-center">
    <h1>Crea una reserva</h1>
  </header>
  <main class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-5">
        <form v-if="user">
          <div class="d-flex align-items-center my-2">
            <label for="name" class="form-label w-25">Nombre: </label>
            <input
              type="text"
              name="name"
              id="name"
              class="form-control w-75"
              disabled
              :placeholder="[[user.name]]"
            />
          </div>
          <div class="d-flex align-items-center my-2">
            <label for="area" class="form-label w-25">Área: </label>
            <select class="form-select w-75">
              <option selected disabled>
                ¿Qué tipo de área quieres reservar?
              </option>
              <option value="videojuegos">Sala de videojuegos</option>
              <option value="ludoteca">Mesas de ludoteca</option>
              <option value="sillones">Sillones de descanso</option>
              <option value="cabina">Cabina telefónica</option>
            </select>
          </div>
          <div class="d-flex align-items-center my-2">
            <label for="noParticipantes" class="form-label w-25"
              >Número de Participantes:
            </label>
            <input
              type="number"
              name="noParticipantes"
              id="noParticipantes"
              min="1"
              max="4"
              class="form-control w-75"
              required
            />
          </div>
          <div class="d-flex align-items-center my-2">
            <label for="nombresParticipantes" class="form-label w-25"
              >Nombres de los participantes (opcional)
            </label>
            <textarea
              name="nombresParticipantes"
              id="nombresParticipantes"
              class="form-control w-75"
              rows="2"
            ></textarea>
          </div>
          <div class="d-flex align-items-center my-2">
            <label for="fecha" class="form-label w-25">Fecha:</label>
            <input
              type="date"
              class="form-control w-75"
              id="fecha"
              required
              :min="minDate"
              :max="maxDate"
              @change="validateDate"
            />
          </div>
          <div class="d-flex align-items-center my-2">
            <label for="hora" class="form-label w-25">Hora:</label>
            <input
              type="time"
              class="form-control w-75"
              id="hora"
              required
              min="08:00"
              max="20:00"
            />
          </div>
          <div class="d-flex align-items-center my-2">
            <label for="duracion" class="form-label w-25">Duración:</label>
            <select class="form-select w-75" id="duracion" required>
              <option value="30">30 minutos</option>
              <option value="60">1 hora</option>
              <option value="90">1 hora 30 minutos</option>
              <option value="120">2 horas</option>
              <option value="150">2 horas 30 minutos</option>
              <option value="180">3 horas</option>
              <option value="210">3 horas 30 minutos</option>
              <option value="240">4 horas</option>
            </select>
          </div>
          <div class="py-3 d-flex justify-content-around">
            <input
              type="submit"
              class="btn btn-success"
              value="Realizar reserva"
            />
            &nbsp;
            <router-link class="btn btn-warning" to="/">Cancelar</router-link>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ReservaView",
  // props: {},
  data() {
    const today = new Date();
    const minDate = today.toISOString().split("T")[0]; // Fecha de hoy
    const maxDate = new Date(today.setMonth(today.getMonth() + 1))
      .toISOString()
      .split("T")[0]; // Fecha hasta 1 mes
    return {
      minDate,
      maxDate,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    validateDate(event) {
      const date = new Date(event.target.value);
      const day = date.getDay();
      if (day === 0 || day === 6) {
        // 0: Domingo, 6: Sábado
        alert("No se pueden reservar para fines de semana.");
        event.target.value = ""; // Limpiar el campo
      }
    },
  },
};
</script>

<style scoped></style>
