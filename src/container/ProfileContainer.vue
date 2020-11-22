<template>
    <v-profile 
        v-if="this.profileVisibility" 
        :user="this.user" 
        @closeForm="this.toggle"
        @updateProfile="this.updateProfile"  
    />
</template>

<script>
    import profile from "@/presentation/Profile";
    import { mapGetters, mapActions } from "vuex";
    export default {
        computed: {
            ...mapGetters(["profileVisibility", "user"])
        },
        methods: {
            toggle(){
                this.toggleProfileVisible()
            },
            ...mapActions([
                "toggleProfileVisible",
                "updateUserSettings"
            ]),
            updateProfile(userData){
                this.updateUserSettings(userData);
                this.toggle();
            }
        },
        components: {
            "v-profile": profile
        }
    }
</script>