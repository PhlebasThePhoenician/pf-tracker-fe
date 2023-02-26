import type { RouteRecordRaw } from "vue-router";
import HomeView from '../views/HomeView.vue'
import Login from '../login/Login.vue';

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/accounts',
        name: 'accoutns',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../accounts/Account.vue')
      },
      {
        path: '/expenses',
        name: 'expenses',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../accounts/Account.vue')
      },
      {
        path: '/expensetypes',
        name: 'ExpenseTypes',
        // route level code-splitting
        // this generates a separate chunk (About.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import('../expense-types/ExpenseType.vue')
      }



];