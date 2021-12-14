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
    <div class="container">
      <div class="row">
        <div class="col-sm-10">
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
        </div>
        <div class="col-sm-2">
          <label for="decimal">位数</label>
          <input
            type="input"
            readonly="readonly"
            class="form-control"
            id="decimal"
            placeholder=""
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label class="w-100 d-flex align-items-center" for="decimal"
            >收款地址和数量
            <span class="float-end text-end"
              ><button class="btn">上传文件</button></span
            >
          </label>
          <div>
            <Codemirror
              v-model="code"
              :options="cmOptions"
              border
              placeholder="test placeholder"
              :height="200"
              @change="change"
            />
            <div>
              每一行应包括地址和数量，逗号分隔
              <button class="btn">查看例子</button>
            </div>
          </div>
        </div>
      </div>

      <router-link to="/confirm" tag="button" class="btn btn-primary">
        下一步
      </router-link>

      <!-- <button type="button" class="btn btn-primary">下一步</button> -->
    </div>
  </div>
</template>

<script>
// https://github.com/surmon-china/vue-codemirror
//github.com/RennCheung/codemirror-editor-vue3
import { mapGetters } from "vuex";
import Codemirror from "codemirror-editor-vue3";

// plugin-style
import "codemirror-editor-vue3/dist/style.css";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
import "codemirror/theme/dracula.css";

import { ref } from "vue";

export default {
  name: "Home",

  data() {
    return {
      msg: "Welcome",
      item: { content: "11" },
      // cmOptions: {
      //   tabSize: 4,
      //   mode: "python",
      //   theme: "darcula",
      //   lineNumbers: true,
      //   lineWrapping: true,
      //   extraKeys: { Ctrl: "autocomplete" },
      //   lineWiseCopyCut: true,
      //   showCursorWhenSelecting: true,
      //   matchBrackets: true,
      //   // readOnly: 'nocursor',
      //   line: true,
      // },
    };
  },
  computed: {
    ...mapGetters("accounts", ["getChainName", "isUserConnected"]),
  },
  components: {
    Codemirror,
  },
  methods: {
    changes: {},
  },
  setup() {
    let code = ref(`
var i = 0;
for (; i < 9; i++) {
  console.log(i);
  // more statements
}`);
    code = ref(`aa,1`);
    return {
      code,
      cmOptions: {
        mode: "text/javascript", // Language mode
        theme: "dracula", // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true, // Display the style of the selected row
      },
    };
  },
};
</script>
<style lang="scss">
.web3modal-modal-lightbox {
  z-index: 4 !important;
}
</style>