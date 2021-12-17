<template>
  <div class="main-screen-width main-content">
    <div v-if="approve">
      <p class="label">摘要</p>
      <table class="networkSpeed table is-bordered">
        <tbody>
          <tr>
            <td class="td-container">
              <p class="td-title">0 META</p>
              <p class="td-value">当前授信额度</p>
            </td>
            <td class="td-container">
              <p class="td-title">4.451 META</p>
              <p class="td-value">代币发送总数</p>
            </td>
          </tr>
          <tr>
            <td class="td-container">
              <p class="td-title">5.9374 tBNB</p>
              <p class="td-value">你的tBNB余额</p>
            </td>
            <td class="td-container">
              <p class="td-title">18,458,781.5221 META</p>
              <p class="td-value">代币余额</p>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="networkSpeed clearfix">
        <p class="label">授信额度</p>
        <div class="level">
          <div class="level-left float-start">
            <div class="field">
              <!---->
              <label class="b-radio radio radio-label-fix"
                ><input type="radio" value="0" />
                <span class="check is-info"></span>
                <span class="control-label"
                  ><p class="label">发送数量 (4.451 META)</p></span
                ></label
              >
              <!---->
            </div>
          </div>
          <div class="level-right float-end">
            <div class="field">
              <!---->
              <label class="b-radio radio radio-label-fix"
                ><input type="radio" value="1" />
                <span class="check is-info"></span>
                <span class="control-label"
                  ><p class="label">不限制(之后无需重复授信)</p></span
                ></label
              >
              <!---->
            </div>
          </div>
        </div>
      </div>
      <p class="padding-small"></p>
      <!---->
      <!---->
    </div>
    <!---->
    <p class="padding-small"></p>
    <!---->
    <!---->
    <!---->
    <!---->
    <div class="networkSpeed" v-if="approve">
      <!---->
      <!---->
      <p class="padding-medium"></p>
      <a href="/" class="nuxt-link-active"
        ><a class="button is-info backButton"
          ><span class="is-size-4"
            ><span class="icon is-default"
              ><i class="mdi mdi-chevron-left mdi-24px"></i></span></span></a
      ></a>
      <!---->
      <!---->
      <!---->
      <button type="button" class="button is-info">
        <!---->
        <span><span class="btn btn-primary"> 去授信</span></span>
        <!---->
      </button>
    </div>

    <div class="body-fix" v-if="send">
      <div class="main-screen-width main-content">
        <!---->
        <div>
          <div class="networkSpeed">
            <div class="field has-addons">
              <!---->
              <p class="label">交易速度 (11 Gwei)</p>
              <input
                type="range"
                class="form-range"
                min="5"
                max="20"
                value="5"
                step="5"
              />
              <div
                class="
                  b-slider
                  is-medium is-primary is-rounded
                  align-items-center
                "
                custom-formatter='function(e){return e+" Gwei"}'
              >
                <div class="w-100">
                  <div class="d-flex justify-content-start float-start">
                    <span class="b-slider-tick-label">慢</span>
                  </div>
                  <!---->

                  <!---->
                  <div class="d-flex justify-content-end float-end">
                    <span class="b-slider-tick-label float-end">极速</span>
                  </div>
                  <div
                    class="d-flex justify-content-center float-center clearfix"
                  >
                    <span class="b-slider-tick-label">快</span>
                  </div>
                  <!---->
                </div>
              </div>
              <!---->
            </div>
          </div>
          <p class="padding-medium"></p>
          <p class="label">摘要</p>
          <div>
            <table class="networkSpeed table is-bordered">
              <tbody>
                <tr>
                  <td class="td-container">
                    <p class="td-title">3</p>
                    <p class="td-value">地址总数</p>
                  </td>
                  <td class="td-container">
                    <p class="td-title">4.451 META</p>
                    <p class="td-value">代币发送总数</p>
                  </td>
                </tr>
                <tr>
                  <td class="td-container">
                    <p class="td-title">1</p>
                    <p class="td-value">交易总数</p>
                  </td>
                  <td class="td-container">
                    <p class="td-title">18,458,781.5221 META</p>
                    <p class="td-value">代币余额</p>
                  </td>
                </tr>
                <tr>
                  <td class="td-container">
                    <p class="td-title">0.1189 tBNB</p>
                    <p class="td-value">
                      预估费用
                      <span
                        data-label="由于您的代币中包含复杂的模式或者处理逻辑，所以系统会预估两倍的矿工费去保证交易发送成功，实际产生的费用会少于预估费用的50%，剩余部分会自动退回"
                        class="
                          is-info is-bottom is-medium
                          b-tooltip
                          is-multiline
                        "
                        style="transition-delay: 0ms"
                      ></span>
                    </p>
                  </td>
                  <td class="td-container">
                    <p class="td-title">5.9369 tBNB</p>
                    <p class="td-value">你的tBNB余额</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <!---->
        </div>
        <p class="padding-small"></p>
        <!---->
        <!---->
        <!---->
        <!---->
        <div class="networkSpeed">
          <!---->
          <!---->
          <p class="padding-medium"></p>
          <a href="/" class="nuxt-link-active"
            ><a class="button is-info backButton"
              ><span class="is-size-4"
                ><span class="icon is-default"
                  ><i
                    class="mdi mdi-chevron-left mdi-24px"
                  ></i></span></span></a
          ></a>
          <!---->
          <span
            ><router-link tag="button" class="btn btn-primary" to="/send"
              >发送</router-link
            ></span
          >
          <!---->
          <!---->
          <!---->
          <!---->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",

  data() {
    return {
      msg: "Welcome",
      approve: false,
      send: true,
    };
  },
  computed: {
    ...mapGetters("accounts", ["getChainName", "isUserConnected"]),
  },
  components: {},
  methods: {
    changes: {},
  },
};
</script>

<style lang="sass">
@mixin clearfix()
  &::after
    display: block
    clear: both
    content: ""

.clearfix
  @include clearfix
</style>