import Vue from 'vue'
import VueRouter from 'vue-router'
import RegisterStudent from '../views/RegisterStudent.vue'
import ConsultStudent from '../views/ConsultStudent.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/cadastrar-aluno',
    name: 'RegisterStudent',
    component: RegisterStudent
  },

  {
    path: '/consultar-aluno',
    name: 'ConsultStudent',
    component: ConsultStudent
  },

  {
    path: '*',
    component: NotFound
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
