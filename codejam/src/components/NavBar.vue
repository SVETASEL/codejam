<template>
<nav class="navbar navbar-expand-lg bg-body-tertiary sticky-top" data-bs-theme="dark"> 
        <div class="container-fluid">
            <router-link class="nav__title" to="/">Reserva tu espacio</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Inicio</router-link>
                    </li>
                    <li class="nav-item dropdown" v-if="user">
                        <a class="nav-link dropdown-toggle" href="" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Reservas
                        </a>
                        <ul class="dropdown-menu" >
                            <li>
                                <router-link class="dropdown-item" to="/reservas">Nueva Reserva</router-link>
                            </li>
                            <li>
                                <router-link class="dropdown-item" to="/mis-reservas" >Mis reservas</router-link>
                            </li>
                        </ul>
                    </li>
                    
                    
                    <li class="nav-item" >
                        <router-link to="/login" class="nav-link" v-if="!user">Inicia sesión</router-link>
                    </li>
                    <li class="nav-item" >
                        <a href="" class="nav-link" v-if="user">Cerrar sesión</a>
                    </li>
                    
                </ul>
            </div>
        </div>
    </nav></template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
    name: 'NavBar',
    // props: {},
    data(){
        return {}
    },
    computed: {
        ...mapState(["user"])
    },
    methods: {
        ...mapActions(["clearUser"]),
        logout(){
            this.clearUser();
            alert("Se ha cerrado la sesión.");
            this.$router.push("/");
        }
    },    // watch: {},
    // components: {},
    // mixins: [],
    // filters: {},
    // -- Lifecycle Methods
    // -- End Lifecycle Methods
}
</script>

<style scoped>
    
</style>