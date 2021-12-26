import { createStore } from "vuex";
import accounts from "./modules/accounts";
import ibep20 from "./modules/ibep20";
import config from "./modules/config";
import service from "./modules/service";

const store = createStore({
  modules: {
    accounts,
    ibep20,
    config,
    service,
  },
});

export default store;
