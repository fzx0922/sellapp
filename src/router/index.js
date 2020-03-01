import Vue from 'vue'
import VueRouter from 'vue-router'
import main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',name: 'main',component: main,children:[
    {path: '/evaluate',name: 'evaluate',component: () => import( '../views/Evaluate.vue')},
    {path: '/goods',name: 'goods',component: () => import( '../views/Goods.vue')},
    {path: '/business',name: 'business',component: () => import( '../views/Business.vue')},
    {path: '/shopcar',name: 'Shopcar',component: () => import( '../views/Shopcar.vue')},
  ]},
  // {path: '/about',name: 'About',component: () => import( '../views/About.vue')}
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
