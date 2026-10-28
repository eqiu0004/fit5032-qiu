import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import FirebaseRegisterView from '../views/FirebaseRegisterView.vue'
import LogoutView from '../views/LogoutView.vue'
import AddBookView from '../views/AddBookView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'
import WeatherView from '../views/WeatherView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
    {
      path: '/FireLogin',
      name: 'FireLogin',
      component: FirebaseSigninView,
    },
    {
      path: '/FireRegister',
      name: 'FireRegister',
      component: FirebaseRegisterView,
    },
    {
      path: '/logout',
      name: 'logout',
      component: LogoutView,
    },
    {
      path: '/addbook',
      name: 'AddBook',
      component: AddBookView,
    },
    {
      path: '/getbookcount',
      name: 'GetBookCount',
      component: GetBookCountView,
    },
    {
      path: '/WeatherCheck',
      name: 'GetWeather',
      component: WeatherView,
    },
  ],
})

export default router