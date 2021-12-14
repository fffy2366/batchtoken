<template>
  <div class="main-screen-width main-content">
    <div>
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
      <div class="networkSpeed">
        <p class="label">授信额度</p>
        <div class="level">
          <div class="level-left">
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
          <div class="level-right">
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
    <div class="networkSpeed">
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
        <span><span class="is-size-7"> 去授信</span></span>
        <!---->
      </button>
    </div>

    <div class="body-fix">
      <div class="main-screen-width main-content">
        <!---->
        <div>
          <div class="networkSpeed">
            <div class="field has-addons">
              <!---->
              <p class="label">交易速度 (11 Gwei)</p>
              <div
                class="b-slider is-medium is-primary is-rounded"
                custom-formatter='function(e){return e+" Gwei"}'
              >
                <div class="b-slider-track">
                  <div
                    class="b-slider-fill"
                    style="width: 16.6667%; left: 0%"
                  ></div>
                  <!---->
                  <div
                    class="
                      b-slider-tick b-slider-tick-label-left-fix
                      is-tick-hidden
                    "
                    style="left: 0%"
                  >
                    <span class="b-slider-tick-label">慢</span>
                  </div>
                  <!---->
                  <!----><!---->
                  <div class="b-slider-tick" style="left: 16.6667%">
                    <span class="b-slider-tick-label">快</span>
                  </div>
                  <!----><!---->
                  <!---->
                  <div
                    class="
                      b-slider-tick b-slider-tick-label-right-fix
                      is-tick-hidden
                    "
                    style="left: 100%"
                  >
                    <span class="b-slider-tick-label">极速</span>
                  </div>
                  <div class="b-slider-thumb-wrapper" style="left: 16.6667%">
                    <span
                      data-label="11"
                      class="is-primary is-top is-medium b-tooltip"
                      style="transition-delay: 0ms"
                      ><div
                        tabindex="0"
                        role="slider"
                        aria-valuenow="11"
                        aria-valuemin="10"
                        aria-valuemax="16"
                        aria-orientation="horizontal"
                        class="b-slider-thumb"
                      ></div
                    ></span>
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
          <button type="button" class="button is-info">
            <!---->
            <span
              ><span class="is-size-7"
                ><router-link to="/send">发送</router-link></span
              ></span
            >
            <!---->
          </button>
          <!---->
          <!---->
          <!---->
        </div>
      </div>
    </div>
  </div>
</template>