<template>
  <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
    <div>
      <button
        class="navbar-toggler d-md-none collapsed"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="navbar-brand col-md-3 col-lg-2 me-0" href="#">Batchtoken</a>
    </div>

    <ul class="navbar-nav px-3">
      <li class="nav-item text-nowrap">
        <a class="nav-link" href="#" v-if="!isUserConnected" @click="connectWeb3Modal"
          >Connect your wallet</a
        >
        <a class="nav-link" href="#" v-if="isUserConnected" @click="disconnectWeb3Modal"
          >Disconnect {{ getActiveAccount.substring(0, 7) }}...</a
        >
      </li>
    </ul>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters('accounts', ['getActiveAccount', 'isUserConnected', 'getWeb3Modal'])
  },
  created() {
    this.$store.dispatch('accounts/initWeb3Modal')
    this.$store.dispatch('accounts/ethereumListener')
  },
  methods: {
    ...mapActions('accounts', ['connectWeb3Modal', 'disconnectWeb3Modal'])
  }
}
</script>
