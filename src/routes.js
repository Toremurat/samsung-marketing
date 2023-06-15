import { createWebHistory, createRouter } from "vue-router";
import homePage from "@/views/homePage.vue";
import promoPage from "@/views/promoPage.vue";

const routes = [
  {
    path: '/promo/',
    name: 'homePage',
    component: homePage,
  },
  {
    path: '/promo/:id',
    name: 'promoPage',
    component: promoPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;