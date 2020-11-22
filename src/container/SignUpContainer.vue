<template>
    <v-signup-form 
        v-if="this.signUpVisibility" 
        @closeForm="close" 
        @signUp="signUp" 
    />
</template>

<script>
    import signupform from "@/presentation/SignUpForm";
    import { mapGetters, mapActions } from "vuex";
    export default {
        computed: {
            ...mapGetters(["signUpVisibility"])
        },
        methods: {
            close(){
                this.setSignUpNotVisible();
            },
            open(){
                this.setSignUpVisible()
            },
            toggle(){
                this.toggleSignUpVisible()
            },
            ...mapActions([
                "setSignUpVisible", 
                "setSignUpNotVisible", 
                "toggleSignUpVisible",
                "signUpUser",
                "loginUser"
            ]),
            signUp(userData){
                this.signUpUser(userData);
                this.close();
            }
        },
        components: {
            "v-signup-form": signupform
        }
    }
</script>