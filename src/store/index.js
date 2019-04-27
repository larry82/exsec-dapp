import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getWeb3 from '../util/getWeb3'
import pollWeb3 from '../util/pollWeb3'
import getContract from '../util/getContract'
import Web3 from 'web3'
import {ABI, address} from '../util/constants/exsecContract'
import {marketABI} from '../util/constants/marketContract'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state,
  mutations: {
    registerWeb3Instance (state, payload) {
      console.log('registerWeb3instance Mutation being executed', payload)
      let result = payload
      let web3Copy = state.web3
      web3Copy.coinbase = result.coinbase
      web3Copy.networkId = result.networkId
      web3Copy.balance = parseInt(result.balance, 10)
      web3Copy.isInjected = result.injectedWeb3
      web3Copy.web3Instance = result.web3
      state.web3 = web3Copy
      pollWeb3()
    },
    pollWeb3Instance (state, payload) {
      console.log('pollWeb3Instance mutation being executed', payload)
      state.web3.coinbase = payload.coinbase
      state.web3.balance = parseInt(payload.balance, 10)
    },
    registerMarketInstances (state, payload) {
      let web3 = state.web3

      payload.forEach(function(address, index, addresses) {
        addresses[index] = new web3.eth.Contract(marketABI, address)
      })

      state.marketContracts = payload
    },
    registerContractInstance (state, payload) {
      console.log('Dapp contract instance: ', payload)
      state.contractInstance = () => payload
    }
    // setLoginState (state, payload) {
    //   state.authUser.loginState = payload
    // },
    // setRegisterState (state, payload) {
    //   state.authUser.registerState = payload
    // },
    // setUserAccount (state, payload) {
    //   state.authUser.account = payload
    // }
  },
  actions: {
    registerWeb3 ({commit}) {
      console.log('registerWeb3 Action being executed')
      getWeb3.then(result => {
        console.log('committing result to registerWeb3Instance mutation')
        commit('registerWeb3Instance', result)
      }).catch(e => {
        console.log('error in action registerWeb3', e)
      })
    },
    pollWeb3 ({commit}, payload) {
      console.log('pollWeb3 action being executed')
      commit('pollWeb3Instance', payload)
    },
    getContractInstance ({commit}) {
      getContract.then(result => {
        commit('registerContractInstance', result)
      }).catch(e => console.log(e))
    },
    getMarketAddresses ({commit}) {
      this.$store.state.contractInstance().methods.getDeployedMarkets()
        .call({from: this.$store.state.web3.coinbase})
        .then(res => {
          console.log('Market Addresses: ' + res)
          commit('registerMarketInstances', res)
        })
        .catch(error => {
          console.log(error)
        })
    }
    // checkLoginState ({commit, state}) {
    //   try {
    //     state.contractInstance().methods.isMemberOf().call({from: state.web3.coinbase})
    //       .then(result => {
    //         return new Promise((resolve, reject) => {
    //           resolve(result)
    //         })
    //       })
    //       .then(result => {
    //         if (result === true) {
    //           state.contractInstance().methods.getMemberInfo().call({from: state.web3.coinbase})
    //             .then(result => {
    //               commit('setLoginState', true)
    //               commit('setRegisterState', true)
    //               commit('setUserAccount', result)
    //             })
    //             .catch(err => {
    //               console.log(err)
    //               commit('setLoginState', false)
    //               commit('setRegisterState', false)
    //               commit('setUserAccount', {name: '', avatar: '', balance: 0})
    //             })
    //         } else {
    //           commit('setLoginState', false)
    //           commit('setRegisterState', false)
    //           commit('setUserAccount', {name: '', avatar: '', balance: 0})
    //         }
    //       })
    //       .catch(e => {
    //         console.log(e)
    //       })
    //   } catch (e) {
    //     console.log(e)
    //   }
    // }
  }
})
