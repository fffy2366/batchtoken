import BatchTokenSender from "../../contracts/BatchTokenSender.json";
import addresses from "../../contracts/addresses.json";

const state = {
    num: 0,
    batchTokenSenderAbi: null,
    batchTokenSenderAddress: null,
    batchTokenSenderContract: null,
    txFee: null,
    vipFee: null,
    start: null,
    end: null,
    totalProvided: null,
    totalDistributeAmount: null,
    receiveAddresses: [],
    amounts: [],
    callFun: null
};

const getters = {
    getBatchTokenSenderAbi(state) {
        return state.batchTokenSenderAbi;
    },
    getBatchTokenSenderAddress(state) {
        return state.batchTokenSenderAddress;
    },
    getBatchTokenSenderContract(state) {
        return state.batchTokenSenderContract;
    },
    getBatchTokenSenderBalance(state) {
        return state.balance;
    },
    getDecimails(state) {
        return state.decimals;
    },
    getTokenSymbol(state) {
        return state.tokenSymbol;
    },
    getReceiveAddresses(state) {
        return state.receiveAddresses;
    },
    getAmounts(state) {
        return state.amounts;
    },
    getCallFun(state) {
        return state.callFun;
    }
};

const actions = {
    async fetchBatchTokenSenderContract({ commit, rootState }) {
        const chainIdDec = parseInt(rootState.accounts.chainId);
        const address = addresses.NFTMarket[chainIdDec];
        let web3 = await rootState.accounts.web3;
        if (!web3) {
            console.error("web3 is null");
            return;
        }
        let contract = new web3.eth.Contract(
            BatchTokenSender.abi,
            address
        );
        if (!contract) {
            console.error("contract %s not exist", address);
            return;
        }
        commit("setBatchTokenSenderContract", contract);
    },
    storeBatchTokenSenderAbi({ commit }) {
        commit("setBatchTokenSenderAbi", BatchTokenSender.abi);
    },
    storeBatchTokenSenderAddress({ commit, rootState }) {
        let chainIdDec = parseInt(rootState.accounts.chainId);
        let address = addresses.NFTMarket[chainIdDec];
        commit("setBatchTokenSenderAddress", address);
    },
    storeReceiveAddresses({ commit }, { addresses }) {
        commit("setReceiveAddresses", addresses);
    },

    storeAmounts({ commit }, { amounts }) {
        commit("setAmounts", amounts);
    },

    storeCallFun({ commit }, { callFun }) {
        commit("setCallFun", callFun);
    },

    async fetchTokenSymbol({ commit, dispatch }, { address }) {
        if (!state.batchTokenSenderContract || !state.batchTokenSenderContract[address]) {
            await dispatch('fetchBatchTokenSenderContract', { address });
        }
        if (!state.batchTokenSenderContract[address]) {
            return;
        }
        let symbol = await state.batchTokenSenderContract[address].methods
            .symbol()
            .call();
        commit('setTokenSymbol', { address, symbol })
    },

    async muiltisender({ dispatch }, { address, spender, amount }) {
        if (!state.batchTokenSenderContract || !state.batchTokenSenderContract[address]) {
            await dispatch('fetchBatchTokenSenderContract', { address });
        }
        if (!state.batchTokenSenderContract[address]) {
            return;
        }
        const res = await state.batchTokenSenderContract[address].methods
            .approve(spender, amount)
            .send();
        const receipt = await res.wait();
        return receipt;
    }
};

const mutations = {
    setBatchTokenSenderAbi(state, abi) {
        state.batchTokenSenderAbi = abi;
    },
    setBatchTokenSenderAddress(state, address) {
        state.batchTokenSenderAddress = address;
    },
    setBatchTokenSenderContract(state, _contract) {
        state.batchTokenSenderContract = _contract;
    },

    setTokenSymbol(state, { address, symbol }) {
        state.tokenSymbol[address] = symbol;
    },
    setReceiveAddresses(state, addresses) {
        state.receiveAddresses = addresses;
    },
    setAmounts(state, amounts) {
        state.amounts = amounts;
    },
    setCallFun(state, callFun) {
        state.callFun = callFun;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};