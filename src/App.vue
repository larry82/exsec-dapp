<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import state from "./store/state"
export default {
  name: 'App',
  async beforeCreate() {
    if(!this.$store.state.web3.web3Instance) {
      await this.$store.dispatch('registerWeb3')
      await this.$store.dispatch('getContractInstance')
    }
  },
  computed: mapState({
    contractInstance: state => state.contractInstance,
    coinbase: state => state.web3.coinbase
  }),
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
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px*/
}
</style>
