import Vue from "vue";
import Router from "vue-router";
import HomeView from "@/presentation/HomeView";
import SearchView from "@/presentation/SearchView";
import WorkoutView from "@/presentation/WorkoutView";
import firebase from 'firebase'

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: "/",
            name: "Home",
            component: HomeView
        },
        {
            path: "/meal",
            name: "Meal",
            component: SearchView,
        },
        {
            path: "/workout",
            name: "Workout",
            component: WorkoutView,
        },
        {
            path: "*",
            name: "404",
            redirect: "/"
        }
    ]
});

router.beforeEach((to, from, next) => {
    let currentUser = firebase.auth().currentUser
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  
    if (requiresAuth && !currentUser) next('/')
    else next()
});

export default router;
