import Vue from 'vue';
import VueRouter from 'vue-router';
import LandingPage from '@/pages/landing-page';
import DishList from '@/pages/dish-list';
import DishDetail from '@/pages/dish-details';
import CookProfile from '@/pages/cook-profile';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: LandingPage
  },
  {
    path: '/dishList',
    name: 'dishList',
    component: DishList
  },
  {
    path: '/dish/:id',
    name: 'dish',
    component: DishDetail
  },
  {
    path: '/cook/:id',
    name: 'profile',
    component: CookProfile
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
