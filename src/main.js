import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import BaseItemCard from "./components/UI/BaseItemCard.vue";
import PageFooter from "./components/UI/PageFooter.vue";
import GoUp from "./components/UI/GoToTop.vue";
// import BuyCartPage from "./components/pages/BuyCartPage.vue";

const app = createApp(App);

app.component("base-item-card", BaseItemCard);
app.component("page-footer", PageFooter);
app.component("go-up", GoUp);
// app.component("buy-cart-page", BuyCartPage);

app.use(store);
app.use(router);

app.mount("#app");
