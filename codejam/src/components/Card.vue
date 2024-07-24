<template>
  <div class="cardProduct card h-100" style="width: 100%">
    <img :src="sala.image" class="card-img-top" :alt="sala.name" />
    <div class="card-body">
      <h5 class="card-title">{{ sala.name }}</h5>
      <p class="card-text">
        {{ sala.description }}
      </p>
      <!--  <p class="card-text">Precio: {{ sala.price }}</p> -->
      <p class="card-text">
        Número máximo de participantes: {{ sala.participantes }}
      </p>
      <p class="card-text">Categoria: {{ sala.category }}</p>
      <div class="d-flex justify-content-evenly">
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Card",
  props: {
    sala: Object,
  },
  methods: {
    ...mapActions(["addToCart"]),
    addProductCart() {
      this.addToCart(this.sala);
      alert("Producto agregado correctamente.");
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped lang="scss">
.cardProduct {
  img {
    aspect-ratio: 3/2;
  }
}
</style>
