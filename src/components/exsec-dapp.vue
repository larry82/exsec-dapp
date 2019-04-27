<template>
  <div class="container">
    <hello-metamask/>
    <homepage/>
    <create-market/>
  </div>
</template>

<script>
import HelloMetamask from '@/components/hello-metamask'
import homepage from '@/components/homepage'
import createMarket from '@/components/create-market'
export default {
  name: 'exsec-dapp',
  beforeCreate () {
    console.log('registerWeb3 Action dispatched from exsec-dapp.vue')
    this.$store.dispatch('registerWeb3')
  },
  components: {
    'hello-metamask': HelloMetamask,
    'homepage': homepage,
    'create-market': createMarket
  }
}
</script>

<style scoped>

</style>
