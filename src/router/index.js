import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      name:'map',
      component:()=>import('../views/MapView/MapView.vue')
    },
    {
      path:'/city',
      name:'city',
      component:()=>import('../views/CityView/CityView.vue')
    },
    {
      path:'/city_v1',
      name:'city_v1',
      component:()=>import('../views/CityView/CityView_v1.vue')
    },
    {
      path:'/test',
      name:'test',
      component:()=>import('../views/CityView/test.vue')
    }
  ]
})

export default router
