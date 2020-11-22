<template>
    <div>
        <v-sidebar-food-item 
            v-for="dishItem in currentMeal" 
            :key="dishItem.id"
            :name="dishItem.name"
            :amount="dishItem.amount"
            :type="dishItem.type"
            :itemId="dishItem.id"
            @delete="deleteDish(dishItem)"
            @changeAmount="changeAmount"
        />
    </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import sidebarFoodItem from '@/presentation/SidebarFoodItem'

export default {
    name: 'SidebarFoodItemContainer',
    methods: {
        changeAmount(event, id) {
            let newAmount = Number(event.target.value);
            this.setAmount({
                id: id, 
                amount: newAmount, 
                userId: this.userId
            });
        },
        deleteDish(dishItem) {
            this.removeDish({
                    dish: dishItem, 
                    userId: this.userId
                });
                if(this.sessions !== 0){
                    this.generateWorkoutSession({
                        kcal: this.totalKcal,
                        userId: this.userId,
                        signedIn: this.signedIn
                    })
                }
        },
        ...mapActions([
                "removeDish", 
                "setAmount",
                "generateWorkoutSession"
            ])
    },
    computed: {
        ...mapGetters([
                "currentMeal",
                "userId",
                "signedIn",
                "sessions",
                "totalKcal"
            ])
    },
    components: {
        'v-sidebar-food-item': sidebarFoodItem
    }
}
</script>