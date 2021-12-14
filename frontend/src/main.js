import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import Toaster from "@meforma/vue-toaster";

import Codemirror from "codemirror-editor-vue3";
// plugin-style
import "codemirror-editor-vue3/dist/style.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)
  .use(router)
  .use(store)
  .use(Toaster)
  .use(Codemirror);
app.mount("#app");
