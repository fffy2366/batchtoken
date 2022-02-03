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
                <li
                  v-for="token in tokenList"
                  :key="token.contract_ticker_symbol"
                >
                  <a
                    class="dropdown-item"
                    @click="tokenAddress = token.contract_address"
                    href="javascript:void(0)"
                    >{{ token.contract_ticker_symbol }}
                    {{
                      token.contract_ticker_symbol == "BNB"
                        ? ""
                        : "-" + token.contract_address
                    }}</a
                  >
                </li>
              </ul>
            </div>
            <div
              style="
                position: absolute;
                right: 0px;
                top: 0px;
                cursor: pointer;
                display: block;
              "
              class="input_clear"
            >
              <button
                type="button"
                class="btn close"
                data-dismiss="modal"
                aria-hidden="true"
              >
                ×
              </button>
            </div>
            <input
              type="input"
              class="form-control"
              id="token"
              v-model="tokenAddress"
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
            v-model="decimails"
          />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <label
            class="w-100 d-flex align-items-center justify-content-between"
            for="decimal"
            >收款地址和数量
            <span class="float-end text-end"
              ><a class="text-underline-hover btn d-flex justify-content-end"
                >上传文件</a
              ></span
            >
          </label>
          <div>
            <Codemirror
              v-model:value="code"
              :options="cmOptions"
              border
              placeholder="test placeholder"
              :height="200"
              @change="onChange"
              @blur="onBlur"
              @focus="onFocus"
            />
            <div class="align-items-center d-flex justify-content-between">
              每一行应包括地址和数量，逗号分隔
              <button class="btn text-underline-hover" @click="demo">
                查看例子
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- <router-link to="/confirm" tag="button" class="btn btn-primary">
        下一步
      </router-link> -->
      <section>
        <input type="file" @change="onChangeUpload" />
        <xlsx-read :file="file">
          <xlsx-sheets>
            <template #default="{ sheets }">
              <select v-model="selectedSheet">
                <option v-for="sheet in sheets" :key="sheet" :value="sheet">
                  {{ sheet }}
                </option>
              </select>
            </template>
          </xlsx-sheets>
          <xlsx-json :sheet="selectedSheet">
            <template #default="{ collection }">
              <div>
                {{ collection }}
              </div>
            </template>
          </xlsx-json>
        </xlsx-read>
      </section>

      <button type="button" class="btn btn-primary" @click="confirm">
        下一步
      </button>
    </div>
  </div>
</template>

<script>
// https://github.com/surmon-china/vue-codemirror
//github.com/RennCheung/codemirror-editor-vue3
import { mapGetters } from "vuex";
import Codemirror from "codemirror-editor-vue3";

// language
import "codemirror/mode/javascript/javascript.js";

// theme
import "codemirror/theme/dracula.css";

import { ref } from "vue";
import XlsxRead from "@/components/XlsxRead.vue";
import XlsxSheets from "@/components/XlsxSheets.vue";
import XlsxJson from "@/components/XlsxJson.vue";
// import { XlsxRead, XlsxSheets, XlsxJson } from "vue3-xlsx/dist/vue3-xlsx.cjs.prod.js";

