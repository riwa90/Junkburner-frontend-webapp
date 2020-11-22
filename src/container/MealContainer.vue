<template>
    <v-meal-overview 
        @punishMe="generateWorkout"
    />
</template>

<script>
import mealOverview from "@/presentation/MealOverview"
import {mapActions, mapGetters} from "vuex";
export default {
    components: {
        "v-meal-overview" : mealOverview
    },
    computed : {
        ...mapGetters([
            "totalKcal",
            "userId",
            "signedIn"
        ])
    },
    methods: {
        ...mapActions([
            "generateWorkoutSession"
        ]),
        generateWorkout(){
            this.generateWorkoutSession({
                kcal: this.totalKcal, 
                userId: this.userId, 
                signedIn: this.signedIn
            });
            this.$router.push("Workout");
            if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
            }
            window.scrollTo(0,0);
        }
    }


}
</script>

