import axios from 'axios'
axios.defaults.timeout = 10000; // 超时10秒
axios.defaults.headers.post['Content-Type'] = 'Content-Type:application/json; charset=UTF-8'

const state = {
    tokenList: {}
};

const getters = {
    getTokenList(state) {
        return state.tokenList;
    },

};

const actions = {
    async fetchTokenList({ commit }, { chainId, address }) {
        console.log("chainId %s, address is %s", parseInt(chainId, 16), address);
        // console.log("chainId %d, address %s", chainId, address);
        const url = "https://api.covalenthq.com/v1/" + parseInt(chainId, 16) + "/address/" + address + "/balances_v2/?no-nft-fetch=true&key=ckey_fdf13a80f62d428cbe85ae4bb16";
        console.log("url: %s", url);
        const res = await axios.get(url);
        commit("setTokenList", res.data);
    },
};

const mutations = {

    setTokenList(state, list) {
        // console.log("list %o", list);
        state.tokenList = list;
    },

};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
