import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueCompositionApi, { provide } from "@vue/composition-api";
import { DefaultApolloClient } from "@vue/apollo-composable";
import ApolloClient from "apollo-boost";
import "./styles/base/normalize.css";
import "./styles/base/variables.css";

import VueApollo from "vue-apollo";

const apolloClient = new ApolloClient({
  // You should use an absolute URL here
  connectToDevTools: true,
  uri: "http://localhost:4000/graphql"
});

Vue.use(VueApollo);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },
  render: h => h(App)
}).$mount("#app");
