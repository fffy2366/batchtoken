import { createStore } from "vuex";
import accounts from "./modules/accounts";
import ibep20 from "./modules/ibep20";
import config from "./modules/config";
import service from "./modules/service";
import batchtokensender from "./modules/batchtokensender";
// const debug = process.env.NODE_ENV !== 'production'

const store = createStore({
  modules: {
    accounts,
    ibep20,
    config,
    service,
    batchtokensender
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});

export default store;
