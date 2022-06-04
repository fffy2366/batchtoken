import IBEP20 from "../../contracts/IBEP20.json";

const state = {
    num: 0,
    ibep20Abi: null,
    ibep20Address: [],
    ibep20Contract: [],
    balance: [], // 余额
    decimals: null, // 精度
    tokenSymbol: [], // 代币符号
    start: null,
    end: null,
    totalProvided: null,
    totalDistributeAmount: null,
    allowance: null,
};

const getters = {
    getIBEP20Abi(state) {
        return state.ibep20Abi;
    },
    getIBEP20Address(state) {
        return state.ibep20Address;
    },
    getIBEP20Contract(state) {
        return state.ibep20Contract;
    },
    getIBEP20Balance(state) {
        return state.balance;
    },
    getDecimails(state) {
        return state.decimals;
    },
    getTokenSymbol(state) {
        return state.tokenSymbol;
    },
    getAllowance(state) {
        return state.allowance
    }
};

const actions = {
    async fetchIBEP20Contract({ commit, rootState }, { address }) {
        let web3 = await rootState.accounts.web3;
        if (!web3) {
            console.error("web3 is null");
            return;
        }
        let contract = new web3.eth.Contract(
            IBEP20.abi,
            address
        );
        if (!contract) {
            console.error("contract %s not exist", address);
            return;
        }
        commit("setIBEP20Contract", { address, contract });
    },
    storeIBEP20Abi({ commit }) {
        commit("setIBEP20Abi", IBEP20.abi);
    },
    storeIBEP20Address({ commit }, { address }) {

        commit("setIBEP20Address", address);
    },
    async allowance({ commit, state, dispatch }, { address, owner, spender }) {
        if (!state.ibep20Contract || !state.ibep20Contract[address]) {
            await dispatch('fetchIBEP20Contract', { address });
        }
        if (!state.ibep20Contract[address]) {
            console.error("contract %s not fetch", address);
            return;
        }
        let balance = await state.ibep20Contract[address].methods
            .allowance(owner, spender)
            .call();

        commit("setAllowance", balance);
    },

    async fetchIBEP20Balance({ commit, dispatch, rootState }, { address, owner }) {
        // console.log("fetchIBEP20Balance address is %s, owner is %s", address, owner);
        if (!state.ibep20Contract || !state.ibep20Contract[address]) {
            await dispatch('fetchIBEP20Contract', { address });
        }
        if (!state.ibep20Contract[address]) {
            return;
        }
        let balance = await state.ibep20Contract[address].methods
            .balanceOf(owner)
            .call();
        let web3 = await rootState.accounts.web3;
        balance = web3.utils.fromWei(balance, "ether");
        commit('setIBEP20Balance', { address, balance });
        return balance;
    },

    async fetchDecimails({ commit, rootState }, { address }) {
        if (!state.ibep20Contract || !state.ibep20Contract[address]) {
            console.log("fetchIBEP20Contract");
            // await dispatch('fetchIBEP20Contract', { address });
            await actions.fetchIBEP20Contract({ commit, rootState }, { address });

        }
        if (!state.ibep20Contract[address]) {
            console.error("state.ibep20Contract[address] undefined, address %s", address);
            return;
        }
        let decimals = await state.ibep20Contract[address].methods
            .decimals()
            .call();
        commit('setDecimails', { address, decimals })
    },

    async fetchTokenSymbol({ commit, dispatch }, { address }) {
        if (!state.ibep20Contract || !state.ibep20Contract[address]) {
            console.log("fetchIBEP20Contract");
            await dispatch('fetchIBEP20Contract', { address });
        }
        if (!state.ibep20Contract[address]) {
            console.error("state.ibep20Contract[address] undefined, address %s", address);
            return;
        }
        let symbol = await state.ibep20Contract[address].methods
            .symbol()
            .call();
        commit('setTokenSymbol', { address, symbol })
    },

    async approve({ dispatch }, { address, spender, amount }) {
        if (!state.ibep20Contract || !state.ibep20Contract[address]) {
            await dispatch('fetchIBEP20Contract', { address });
        }
        if (!state.ibep20Contract[address]) {
            return;
        }
        const res = await state.ibep20Contract[address].methods
            .approve(spender, amount)
            .send();
        const receipt = await res.wait();
        return receipt;
    }
};

const mutations = {
    setIBEP20Abi(state, abi) {
        state.ibep20Abi = abi;
    },
    setIBEP20Address(state, address) {
        state.ibep20Address[address] = address;
    },
    setIBEP20Contract(state, { address, contract }) {
        state.ibep20Contract[address] = contract;
    },
    setIBEP20Balance(state, { address, balance }) {
        // console.log("setIBEP20Balance address is %s, balance is %s", address, balance);
        state.balance[address] = balance;
    },
    setDecimails(state, { decimals }) {
        // state.decimals[address] = decimals;
        // console.log("address %s, decimals %o", address, state.decimals[address]);
        state.decimals = decimals;
        console.log("setDecimails %s", decimals);
    },
    setTokenSymbol(state, { address, symbol }) {
        state.tokenSymbol[address] = symbol;
        console.log("tokenSymbol %o", state.tokenSymbol);
    },
    setAllowance(state, allowance) {
        state.allowance = allowance;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};