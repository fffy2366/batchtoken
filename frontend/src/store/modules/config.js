// acs prod
// const acsMasterFarmV2 = "0xb1fa5d3c0111d8E9ac43A19ef17b281D5D4b474E";

// const farmVaults = [{
//     vault: {
//         address: "0x532d5775cE71Cb967B78acbc290f80DF80A9bAa5",
//         token: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
//         tokenSymbol: "BUSD",
//         showWatchAsset: !0,
//         harvesterRewardSymbol: "XVS",
//         strategy: "0x316F6488821E08Ba7f44Ae8E8fe86CA1cd0D0F92",
//         fromBlock: 2597909,
//         showBorrowLimit: !0,
//         walletInfo: '<a class="wallet-info" href="https://app.acryptos.com/stableswap/" target="_blank"><span data-i18n="get">Get</span> BUSD</a>'
//     },
//     farm: {
//         master: acsMasterFarmV2,
//         token: "0x532d5775cE71Cb967B78acbc290f80DF80A9bAa5",
//         tokenSymbol: "acsBUSD"
//     },
//     tags: ["acs", "venus", "venusProtocol", "usd"]
// }, {
//     vault: {
//         address: "0x9Ce0E88c803672CE672b9b9e66c664B81499cE04",
//         token: "0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16",
//         tokenSymbol: "BUSD-BNB",
//         harvesterRewardSymbol: "CAKE",
//         strategy: "0xfB74C8F2A315c8FaAb8104E0AA5d2a96D6316aAF",
//         walletInfo: '<a class="wallet-info" href="https://exchange.pancakeswap.finance/#/add/BNB/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" target="_blank"><span data-i18n="get">Get</span> BUSD-BNB</a>',
//         fromBlock: 6928888,
//         defaultRoiDay: .29888 / 365
//     },
//     farm: {
//         master: acsMasterFarmV2,
//         token: "0x9Ce0E88c803672CE672b9b9e66c664B81499cE04",
//         tokenSymbol: "acsBUSD-BNB"
//     },
//     tags: ["acs", "pancake", "pancakeV2"]
// }];

const acsMasterFarmV2 = "0xdB6fBd5A9aa82084aeaa57B45B91f2B3b037344f";

const farmVaults = [{
    vault: {
        address: "0x0d25FE004910e066CAB2C4fDcdDD74791b8d41f9",
        token: "0x8301f2213c0eed49a7e28ae4c3e91722919b8b47",
        tokenSymbol: "BUSD",
        showWatchAsset: !0,
        harvesterRewardSymbol: "XVS",
        strategy: "0xD496EC7938538d4CB88529Acfd3F1415E35e00b1",
        fromBlock: 2597909,
        showBorrowLimit: !0,
        walletInfo: '<a class="wallet-info" href="https://app.acryptos.com/stableswap/" target="_blank"><span data-i18n="get">Get</span> BUSD</a>'
    },
    farm: {
        master: acsMasterFarmV2,
        token: "0x0d25FE004910e066CAB2C4fDcdDD74791b8d41f9",
        tokenSymbol: "yooBUSD"
    },
    tags: ["acs", "venus", "venusProtocol", "usd"]
}, {
    vault: {
        address: "0x0bA2eB9B3dc2584AA5f16F83b63542c3304b3B58",
        token: "0xe0e92035077c39594793e61802a350347c320cf2",
        tokenSymbol: "BUSD-BNB",
        harvesterRewardSymbol: "CAKE",
        strategy: "0x67Aa4E253DEDbc3A851D371737C2cB9d64b4566F",
        walletInfo: '<a class="wallet-info" href="https://exchange.pancakeswap.finance/#/add/BNB/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56" target="_blank"><span data-i18n="get">Get</span> BUSD-BNB</a>',
        fromBlock: 6928888,
        defaultRoiDay: .29888 / 365
    },
    farm: {
        master: acsMasterFarmV2,
        token: "0x0bA2eB9B3dc2584AA5f16F83b63542c3304b3B58",
        tokenSymbol: "yooBUSD-BNB"
    },
    tags: ["acs", "pancake", "pancakeV2"]
}];

const buildPrice = [
    {
        id: 25,
        price: 100000,
    },
    {
        id: 26,
        price: 100000,
    },
    {
        id: 27,
        price: 100000,
    },
    {
        id: 28,
        price: 100000,
    },
    {
        id: 29,
        price: 10000,
    },
    {
        id: 30,
        price: 30000,
    },
    {
        id: 31,
        price: 30000,
    },
    {
        id: 32,
        price: 30000,
    },
    {
        id: 33,
        price: 30000,
    },
    {
        id: 34,
        price: 3000,
    },
    {
        id: 35,
        price: 3000,
    },
    {
        id: 36,
        price: 3000,
    },
    {
        id: 37,
        price: 3000,
    },
    {
        id: 38,
        price: 1000,
    },
    {
        id: 39,
        price: 1000,
    },
    {
        id: 40,
        price: 1000,
    },
];
const BUSD = '0x8301f2213c0eed49a7e28ae4c3e91722919b8b47';
const maxAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const state = {
    farmVaults,
    buildPrice,
    maxAmount,
    BUSD,

};

const getters = {
    getVaults(state) {
        return state.farmVaults;
    },
    getBuildPrice(state){
        return state.buildPrice;
    },
    getBUSDAddress(state){
        return state.BUSD;
    },
    getMaxAmount(state){
        return state.maxAmount;
    }
};


export default {
    namespaced: true,
    state,
    getters,
};