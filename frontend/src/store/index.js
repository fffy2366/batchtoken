import { createStore } from "vuex";
import accounts from "./modules/accounts";
import ibep20 from "./modules/ibep20";
import config from "./modules/config";

const store = createStore({
  modules: {
    accounts,
    ibep20,
    config,

  },
});

export default store;
