import Web3 from 'web3'

let getWeb3 = new Promise(function (resolve, reject) {
  var web3js = window.web3
  var web3Provider
  if (typeof web3js !== 'undefined') {
    web3Provider = web3js.currentProvider
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
  }
  var web3 = new Web3(web3Provider)
  resolve({
    injectedWeb3: web3.eth.net.isListening(), // 新的api
    web3 () {
      return web3
    }
  })
})
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.net.getId((err, networkId) => { // 新的api
        if (err) {
          reject(new Error('Unable to retrieve network ID'))
        } else {
          console.log('retrieve newworkId: ' + networkId)
          result = Object.assign({}, result, {networkId})
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getCoinbase((err, coinbase) => {
        if (err) {
          reject(new Error('Unable to retrieve coinbase'))
        } else {
          coinbase = result.web3().utils.toChecksumAddress(coinbase)
          console.log('retrieve coinbase: ' + coinbase)
          result = Object.assign({}, result, {coinbase})
          resolve(result)
        }
      })
    })
  })
  .then(result => {
    return new Promise(function (resolve, reject) {
      result.web3().eth.getBalance(result.coinbase, (err, balance) => {
        if (err) {
          reject(new Error('Unable to retrieve balance'))
        } else {
          console.log('retrieve balance: ' + balance)
          result = Object.assign({}, result, {balance})
          resolve(result)
        }
      })
    })
  })

export default getWeb3
