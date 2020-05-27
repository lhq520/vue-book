import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/home',
      component:resovle=>require(['../views/Home'],resovle)
    },
    {
      path:'/home',
       name:'home',
      component:resovle=>require(['../views/Home'],resovle)
    },
    {
      path:'/bookrack',
       name:'bookrack',
      component:resovle=>require(['../views/Bookrack'],resovle)
    },
    {
      path:'/classify',
       name:'classify',
      component:resovle=>require(['../views/Classify'],resovle),
    },
    {
      path:'/rank',
       name:'rank',
      component:resovle=>require(['../views/Rank'],resovle),
    },
    {
      path:'/feilei',
      name:'feilei',
      component:resovle=>require(['../components/Feilei/Feilei.vue'],resovle),
    },
    {
      path:'/bookDetail/:id',
      name:'bookDetail',
      component:resovle=>require(['../components/BookDetail/BookDetail.vue'],resovle),
    },
    {
      path:'/read:id',
      name:'read',
      component:resovle=>require(['../components/Read/Read.vue'],resovle),
    },
    {
      path:'/search:val',
      name:'searchlist',
      component:resovle=>require(['../components/Search/SearchList.vue'],resovle),
    },

]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
