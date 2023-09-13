<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">ADB</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupporteFdContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          @click="toggleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse"
          :class="{ show: navbarOpen }"
          id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link" @click="closeNavbar"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link
                v-if="loggedIn"
                to="/dashboard"
                class="nav-link"
                @click="closeNavbar"
                >Dasboard</router-link
              >
            </li>
          </ul>
          <div class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link
                :to="{ name: 'login' }"
                v-if="!loggedIn"
                class="btn btn-primary mx-2 my-2 my-sm-0"
                >LOGIN</router-link
              >
              <!-- Add a logout button for logged-in users -->
              <button
                @click="logout"
                v-if="loggedIn"
                class="btn btn-danger mx-2 my-2 my-sm-0">
                LOGOUT
              </button>
            </li>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",

  data() {
    return {
      loggedIn: null,
    };
  },

  methods: {
    getLoggedIn() {
      this.loggedIn = localStorage.getItem("loggedIn");
    },
    logout() {
      axios.get("http://localhost:8000/api/logout").then(() => {
        //remove localStorage
        localStorage.removeItem("loggedIn");

        //redirect
        return this.$router.push({ name: "login" });
      });
    },
  },

  watch: {
    $route: {
      immediate: true,
      handler() {
        this.getLoggedIn();
      },
    },
  },
};
</script>
<style>
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active,
nav a.router-link-exact-active:visited {
  /* Setelah diklik, warna tetap hijau */
  color: #42b983;
}
</style>
