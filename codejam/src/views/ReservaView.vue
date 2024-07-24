<template>
    <header class="text-center">
        <h1>Crea una reserva</h1>
    </header>
    <main class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-7 col-lg-5">
                <form action="">
                    <div class="d-flex align-items-center">
                        <label for="name" class="form-label w-25">Nombre: </label>
                        <input type="text" name="name" id="name" class="form-control w-75 mt-1"  maxlength="50" disabled :placeholder=[[user.name]]>
                    </div>
                    <div>
                        <select class="form-select" aria-label="Categorías">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    name: 'ReservaView',
    // props: {},
    data(){
        return {}
    },
    computed: {
        ...mapState (["user"])
    },
    methods: {
    },
    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>