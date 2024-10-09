<template>
  <div
    class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
  >
    <h1 class="h2">Welcome to Batchtoken!</h1>
  </div>

  <p>This is a project for Batch token sender.</p>

  <p v-if="isUserConnected"><strong>Your current chain:</strong> {{ getChainName }}</p>

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
            <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
              <span class="icon is-left"><i class="mdi mdi-chevron-down mdi-24px"></i></span>
            </button>
            <ul class="dropdown-menu">
              <li v-for="token in tokenList" :key="token.contract_ticker_symbol">
                <a
                  class="dropdown-item"
                  @click="tokenAddress = token.contract_address"
                  href="javascript:void(0)"
                  >{{ token.contract_ticker_symbol }}
                  {{ token.contract_ticker_symbol == 'BNB' ? '' : '-' + token.contract_address }}</a
                >
              </li>
            </ul>
          </div>
          <div
            style="position: absolute; right: 0px; top: 0px; cursor: pointer; display: block"
            class="input_clear"
          >
            <button type="button" class="btn close" data-dismiss="modal" aria-hidden="true">
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
        <label class="w-100 d-flex align-items-center justify-content-between" for="decimal"
          >收款地址和数量
          <!-- <span class="float-end text-end"
							><a class="text-underline-hover btn d-flex justify-content-end"
								>上传文件</a
							></span
						> -->
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
            <button class="btn text-underline-hover" @click="demo">查看例子</button>
          </div>
        </div>
      </div>
    </div>

    <!-- <router-link to="/confirm" tag="button" class="btn btn-primary">
        下一步
      </router-link> -->
    <section class="d-flex justify-content-between flex-row">
      <label class="upload">
        <a class="btn btn-primary">
          <span>Upload CSV file</span>
        </a>
        <input type="file" @change="onChangeUpload" />
      </label>
      <xlsx-read @parsed="onWorkbook" :file="file"> </xlsx-read>
      <div>
        <button type="button" class="btn btn-primary align-items-center" @click="confirm">
          下一步
        </button>
      </div>
    </section>
  </div>
</template>

<script>
// https://github.com/surmon-china/vue-codemirror
//github.com/RennCheung/codemirror-editor-vue3
import { mapGetters } from 'vuex'
import Codemirror from 'codemirror-editor-vue3'

// language
import 'codemirror/mode/javascript/javascript.js'

// theme
import 'codemirror/theme/dracula.css'

import { ref } from 'vue'
import XlsxRead from '@/components/XlsxRead.vue'
import SheetTo from '../components/mixins/SheetTo'

