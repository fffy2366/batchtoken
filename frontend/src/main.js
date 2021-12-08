import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import Toaster from "@meforma/vue-toaster";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

const app = createApp(App)
  .use(router)
  .use(store)
.use(Toaster);
app.mount("#app");
