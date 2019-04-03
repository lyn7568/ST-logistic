import Vue from 'vue'
import Router from 'vue-router'
import auth from './auth'

const LoginPage = () => import('@/pages/LoginPage.vue')
const NavPage = () => import('@/pages/NavPage.vue')
const WelcomePage = () => import('@/pages/WelcomePage.vue')
const EditPwd = () => import('@/pages/EditPwd.vue')
const None = () => import('@/pages/None.vue')
const DownloadPage = () => import('@/pages/DownloadPage.vue')
const TempUpload = () => import('@/pages/express/TempUpload.vue')

Vue.use(Router)

import all from './add.js'

var route = new Router({
  routes: [
    {
      path: '/',
      meta: {
        noLogin: true,
      },
      name: 'LoginPage',
      component: LoginPage
    },
    
    {
      path: '/nav',
      name: 'NavPage',
      component: NavPage,
      children: [{
        path: 'welcome',
        name: 'WelcomePage',
        component: WelcomePage,
      },
      {
        path: '/editPwd',
        name: 'editPwd',
        component: EditPwd,
      },
      {
        path: '/download',
        name: 'DownloadPage',
        component: DownloadPage
      },
      {
        path: '/temp/upload',
        name: 'TempUpload',
        component: TempUpload
      },
      ...all,
      {
        path: '/*',
        component: None
      },
      ]
    },
   
  ]
})

route = auth(route);

export default route
