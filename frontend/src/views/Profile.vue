<template>
  <div>
    <div
      class="
        d-flex
        justify-content-between
        flex-wrap flex-md-nowrap
        align-items-center
        pt-3
        pb-2
        mb-3
        border-bottom
      "
    >
      <h1 class="h2">Your profile</h1>
    </div>

    <div class="row">
      <div class="col-md-5 text-center">
        <div class="card">
          <div class="card-body">
            <!-- _vm._self is undefined -->
            <!-- <v-gravatar
              v-if="getActiveAccount"
              class="img-fluid"
              :email="getActiveAccount"
              default-img="robohash"
              :size="200"
            /> -->

            <p>{{ getActiveAccount }}</p>
            <p>
              <strong>Your BNB balance:</strong>
              {{ Number(activeBalanceEth).toFixed(4) }} ETH
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import Gravatar from "vue-gravatar";

export default {
  data: function () {
    return {
      activeBalanceEth: 0,
    };
  },
  name: "Profile",
  // components: {
  //   "v-gravatar": Gravatar,
  // },
  computed: {
    ...mapGetters("accounts", ["getActiveAccount", "getActiveBalanceEth"]),
  },
  async created() {
    await this.$store.dispatch("accounts/initWeb3Modal");
    await this.$store.dispatch("accounts/fetchActiveBalance");
    this.$store.dispatch("accounts/ethereumListener");
    this.activeBalanceEth = await this.getActiveBalanceEth;
  },
};
</script>
