<template>
  <div class="container">
    <div></div>
    <div class="col-md-8 offset-md-2 my-3" v-for="(market) in market_addresses">
      <b-card title="兩岸關係" sub-title="預測">
        <b-card-text>
          {{ market }}
          Some quick example text to build on the <em>card title</em> and make up the bulk of the card's
          content.
        </b-card-text>

        <b-card-text>A second paragraph of text in the card.</b-card-text>

        <a href="#" class="card-link" @click="getAddress">Card link</a>
        <b-link href="#" class="card-link">Another link</b-link>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'homepage',
  data () {
    return {
      market_addresses: []
    }
  },
  mounted () {

  },
  methods: {

  }

}
</script>

<style scoped>
</style>
