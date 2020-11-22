<template>
    <div class="restaurant-buttons-row">
        <v-restaurant-button
            v-for="button in restaurantButtons"
            :isActive="activeRestaurant(button.key)"
            :key="button.key"
            :url="button.url"
            :alt="button.alt"
            @click="chooseRestaurant(button.key)"
        />
    </div>
</template>

<script>
import restaurantButton from "@/presentation/RestaurantButton"
import { mapGetters, mapActions } from "vuex";

export default {
    name: 'RestaurantButtonContainer',
    data() {
        return {
            restaurantButtons: [
                {
                    url: require("@/images/mcdonalds_logo.png"),
                    alt: "McDonalds logo",
                    key: "McDonalds"
                },
                {
                    url: require("@/images/bk_logo.png"),
                    alt: "Burger King logo",
                    key: "Burger King"
                },
                {
                    url: require("@/images/subway_logo.png"),
                    alt: "Subway logo",
                    key: "Subway"
                }
            ]
        };
    },
    methods: {
        chooseRestaurant(restaurant) {
            this.selectRestaurant({
                restaurant: restaurant, 
                userId: this.userId, 
                signedin: this.signedIn
            })
        },
        activeRestaurant(name) {
            return name === this.restaurant;
        },
        ...mapActions(['selectRestaurant'])
    },
    computed: {
        ...mapGetters([
                'restaurant', 
                'userId', 
                'signedIn'
            ])
    },
    components: {
        "v-restaurant-button": restaurantButton
    }
};
</script>
