import Vue from "vue";
import App from "./Pages/App.vue";
import Vuelidate from "vuelidate";
import Resource from "vue-resource";
import VueRouter from "vue-router";
import routes from "./routes.js";

Vue.use(Vuelidate);
Vue.use(Resource);
Vue.use(VueRouter);

Vue.http.options.root = "https://localhost:44364/api/";

Vue.filter("dateConversion", function(oldValue) {
  const newValue = new Date(oldValue);
  return newValue.toLocaleDateString(newValue, {
    year: "numeric",
    day: "numeric",
    month: "long",
    hour: "numeric",
    minute: "numeric"
  });
});

new Vue({
  el: "#app",
  render: h => h(App),
  router: routes
});
