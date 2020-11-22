<template>
    <div>
        <div id="workout-container" v-if="hasMeal()">
            <div class="box-80">
                <h1>Calculated training</h1>
            </div>
            <div v-if="signedIn">
                <v-exercise-container class="exercises-box"/>
            </div>
            <div class="box-80 centered workout-text" v-if="signedIn">
                <span>
                    {{
                        "Perform for " +
                            totalExercise.sessions +
                            "x session(s) spending a total of " +
                            totalExercise.totalTime.hours +
                            " hours and " +
                            paddedMinutes +
                            " minutes for a total of " +
                            totalExercise.totalKcal +
                            " amount of kcal burned."
                    }}
                </span>
            </div>
            <div class="box-80 centered" v-if="signedIn">
                <button class="btn btn-abort mb-50" @click="punishUser">
                    Different punishment please
                </button>
            </div>
        </div>
        <div id="workout-container" v-if="!hasMeal() && signedIn">
            <div class="box-80">
                <h1>Make a meal before generating a workout!</h1>
            </div>
        </div>
        <div v-if="!signedIn" class="sign-in-message">
                You need to sign in to be able to use the training generator!
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import exercisecontainer from "@/container/ExerciseContainer";

export default {
    name: "WorkoutView",
    components: {
        "v-exercise-container": exercisecontainer
    },
    computed: {
        ...mapGetters([
            "totalExercise", 
            "signedIn", 
            "totalKcal"
        ]),
        paddedMinutes: function(){
            let min = this.totalExercise.totalTime.minutes.toString();
            if(this.totalExercise.totalTime.minutes < 10){
                return min.padStart(2, 0);
            }
            return min;
        }
    },
    methods: {
        punishUser() {
            this.$emit("punishUser");
        },
        hasMeal() {
            return this.totalKcal > 0;
        }
    }
};
</script>

<style scoped>
.sign-in-message {
    margin-top: 20px;
    margin-left: 20px;
    font-size: 1.4em;
}

#workout-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.mb-50 {
    margin-bottom: 50px;
}

.centered {
    display: flex;
    justify-content: center;
}

.box-80 {
    width: 80%;
}

.exercises-box {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-evenly;
}

.workout-text {
    margin: 20px;
}

@media screen and (max-width: 510px) {
    .exercises-box {
        flex-direction: column;
        /*justify-content: center;*/
        align-items: center;
    }
}
</style>
