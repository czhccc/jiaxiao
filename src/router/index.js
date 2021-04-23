import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login/login.vue'
import Home from '../views/home/home.vue'
import StudentManage from '../views/student/studentManage.vue'
import Car from '../views/car/car.vue'
import TrainerSelect from '../views/trainer/trainerSelect.vue'
import Lesson from '../views/lesson/lesson.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/student',
    redirect: '/student/studentManage'
  },
  {
    path: '/trainer',
    redirect: '/trainer/trainerSelect'
  },
  {
    path: '/lesson',
    redirect: '/lesson/lesson'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { 
      showBar: false
    }
  },
  {
    path: '/forgetPassword',
    name: 'ForgetPassword',
    component: () => import('../views/login/forgetPassword.vue'),
    meta: { 
      showBar: false
    }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home/resetPassword',
        name: 'ResetPassword',
        component: () => import('../views/home/resetPassword.vue')
      }
    ]
  },
  {
    path: '/student/studentManage',
    name: 'StudentManage',
    component: StudentManage,
    children: [
      {
        path: '/student/studentDropOut',
        name: 'StudentDropOut',
        component: () => import('../views/student/studentDropOut.vue')
      },
      {
        path: '/student/studentGraduation',
        name: 'studentGraduation',
        component: () => import('../views/student/studentGraduation.vue')
      },
    ]
  },
  {
    path: '/car',
    name: 'Car',
    component: Car
  },
  {
    path: '/trainer/trainerSelect',
    name: 'TrainerSelect',
    component: TrainerSelect,
    children: [
      {
        path: '/trainer/trainerRate',
        name: 'TrainerRate',
        component: () => import('../views/trainer/trainerRate.vue')
      },
      {
        path: '/trainer/trainerDropOut',
        name: 'TrainerDropOut',
        component: () => import('../views/trainer/trainerDropOut.vue')
      },
    ]
  },
  {
    path: '/lesson/lesson',
    name: 'Lesson',
    component: Lesson,
    children: [
      {
        path: '/lesson/exam',
        name: 'Exam',
        component: () => import('../views/lesson/exam.vue')
      },
      {
        path: '/lesson/grade',
        name: 'Grade',
        component: () => import('../views/lesson/grade.vue')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
