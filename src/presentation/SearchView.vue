<template>
    <div>
        <v-overview />
        <v-search-container />
    </div>
</template>

<script>
import Overview from "@/container/MealContainer";
import SearchContainer from "@/container/SearchContainer";

export default {
    name: "SearchView",
    components: {
        "v-overview": Overview,
        "v-search-container": SearchContainer
    }
};
</script>