export default {
  name: 'HomeView',
  mixins: [SheetTo],
  data() {
    return {
      msg: 'Welcome',
      item: { content: '11' },
      tokenAddress: '',
      decimails: null,
      tokenList: [],
      // cm: null,
      hasInvalidAddress: false,
      file: null,
      selectedSheet: null,
      sheetName: null,
      sheets: [],
      collection: []
    }
  },
  computed: {
    ...mapGetters('accounts', [
      'getChainId',
      'getChainName',
      'isUserConnected',
      'getActiveAccount',
      'getWeb3'
    ]),
    ...mapGetters('service', ['getTokenList']),
    ...mapGetters('ibep20', ['getDecimails'])
    // ...mapGetters("batchtokensender", ["getDecimails"]),
  },
  components: {
    Codemirror,
    XlsxRead
    // XlsxSheets,
    // XlsxJson,
  },
  methods: {
    demo() {
      this.code = `0xc3e450Ecbc3C84225bdFeeEA32e3a4a288Fc856F,0.1
0x5E202328cb51a577F75F435Fc8b68130dF8407f1,0.2
0xeFA74C5F32ebB63f7111CC4eEc72A5795d6ff2fb,1`
      console.log('code %s', this.code)
    },
    confirm() {
      if (!this.cm) {
        return
      }
      const { addresses, amounts, sameAmount } = this.onBlur(this.cm)
      this.$store.dispatch('batchtokensender/storeReceiveAddresses', {
        addresses
      })
      this.$store.dispatch('batchtokensender/storeAmounts', {
        amounts
      })
      let callFun = 'coinSendDifferentValue'
      if (sameAmount) {
        callFun = 'coinSendSameValue'
      }
      this.$store.dispatch('batchtokensender/storeCallFun', {
        callFun
      })
      if (this.hasInvalidAddress) {
        return
      }

      if (!this.decimails) {
        this.$toast.show('not get decimails ', {
          type: 'success',
          duration: 5000,
          position: 'top'
        })
        return
      }
      this.$router.push('/confirm')
    },
    verifyAddress() {
      return true
    },
    deleteInvalidAddress() {
      this.code = `0xc3e450Ecbc3C84225bdFeeEA32e3a4a288Fc856F,0.1
0xeFA74C5F32ebB63f7111CC4eEc72A5795d6ff2fb,1`
    },
    onBlur(cm) {
      const web3 = this.getWeb3
      const addresses = []
      const amounts = []
      let sameAmount = true
      let firstAmount = 0
      // console.log("cm %o, event %o", cm, event);
      const doc = cm.doc
      let i = 0
      this.hasInvalidAddress = false
      let _hasInvalidAddress = false
      doc.eachLine(function (line) {
        i++
        if (!line.text) {
          return
        }

        console.log('line %o', line)
        const address = line.text.split(',')[0]
        const amount = line.text.split(',')[1]
        console.log('address is %s', address)
        if (i === 1) {
          firstAmount = amount
        }
        if (amount != firstAmount) {
          sameAmount = false
        }
        if (!web3.utils.isAddress(address)) {
          cm.markText({ line: i - 1, ch: 0 }, { line: i, ch: 0 }, { css: 'color: #F05252' })
          _hasInvalidAddress = true
          console.error('i %d, address %s valid', i, address)
        } else {
          cm.markText({ line: i - 1, ch: 0 }, { line: i, ch: 0 }, { css: 'color: #bd93f9' })
          addresses.push(address)
          amounts.push(amount)
        }
      })
      if (_hasInvalidAddress) {
        this.hasInvalidAddress = true
      }
      return { addresses, amounts, sameAmount }
    },
    onChangeUpload(event) {
      // console.log(event);
      this.file = event.target.files ? event.target.files[0] : null
    },
    addSheet() {
      this.sheets.push({ name: this.sheetName, data: [...this.collection] })
      this.sheetName = null
    },
    async onWorkbook(workbook) {
      console.log('workbook %o', workbook)
      const {
        utils: { sheet_to_json }
      } = await import('xlsx')
      const ws = workbook.Sheets[workbook.SheetNames[0]]
      this.collection = sheet_to_json(ws, { raw: false })
      console.log('collection %o', this.collection)
      let text = ''
      for (const c of this.collection) {
        console.log('c %o, address %s, amount %s', c, c.Address, c.Amount)
        text += c.Address + ',' + c.Amount + '\n'
      }
      this.code = text
    }
  },
  async created() {
    const tl = await this.getTokenList
    this.tokenList = tl?.data?.items ?? []
    console.log('tokenList is %o', this.tokenList)
  },
  watch: {
    getTokenList(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.tokenList = newVal.data.items
    },
    async getActiveAccount(newVal, oldVal) {
      console.log(newVal, oldVal)
      await this.$store.dispatch('service/fetchTokenList', {
        chainId: this.getChainId,
        address: newVal
      })
    },
    async getChainId(newVal, oldVal) {
      // console.log(newVal, oldVal);
      if (oldVal) {
        await this.$store.dispatch('service/fetchTokenList', {
          chainId: newVal,
          address: this.getActiveAccount
        })
      }
    },

    async tokenAddress(newVal, oldVal) {
      console.log('tokenAddress newVal %s, oldVal %s ', newVal, oldVal)
      await this.$store.dispatch('ibep20/fetchIBEP20Contract', {
        address: newVal
      })
      await this.$store.dispatch('ibep20/fetchDecimails', {
        address: newVal
      })
      const _decimails = this.getDecimails
      console.log('_decimails is %s', _decimails)
      this.decimails = _decimails
    }
  },
  setup(props, ctx) {
    let code = ref(``)
    let cm = ref()
    // const that = this;
    return {
      code,
      cm,
      cmOptions: {
        mode: 'text/javascript', // Language mode
        theme: 'dracula', // Theme
        lineNumbers: true, // Show line number
        smartIndent: true, // Smart indent
        indentUnit: 2, // The smart indent unit is 2 spaces in length
        foldGutter: true, // Code folding
        styleActiveLine: true // Display the style of the selected row
      },
      onChange(val, _cm) {
        console.log('onChange--------->:')
        console.log('code is %s', code)
        console.log('val %s, cm %o', val, _cm)
        console.log('attrs is %o', ctx.attrs)
        cm.value = _cm
        // console.log("cm is %o", cm);
      },

      onFocus(cm, event) {
        console.log('code is %s', code)
        console.log('cm %o, event %o', cm, event)
      }
    }
  }
}
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

.upload input {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;
}
</style>
