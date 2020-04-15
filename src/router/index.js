import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewProfile from '@/components/NewProfile'
import ViewProfile from '@/components/ViewProfile'
import EditProfile from '@/components/EditProfile'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new-profile',
      name: 'new-profile',
      component: NewProfile
    },
    {
      path: '/edit/:user_id',
      name: 'edit-profile',
      component: EditProfile
    },
    {
      path: '/view/:user_id',
      name: 'view-profile',
      component: ViewProfile
    }
  ]
})
