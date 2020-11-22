<template>
    <div>
        <v-overview />
        <v-workout-container />
    </div>
</template>

<script>
import Overview from "@/container/MealContainer";
import workoutcontainer from "@/container/WorkoutContainer";

export default {
    name: "WorkoutView",
    components: {
        "v-overview": Overview,
        "v-workout-container": workoutcontainer
    }
};
</script>
