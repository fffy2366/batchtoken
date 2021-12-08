<template>
  <div>
    <!-- <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li>
        <router-link to="/users/eduardo/posts/1"
          >/users/eduardo/posts/1</router-link
        >
      </li>
      <li>
        <router-link to="/users/eduardo/posts/20"
          >/users/eduardo/posts/20</router-link
        >
      </li>
    </ul> -->
    <Navbar />

    <div class="container-fluid">
      <div class="row">
        <Sidebar />

        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" />
            </keep-alive>
          </router-view>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Sidebar from "./components/Sidebar.vue";
import { mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
  },
  computed: {
    ...mapGetters("accounts", ["getChainName", "isUserConnected"]),
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

ul {
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

li:not(:last-of-type) {
  margin-right: 1rem;
}

.router-link-active {
  color: orange;
}

.router-link-exact-active {
  color: crimson;
}
</style>
