<template>
    <div class="food-item-box">
        <div class="food-title-box">
            {{ name }}
        </div>
        <div class="food-options-box">
            <button
                class="btn btn-add"
                @click="
                    $emit('addDishToMeal', {
                        dish: {
                            id: itemId,
                            name: name,
                            kcal: kcal,
                            carbs: carbs,
                            fat: fat,
                            protein: protein,
                            amount: 1
                        }
                    })
                "
            >
                Add to meal
            </button>
            <button class="btn btn-info" @click="displayInfo">
                More info
            </button>
        </div>
        <div class="info-table" v-if="showInfo">
            <table>
                <tr>
                    <td>Carbohydrates:</td>
                    <td>{{ carbs }} grams</td>
                </tr>
                <tr>
                    <td>Fat:</td>
                    <td>{{ fat }} grams</td>
                </tr>
                <tr>
                    <td>Protein:</td>
                    <td>{{ protein }} grams</td>
                </tr>
                <tr>
                    <td>Calories:</td>
                    <td>{{ kcal }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showInfo: false,
            itemId: this.id
        };
    },
    methods: {
        displayInfo() {
            if (this.showInfo === true) {
                this.showInfo = false;
                return;
            }
            this.showInfo = true;
        }
    },
    props: {
        name: String,
        carbs: Number,
        protein: Number,
        fat: Number,
        kcal: Number,
        id: String
    }
};
</script>

<style scoped>
.food-item-box {
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4);
    transition: 0.3s;
    min-width: 210px;
    max-width: 210px;
}

.food-item-box:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
}

.food-title-box {
    display: flex;
    justify-content: center;
    text-transform: capitalize;
    padding: 5px;
    background-color: orange;
}

.spinner-div {
    display: flex;
    justify-content: center;
    padding: 10px;
}

.food-options-box {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    height: 40px;
}

.info-table {
    font-size: 0.8em;
    padding: 5px 10px;
}

/***** BUTTONS ******/
.btn {
    padding: 4px;
    color: #fff;
    border: none;
    font-size: 12px;
}

.btn:hover {
    cursor: pointer;
}

.btn-add {
    background-color: #05c46b;
    margin-right: 7px;
    padding: 10px;
}
.btn-info {
    background-color: #0097e6;
    padding: 10px;
    margin-left: 7px;
}
</style>
