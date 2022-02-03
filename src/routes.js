import VueRouter from "vue-router";
import Test from "./Pages/Test.vue";
import DetailsTest from "./Pages/DetailsTest.vue";

export default new VueRouter({
  routes: [
    {
      path: "",
      component: Test,
      name: "crawling"
    },
    {
      path: "/:id/details",
      component: DetailsTest,
      name: "details"
    }
  ],
  mode: "history"
});
