import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import * as DATA from "@/api/index";
Vue.config.productionTip = false;

new Vue({
   data() {
      return {
         searchResults: [],
         pageNumber: 1,
         searchInput: "",
         imgPosition: 0,
      };
   },
   methods: {
      async getFetch() {
         let data = await DATA.searching(this.searchInput, this.pageNumber);
         this.searchResults = [];
         for (let i of data.results) {
            this.searchResults.push(i);
         }
      },
      async getInput(query) {
         this.pageNumber = 1;
         this.searchResults = [];
         this.searchInput = query;
         let data = await DATA.searching(query, this.pageNumber);
         for (let i of data.results) {
            this.searchResults.push(i);
         }
         document.querySelector(".gallery > .btns").style.display = "block";
      },
      thisImg(index) {
         this.imgPosition = index;
         document.querySelector(".gallery > .light-box").style.display = "block";
      },
      nextPage() {
         document.querySelector(".gallery > .light-box").style.display = "none";
         this.pageNumber++;
         this.getFetch();
      },
      previousPage() {
         document.querySelector(".gallery > .light-box").style.display = "none";
         this.pageNumber--;
         this.getFetch();
      },
   },
   router,
   render: (h) => h(App),
}).$mount("#app");
