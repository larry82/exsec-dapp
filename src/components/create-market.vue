<template>
  <div class="row">
    <div class="offset-md-2"></div>
    <div class="col-md-8">
    <b-form @submit="createMarket" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="預測標的:"
        label-for="input-1"
        description="輸入您感興趣的問題、現象或趨勢"
      >
        <b-form-input
          id="input-1"
          v-model="form.description"
          type="text"
          required
          placeholder="例如:「兩岸關係」"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3"
                    label="預測類型:"
                    label-for="input-3"
                    description="目前僅支援二元趨勢(正/負向)及避險預測"
      >
        <b-form-select
          id="input-3"
          v-model="form.marketType"
          :options="marketTypes"
          required
        ></b-form-select>
      </b-form-group>

      <b-form-group id="input-group-2" label="結束時間:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.endTime"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

<!--       <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Check me out</b-form-checkbox>
          <b-form-checkbox value="that">Check that out</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group> -->
      <div class="row">
      <div class="col-auto mr-auto"><b-button type="reset" variant="light">Reset</b-button></div>
      <div class="col-auto"><b-button type="submit" variant="primary">Submit</b-button></div>
      </div>
    </b-form>
    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
  </div>
</template>

<script>
export default {
  name: 'exsec',
  data () {
    return {
      form: {
        description: '',
        endTime: '',
        marketType: null,
        checked: []
      },
      marketTypes: [{ text: '請選擇', value: null }, '二元趨勢', '避險'],
      show: true
    }
  },
  mounted () {
    console.log('dispatching getContractInstance')
    this.$store.dispatch('getContractInstance')
  },
  methods: {
    createMarket (evt) {
      evt.preventDefault()
      this.$store.state.contractInstance().methods.createMarket('2','2','2','2')
        .send({from:this.$store.state.web3.coinbase, gas: 3000000})
        .on('receipt', receipt => {
          this.$message('創建成功');
        })
        .on('error', error => {
          this.$message('創建失败', error);
        })
    },
    onSubmit (evt) {
      evt.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(evt) {
      evt.preventDefault()
      // Reset our form values
      this.form.description = ''
      this.form.endTime = ''
      this.form.marketType = null
      this.form.checked = []
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  }
}
</script>
