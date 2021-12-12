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
      <h1 class="h2">Welcome to Batchtoken!</h1>
    </div>

    <p>This is a project for Batch token sender.</p>

    <p v-if="isUserConnected">
      <strong>Your current chain:</strong> {{ getChainName }}
    </p>

    <!-- <router-link v-if="isUserConnected" to="/set-value">
      <button type="button" class="btn btn-outline-primary btn-lg">
        Go Farm!
      </button>
    </router-link> -->
    <!-- <div class="field">
      <label class="label">代币</label>
      <div class="autocomplete control">
        <div class="control has-icons-left is-medium is-clearfix">
          <input
            type="search"
            autocomplete="off"
            placeholder="请选择代币或粘贴代币地址"
            dropdown-position="bottom"
            icon-clickable="true"
            class="input is-medium"
          />
          <span class="icon is-left"
            ><i class="mdi mdi-chevron-down mdi-24px"></i
          ></span>
        </div>
        <div class="dropdown-menu" style="display: none">
          <div class="dropdown-content" style="display: none">
            <div class="dropdown-item">
              <span class="autocomplete-footer"
                >如需发送NFT类型代币，请手动插入代币地址
              </span>
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <form class="form-inline">
      <label for="token">代币</label>
      <div class="input-group">
        <div class="dropdown">
          <button
            type="button"
            class="btn btn-primary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            <span class="icon is-left"
              ><i class="mdi mdi-chevron-down mdi-24px"></i
            ></span>
          </button>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">链接 1</a></li>
            <li><a class="dropdown-item" href="#">链接 2</a></li>
            <li><a class="dropdown-item" href="#">链接 3</a></li>
          </ul>
        </div>

        <input
          type="input"
          class="form-control"
          id="token"
          placeholder="请选择代币或粘贴代币地址"
        />
      </div>

      <label for="decimal">位数</label>
      <input
        type="input"
        readonly="readonly"
        class="form-control"
        id="decimal"
        placeholder=""
      />

      <button type="button" class="btn btn-primary">下一步</button>
    </form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      msg: "Welcome",
    };
  },
  computed: {
    ...mapGetters("accounts", ["getChainName", "isUserConnected"]),
  },
};
</script>