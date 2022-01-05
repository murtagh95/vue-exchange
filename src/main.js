// Vue
import Vue from "vue";
import App from "./App.vue";
import router from "@/router";

// Utils
import "@/assets/css/tailwind.css";
import { dollarFilter, percentFilter } from "@/filter";

// third party components
import Chartkick from "vue-chartkick";
import Chart from "chart.js";
import { VueSpinners } from "@saeris/vue-spinners";

Vue.use(VueSpinners);
Vue.use(Chartkick.use(Chart));

Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
