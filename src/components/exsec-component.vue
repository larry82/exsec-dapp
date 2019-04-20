<template>
  <div class="casino container">
    <div>
    	<butto v-on:click="createMarket">
    		創建市場
    	</button>
    </div>	
  </div>
</template>  

<script>
  export default {
    name: 'exsec',
    data () {
      return {
        amount: null,
        pending: false,
        winEvent: null
      }
    },
    mounted () {
      console.log(‘dispatching getContractInstance’)
      this.$store.dispatch(‘getContractInstance’)
    },
    methods: {
      createMarket (event) {
        this.$store.state.contractInstance().methods.createMarket('1','1','1','1')
        .send({from:this.$store.state.web3.coinbase, gas: 300000})
        .on('receipt', receipt => {
            this.$message('創建成功');
        })
        .on('error', error => {
            this.$message('創建失败');
        })
      }
    }
  }
</script>