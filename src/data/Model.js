import Vue from "vue";
import Vuex from "vuex";
import meal from "./modules/Meal";
import workout from "./modules/Workout";
import search from "./modules/Search";
import user from "./modules/User";
import formVisibility from "./modules/FormVisibility";
import headerInformationVisibility from "./modules/headerInformationVisibility"

Vue.use(Vuex);

export default new Vuex.Store({
  modules : {
   meal,
   workout,
   search,
   user,
   formVisibility,
   headerInformationVisibility
  }
});
