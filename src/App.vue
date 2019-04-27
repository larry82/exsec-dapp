<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import state from './store/state'
export default {
  name: 'App',
  async beforeCreate () {
    if (!this.$store.state.web3.web3Instance) {
      await this.$store.dispatch('registerWeb3')
      await this.$store.dispatch('getContractInstance')
    }
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')

    this.$nextTick(function () {
      this.$store.dispatch('getMarketAddresses')
      window.setInterval(() => {
        this.$store.dispatch('getMarketAddresses')
      }, 10000)
    })
  },
  computed: mapState({
    contractInstance: state => state.contractInstance,
    coinbase: state => state.web3.coinbase
  }),
  methods: {

  },
  watch: {
    contractInstance: function (val) {
      // this.$store.dispatch('checkLoginState')
    },
    coinbase: function (val) {
      // this.$store.dispatch('checkLoginState')
    }
  }
}

</script>

<style>
#app {
  font-family: PingFangSC-Light, sans-serif;
  color: #3c4858;
  /*text-align: center
  color: #2c3e50
  margin-top: 60px*/
}
</style>
