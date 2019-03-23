import Vue from 'vue'
import Router from 'vue-router'
import ExsecDapp from '@/components/exsec-dapp'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'exsec-dapp',
      component: ExsecDapp
    }
  ]
})
