import Vue from 'vue'
import VueRouter from 'vue-router'
import Calendar from '../views/Calendar.vue'
import store from '@/store/index.js'
import UserServices from '@/services/UserServices.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'Calendar',
    // component: Calendar,
    beforeEnter(routeTo, routeFrom, next) {
      if (store.getters['user/getName'] == '') {
        location.href =
          'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1655687599&redirect_uri=https://selikastraying.github.io&state=12345abcde&scope=profile%20openid'
      } else {
        next('/')
      }
    }
  },
  {
    path: '/',
    name: 'authed',
    component: Calendar,
    beforeEnter(routeTo, routeFrom, next) {
      if (routeTo.query.code) {
        UserServices.getToken(routeTo.query.code)
          .then(token => {
            UserServices.getProfile(token.id_token)
              .then(profile => {
                store.dispatch('user/setName', profile.name)
              })
              .catch(() => {
                next('/auth')
              })
          })
          .catch(() => {
            next('/auth')
          })
        next()
      } else {
        next('/auth')
      }
    }
  }
]

// router.beforeEach((routeTo, routeFrom, next) => {
//   next()
// })

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
