import Vue from 'vue'
import VueRouter from 'vue-router'
import Students from '../views/Students.vue'
import ConsultStudent from '../views/ConsultStudent.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  
  {
    path: '/cadastrar-aluno',
    name: 'Students',
    component: Students
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
