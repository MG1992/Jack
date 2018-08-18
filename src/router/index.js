import Vue from 'vue'
import Router from 'vue-router'
import Goods from '@/components/Goods'
import Detail from '@/components/Detail'
import Record from '@/components/Record'
import Location from '@/components/Location'
import Shop from '@/components/Shop'
import Exchange from '@/components/Exchange'

Vue.use(Router)

export default new Router({
  // mode: 'history',  
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shop
    },
    {
      path: '/goods',
      name: 'Goods',
      component: Goods
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/record',
      name: 'Record',
      component: Record
    },
    {
      path: '/location',
      name: 'Location',
      component: Location
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop
    },
    {
      path: '/exchange',
      name: 'Exchange',
      component: Exchange
    }
  ]
})
