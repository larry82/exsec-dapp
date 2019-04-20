import Web3 from 'web3'
import {store} from '../store/'

let pollWeb3 = function (state) {
  let web3 = window.web3
  web3 = new Web3(web3.currentProvider)
  web3.currentProvider.on('update', ({selectedAddress, networkVersion}) => {
    store.dispatch('pollWeb3', {
      coinbase: selectedAddress
    })
  })
}
export default pollWeb3
