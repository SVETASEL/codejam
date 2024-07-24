<template>
  <div class="products">
    <header class="py-3">
      <h1 class="text-center">Bienvenid@s!</h1>
      <h5>Revisa los espacios que puedes reservar</h5>
    </header>
    <main class="container py-3">
      <section class="products__list">
        <div class="row g-3">
          <div class="col-12 col-md-3" v-for="sala in salas" :key="sala.id">
            <Card :sala="sala" />
          </div>
        </div>
      </section>
      <div class="text-center mt-4">
        <button class="btn btn-primary" @click="handleButtonClick">
          {{ buttonText }}
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import { mapState } from "vuex";

export default {
  name: "HomeView",
  components: {
    Card,
  },
  data() {
    return {
      salas: [], // Inicializa salas como un array vacío
    };
  },
  computed: {
    ...mapState(["user"]),
    buttonText() {
      return this.user ? "Reservar" : "Ingresar";
    },
  },
  methods: {
    handleButtonClick() {
      if (this.user) {
        // Acciones para reservar
        this.$router.push({ name: "reservas" });
      } else {
        this.$router.push({ name: "login" });
      }
    },
  },
  mounted() {
    // Aquí puedes cargar los datos desde una API o un archivo local
    this.salas = [
      {
        id: 1,
        name: "Sala de videojuegos",
        description:
          "Un rincón para liberar estrés y aumentar la creatividad con diversión digital.",
        price: 1000,
        participantes: 4,
        category: "Salas de videojuegos",
        image: "../imagenes/videojuegos.jpg",
      },
      {
        id: 2,
        name: "Mesas de ludoteca",
        description:
          "Espacios para desconectar, conectar con colegas y dejar volar la imaginación con juegos de mesa.",
        price: 1500,
        participantes: 4,
        category: "Mesas de ludoteca",
        image: "../imagenes/ludoteca.webp",
      },
      {
        id: 3,
        name: "Sillones de descanso",
        description:
          "Oasis de comodidad para recargar energía y relajar la mente entre tareas",
        price: 4500,
        participantes: 4,
        category: "Sillones de descanso",
        image: "../imagenes/sillones.webp",
      },
      {
        id: 4,
        name: "Cabinas telefónicas",
        description:
          "Pequeños refugios privados para llamadas importantes y momentos de concentración en un entorno tranquilo",
        price: 7500,
        participantes: 1,
        category: "Cabinas telefonicas",
        image: "../imagenes/telefono.jpeg",
      },
    ];
  },
};
</script>
