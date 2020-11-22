<template>
    <div id="search-container">
        <div class="box-80">
            <h1>Create your meal!</h1>
        </div>

        <div class="restaurants-box box-80">
            <h3>Choose restaurant</h3>
            <v-restaurant-btn-container />
        </div>

        <v-food-options-container v-if="signedIn" />
        
        <div class="search-results-box" v-if="signedIn">
            <v-food-card
                v-for="result in searchResult"
                :key="result.nix_item_id"
                :kcal="nutritionInfo(result, 'nf_calories')" 
                :carbs="nutritionInfo(result, 'nf_total_carbohydrate')"
                :protein="nutritionInfo(result, 'nf_protein')"
                :fat="nutritionInfo(result, 'nf_total_fat')"
                :name="result.food_name"
                :id="result.nix_item_id"
                @addDishToMeal="bubbleEvent"
            />
        </div>

        <div v-if="!signedIn" class="sign-in-message">
            You need to sign in to be able to create your junkfood meal!
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import foodCard from "@/presentation/FoodCard";
import restaurantButtonContainer from "@/container/RestaurantButtonContainer";
import foodOptionsContainer from "@/container/FoodOptionsContainer";

export default {
    props: ["searchResult"],
    components: {
        "v-food-card": foodCard,
        "v-restaurant-btn-container": restaurantButtonContainer,
        "v-food-options-container": foodOptionsContainer
    },
    methods: {
        bubbleEvent(event) {
            this.$emit("addDishToMeal", event);
        },
        nutritionInfo(dish, nutrition){
            let fullNutrient =  dish.full_nutrients.filter(nutrient => {
                if(nutrient.name){
                    return nutrient.name === nutrition;
                }
                return false;
            });
            return fullNutrient[0].value;
        }
    },
    computed: {
        ...mapGetters(["signedIn"])
    }
};
</script>

<style scoped>
/******* GENERAL / MAIN *******/
#search-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.box-80 {
    width: 80%;
}

.responsive-pic {
    max-width: 100%;
    height: auto;
}

.icon {
    height: 24px;
}

.icon-small {
    height: 16px;
}

.sign-in-message {
    margin-top: 20px;
    font-size: 1.2em;
}

/****** CHOOSE RESTAURANT *******/
.restaurants-box {
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
}

.restaurants-box h3 {
    margin-left: 15px;
}

.restaurant-buttons-row {
    display: flex;
    justify-content: space-around;
}

/******** SEARCH RESULTS ******/
.search-results-box {
    width: 80%;
    margin-top: 20px;
    margin-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
}

/***** MEDIA QUERIES ******/
@media screen and (max-width: 670px) {
    .restaurant-button {
        width: 50px;
    }

    .icon {
        height: 16px;
    }

    .type-button {
        font-size: 0.8em;
        padding: 2px 8px;
    }

    .food-item-box {
        width: 110px;
    }
}
</style>
