<template>
    <div>
        <header>
            <h1 class="text-center">Modifica tu reserva</h1>
        </header>
        <main class="container">
    <div class="row justify-content-center">
      <div class="col-12 col-md-7 col-lg-5">
        <form v-if="user"  @submit.prevent="reviseReserva">
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
            <select class="form-select w-75" v-model="area">
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
              v-model="noParticipantes"
              @input="validateParticipants"
            />
          </div>
          <span v-if="errorParticipantes" class="text-danger">{{
            errorParticipantes
          }}</span>
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
            <select
              id="hora"
              class="form-control w-75"
              v-model="hora"
              @change="validateReservation"
              required
            >
              <option disabled value="">Selecciona una hora</option>
              <option v-for="time in availableTimes" :key="time" :value="time">
                {{ time }}
              </option>
            </select>
          </div>
          <span v-if="errorHora" class="text-danger">{{ errorHora }}</span>

          <div class="d-flex align-items-center my-2">
            <label for="duracion" class="form-label w-25">Duración:</label>
            <select
              class="form-select w-75"
              id="duracion"
              v-model="duracion"
              required
              @change="validateReservation"
            >
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
          <span v-if="errorDuracion" class="text-danger">{{
            errorDuracion
          }}</span>
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
    </div>
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
      noParticipantes: 1,
      errorParticipantes: "",

      errorHora: "",
      errorDuracion: "",
      duracion: "",
      hora: "",
        availableTimes: [],
        reserva: {
            area: "",
            noParticipantes: "",
            nombresParticipantes: "",
            fecha: "",
            hora: "",
            tiempo: ""
      }
    };
  },
  created() {
    this.generateAvailableTimes();
  },
  computed: {
      ...mapState(["reservas"]),
    id() {
            return this.$route.params.id
        }
  },
  methods: {
    validateDate(event) {
      const date = new Date(event.target.value);
      const day = date.getDay();
      if (day === 5 || day === 6) {
        // 0: Domingo, 6: Sábado
        alert("No se pueden reservar para fines de semana.");
        event.target.value = ""; // Limpiar el campo
      }
    },
    validateParticipants() {
      const value = parseInt(this.noParticipantes, 10);
      if (value < 1 || value > 4) {
        this.errorParticipantes =
          "Número de participantes debe estar entre 1 y 4.";
        this.noParticipantes = Math.min(Math.max(value, 1), 4); // Corrige el valor si está fuera del rango
      } else {
        this.errorParticipantes = "";
      }
    },
    generateAvailableTimes() {
      const minHour = 8; // 8 AM
      const maxHour = 19; // 8 PM
      const interval = 30; // minutes
      let times = [];

      for (let hour = minHour; hour <= maxHour; hour++) {
        for (let minute = 0; minute < 60; minute += interval) {
          let formattedHour = hour.toString().padStart(2, "0");
          let formattedMinute = minute.toString().padStart(2, "0");
          times.push(`${formattedHour}:${formattedMinute}`);
        }
      }
      this.availableTimes = times;
    },
    handleHoraChange(event) {
      this.validateHora();
    },

    validateReservation() {
      if (this.hora && this.duracion) {
        const [hour, minute] = this.hora.split(":").map(Number);
        const durationInMinutes = parseInt(this.duracion, 10);
        const reservationEndTime = hour * 60 + minute + durationInMinutes;
        const maxTime = 20 * 60; // 20:00 en minutos

        if (reservationEndTime > maxTime) {
          this.errorHora = "";
          this.errorDuracion = `La duración seleccionada excede la hora máxima de reserva permitida (20:00).`;
        } else {
          this.errorHora = "";
          this.errorDuracion = "";
        }
      }
      },
      ...mapActions(["setReservas", "updateReserva"]),
      getReserva() {
          let reserva = this.$store.getters.getReservaById(this.id);
          if (reserva) {
            this.reserva = reserva
          } else {
            this.reserva = undefined
          }
      },
      reviseReserva() {
          this.updateReserva(this.reserva);
          this.getReserva();
          alert("Reserva actualizada con éxito")
          this.$router.push('/mis_reservas')
    }
    },
  async mounted() {
        await this.setReservas()
        this.getReserva()
    },
};
</script>

<style scoped></style>