export default {
  name: "Home",
  
  data() {
    return {
      msg: "Welcome",
      item: { content: "11" },
      tokenAddress: "",
      decimails: null,
      tokenList: [],
      cm: null,
      hasInvalidAddress: false,
      file: null,
      selectedSheet: null,
      sheetName: null,
      sheets: [{ name: "SheetOne", data: [{ c: 2 }] }],
      collection: [{ a: 1, b: 2 }],
    };
  },
  computed: {
    ...mapGetters("accounts", [
      "getChainId",
      "getChainName",
      "isUserConnected",
      "getActiveAccount",
      "getWeb3",
    ]),
    ...mapGetters("service", ["getTokenList"]),
    ...mapGetters("ibep20", ["getDecimails"]),
    // ...mapGetters("batchtokensender", ["getDecimails"]),
  },
  components: {
    Codemirror,
    XlsxRead,
    XlsxSheets,
    XlsxJson,
  },
  methods: {
    demo() {
      this.code = `0xc3e450Ecbc3C84225bdFeeEA32e3a4a288Fc856F,0.1
0x5E202328cb51a577F75F435Fc8b68130dF8407f1,0.2
0xeFA74C5F32ebB63f7111CC4eEc72A5795d6ff2fb,1`;
      console.log("code %s", this.code);
    },
    confirm() {
      if (this.hasInvalidAddress) {
        return;
      }
      this.$router.push("/confirm");
    },
    verifyAddress() {
      return true;
    },
    deleteInvalidAddress() {
      this.code = `0xc3e450Ecbc3C84225bdFeeEA32e3a4a288Fc856F,0.1
0xeFA74C5F32ebB63f7111CC4eEc72A5795d6ff2fb,1`;
    },
    onBlur(cm) {
      const web3 = this.getWeb3;
      // console.log("cm %o, event %o", cm, event);
      const doc = cm.doc;
      let i = 0;
      this.hasInvalidAddress = false;
      doc.eachLine(function (line) {
        i++;
        if (!line.text) {
          return;
        }
        console.log("line %o", line);
        const address = line.text.split(",")[0];
        console.log("address is %s", address);
        if (!web3.utils.isAddress(address)) {
          cm.markText(
            { line: i - 1, ch: 0 },
            { line: i, ch: 0 },
            { css: "color: #F05252" }
          );
          this.hasInvalidAddress = true;
          console.error("i %d, address %s valid", i, address);
        } else {
          cm.markText(
            { line: i - 1, ch: 0 },
            { line: i, ch: 0 },
            { css: "color: #bd93f9" }
          );
        }
      });
    },
    onChangeUpload(event) {
      // console.log(event);
      this.file = event.target.files ? event.target.files[0] : null;
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] });
      this.sheetName = null;
    },
  },
  async created() {
    const tl = await this.getTokenList;
    this.tokenList = tl?.data?.items ?? [];
    console.log("tokenList is %o", this.tokenList);
  },
  watch: {
    getTokenList(newVal, oldVal) {
      console.log(newVal, oldVal);
      this.tokenList = newVal.data.items;
    },
    async getActiveAccount(newVal, oldVal) {
      console.log(newVal, oldVal);
      await this.$store.dispatch("service/fetchTokenList", {
        chainId: this.getChainId,
        address: newVal,
      });
    },
    async getChainId(newVal, oldVal) {
      // console.log(newVal, oldVal);
      if (oldVal) {
        await this.$store.dispatch("service/fetchTokenList", {
          chainId: newVal,
          address: this.getActiveAccount,
        });
      }
    },

    async tokenAddress(newVal, oldVal) {
      console.log("tokenAddress newVal %s, oldVal %s ", newVal, oldVal);
      await this.$store.dispatch("ibep20/fetchIBEP20Contract", {
        address: newVal,
      });
      await this.$store.dispatch("ibep20/fetchDecimails", {
        address: newVal,
      });
      const _decimails = this.getDecimails;
      console.log("_decimails is %s", _decimails);
      this.decimails = _decimails;
    },
  },
  setup() {
    let code = ref(``);
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
      onChange(val, cm) {
        console.log("code is %s", code);
        console.log("val %s, cm %o", val, cm);
      },

      onFocus(cm, event) {
        console.log("code is %s", code);
        console.log("cm %o, event %o", cm, event);
      },
    };
  },
};
</script>
<style lang="scss">
.web3modal-modal-lightbox {
  z-index: 4 !important;
}

.text-underline-hover {
  text-decoration: underline !important;
}

.text-err {
  color: #f05252 !important;
}

// .text-underline-hover:hover {
//   text-decoration: underline;
// }
</style>