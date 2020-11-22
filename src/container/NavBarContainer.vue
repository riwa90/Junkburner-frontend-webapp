<template>
    <div v-if="reRender">
        <v-nav-button
            v-for="button in buttonsToRender" 
            :text="button" 
            :key="button"
            @navBtnClicked="handleBtnPress"/>
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex';
import button from "@/presentation/NavBarButton"
export default {
    name: "Navbar",
    data() {
        return{
            buttons : [
                "Sign up!",
                "Profile", 
                "Home", 
                "Meal", 
                "Workout", 
                "Sign out", 
                "Login"
            ],
            reRender : true
        }
    },
    methods: {
        handleBtnPress(event){
            if(event==="Sign up!"){
                this.toggleSignUpVisible();
            }
            else if(event === "Login"){
                this.toggleLoginVisible();
            }
            else if(event === "Profile"){
                this.toggleProfileVisible();
            }
            else if(event === "Sign out"){
                this.signOutUser();
                this.setProfileNotVisible();
            }
            else{
                if(event === "Workout"){
                    this.generateWorkoutSession({
                        kcal : this.totalKcal, 
                        userId: this.userId, 
                        signedIn: this.signedIn
                    });
                }
                this.$router.push(event);
            }
        },
        forceReRender(){
            this.reRender = false;
            this.$nextTick(() => {this.reRender = true;})
        },
        ...mapActions([
            "toggleLoginVisible",
            "toggleSignUpVisible",
            "toggleProfileVisible",
            "signOutUser",
            "generateWorkoutSession",
            "setProfileNotVisible"
        ])
    },
    computed: {
        buttonsToRender: function(){
            let render = this.buttons.slice();
            if(this.signedIn){
                render = 
                    render.filter((element) => element !== "Sign up!")
                    .filter((element) => element !== "Login");
            }
            else{
                render = render.filter((element) => element !== "Profile")
                .filter((element) => element !== "Sign out");
            }
            return render;
        },
        ...mapGetters([
                'userId', 
                'signedIn', 
                'totalKcal'
            ])
    },
    components: {
        'v-nav-button' : button
    },
    watch: {
        $route(to, from){
            this.forceReRender();
        }
    }
};
</script>