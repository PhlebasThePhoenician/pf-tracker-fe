import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../login/Login.vue';
import { routes } from './routes';
import { userStore } from '@/stores/user.store';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
});

router.beforeEach((to, from , next) => {
  // check if logged in
  const store = userStore();
  if (store.validSession() || to.path === '/login') {
    next();
    return;
  }
  console.log('Not logged in , returning to login')
  store.returnUrl = to.fullPath;
  next({
    name: 'Login'
  });
});

router.beforeEach( (to) => {
  if (to.path === '/login') {
    return;
  }
  return true;
});

export default router
