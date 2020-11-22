<template>
    <v-login-form 
        v-if="this.loginVisibility" 
        @closeForm="close" 
        @login="login" 
    />
</template>

<script>
    import loginform from "@/presentation/LoginForm"
    import { mapGetters, mapActions } from "vuex";
    export default {
        computed: {
            ...mapGetters([
                "loginVisibility", 
                'signedIn'
            ])
        },
        methods: {
            close(){
                this.setLoginNotVisible();
            },
            open(){
                this.setLoginVisible()
            },
            toggle(){
                this.toggleLoginVisible()
            },
            ...mapActions([
                "setLoginVisible", 
                "setLoginNotVisible", 
                "toggleLoginVisible",
                "loginUser"
            ]),
            login(userData){
                this.loginUser(userData);
                this.close();
            }
        },
        components: {
            'v-login-form': loginform
        }
        
    }
</script>