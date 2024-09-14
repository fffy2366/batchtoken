
const maxAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const state = {   
    maxAmount,
};

const getters = {
    getMaxAmount(state){
        return state.maxAmount;
    }
};


export default {
    namespaced: true,
    state,
    getters,
};