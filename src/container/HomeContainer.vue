<template>
    <div>
        <v-home-display 
            @createMeal="goToSearch" 
            @showFormLogin="showLogin" 
            @showFormSignup="showSignUp"
        />
    </div>
</template>

<script>
import homePresentation from '@/presentation/HomeDisplay'
import {mapActions} from 'vuex';
export default {
    components:{
        'v-home-display': homePresentation
    },
    methods: {
        showLogin(){
            this.setLoginVisible();
        },
        goToSearch() {
            this.$router.push('Meal');
        },
        showSignUp(){
            this.setSignUpVisible();
        },
        ...mapActions([
                'setLoginVisible',
                'setSignUpVisible'
            ])
    }
}
</script>