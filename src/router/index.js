import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";
import MainPage from "../components/pages/MainPageProducts.vue";
import AboutUs from "../components/pages/AboutUs.vue";
import PrivacyPolicy from "../components/pages/PrivacyPolicy.vue";
import ReturnsAndRefunds from "../components/pages/ReturnsAndRefunds.vue";
import PaymentAndDelivery from "../components/pages/PaymentAndDelivery.vue";
import BuyCartPage from "../components/pages/BuyCartPage.vue";
import ItemPage from "../components/pages/ItemPage.vue";
import LoginPage from "../components/pages/LoginPage.vue";

const routes = [
  {
    path: "/",
    component: MainPage,
  },
  {
    path: "/login",
    component: LoginPage,
  },
  {
    path: "/about",
    component: AboutUs,
  },
  {
    path: "/payment",
    component: PaymentAndDelivery,
  },
  {
    path: "/return",
    component: ReturnsAndRefunds,
  },
  {
    path: "/privacy",
    component: PrivacyPolicy,
  },
  {
    path: "/buycart",
    component: BuyCartPage,
  },
  {
    path: "/item/:id",
    component: ItemPage,
  },
  {
    // path: '/about',
    // name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
