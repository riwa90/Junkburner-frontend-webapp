<template>
    <div>
        <v-food-options 
            @click="search" 
            v-if="isSelected(mcDonalds.name)" 
            :icons="mcDonalds.icons" 
            :key="mcDonalds.name" 
            :restaurant="mcDonalds.name"
        />
        <v-food-options 
            @click="search" 
            v-if="isSelected(burgerKing.name)" 
            :icons="burgerKing.icons" 
            :key="burgerKing.name" 
            :restaurant="burgerKing.name"
        />
        <v-food-options 
            @click="search" 
            v-if="isSelected(subway.name)" 
            :icons="subway.icons" 
            :key="subway.name" 
            :restaurant="subway.name"
        />
    </div>
</template>

<script>
import FoodOptions from '@/presentation/FoodOptions'
import {HAMBURGER, FRIES, SALAD, SANDWICH, DRINKS, COFFEE, COOKIE}  from '@/constants/icons'
import {mapGetters, mapActions} from 'vuex'

export default {
    name: 'FoodOptionsContainer',
        data() {
        return {
            mcDonalds: {
                name: 'McDonalds',
                visible: false,
                icons: [
                        HAMBURGER, 
                        FRIES, 
                        SALAD, 
                        COFFEE, 
                        DRINKS
                    ]
            },
            burgerKing: {
                name: 'Burger King',
                visible: false,
                icons: [
                        HAMBURGER, 
                        SANDWICH, 
                        FRIES, 
                        SALAD, 
                        COFFEE, 
                        DRINKS
                    ]
            },
            subway: {
                name: 'Subway',
                visible: false,
                icons: [
                        SANDWICH, 
                        SALAD, 
                        COFFEE, 
                        COOKIE, 
                        DRINKS
                    ]
            }
        };
    },
    methods: {
        isSelected(name) {
            return name === this.restaurant;
        },
        search(query) {
            this.changeQuery({query: query, userId: this.userId})
            this.newSearch({userId: this.userId})
        },
        ...mapActions([
                'changeQuery', 
                'newSearch'
            ])
    },
    computed: {
        ...mapGetters([
                'restaurant', 
                'userId'
            ])
    },
    components: {
        'v-food-options': FoodOptions
    }
}
</script>