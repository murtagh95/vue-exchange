// Vue
import Vue from "vue";
import App from "./App.vue";
import router from "@/router";

// Utils
import "@/assets/css/tailwind.css";
import { dollarFilter, percentFilter } from "@/filter";

Vue.filter("dollar", dollarFilter);
Vue.filter("percent", percentFilter);
Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
