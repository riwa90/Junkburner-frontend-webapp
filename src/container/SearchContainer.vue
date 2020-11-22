<template>
    <v-search 
            :searchResult="this.searchResult" 
            @addDishToMeal="addDishToMeal"
        />
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import search from "@/presentation/Search";
export default {
    data() {
        return {
        };
    },
    methods: {
        ...mapActions(["addDish"]),

        addDishToMeal(event){
            event.dish.type = this.searchQuery;
            event.userId = this.userId;
            this.addDish(event);
        }
    },
    computed: {
        ...mapGetters([
                "searchResult",  
                "searchQuery", 
                "userId"
            ])
    },
    components : {
        "v-search" : search
    }
};
</script>

