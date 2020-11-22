<template>
    <div id="sidebar">
        <div class="sidebar-header">
            <h2>Meal</h2>
            <div class="sidebar-stats-calories">
                <span>{{ totalKcal }}</span> /
                <span v-if="signedIn">{{ kcalRdi }}</span>
                <span v-else> - </span> kcal
            </div>
            <button
                class="button-visibility btn expand-btn"
                @click="toggleSidebarVisibility"
            >
                Expand
            </button>
        </div>
        <div id="sidebar-wrapper" class="sidebar-ctrl-visibility">
            <v-sidebar-food-item-container class="sidebar-food-items" />
            <div id="sidebar-table-container">
                <h2>Meal summary</h2>
                <table>
                    <tr class="dark">
                        <td>Calories:</td>
                        <td>{{ totalKcal }} kcal</td>
                    </tr>
                    <tr class="light">
                        <td>Carbohydrates:</td>
                        <td>{{ totalCarb }} grams</td>
                    </tr>
                    <tr class="dark">
                        <td>Protein:</td>
                        <td>{{ totalProt }} grams</td>
                    </tr>
                    <tr class="light">
                        <td>Fat:</td>
                        <td>{{ totalFat }} grams</td>
                    </tr>
                </table>

                <div class="rdi-div">
                    <p>Recommended daily intake:</p>
                    <p>{{ kcalRdi }} kcal</p>
                </div>
                <button class="btn btn-abort" @click="punishUser">
                    Punish me
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import sidebarFoodItemContainer from "@/container/SidebarFoodItemContainer";

export default {
    methods: {
        toggleSidebarVisibility() {
            let wrapper = document.body.querySelector("#sidebar-wrapper");

            if (wrapper.className === "sidebar-ctrl-visibility") {
                wrapper.className = "sidebar-visible";
            } else {
                wrapper.className = "sidebar-ctrl-visibility";
            }
        },
        punishUser() {
            this.$emit("punishMe");
        }
    },
    computed: {
        ...mapGetters([
            "signedIn",
            "kcalRdi",
            "totalKcal",
            "totalFat",
            "totalCarb",
            "totalProt"
        ])
    },
    components: {
        "v-sidebar-food-item-container": sidebarFoodItemContainer
    }
};
</script>

<style scoped>
.dark {
    background-color: #808e9b;
}

.light {
    background-color: #9a9898;
}

table {
    border-collapse: collapse;
    margin-bottom: 40px;
}

td {
    padding: 5px;
}

.rdi-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1em;
    margin-bottom: 10px;
    background-color: #9a9898;
    padding: 5px;
}

.rdi-div p {
    margin: 2px;
}

.sidebar-food-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
}

#sidebar {
    background-color: #485460;
    min-width: 300px;
}

.button-visibility {
    display: none;
}

.expand-btn {
    background-color: #808e9b;
    color: #f5f5f5;
    padding: 5px 10px;
}

.expand-btn:hover {
    background-color: #485460;
}

.sidebar-visible,
.sidebar-ctrl-visibility {
    display: block;
}

.sidebar-visible {
    display: block;
}

.sidebar-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 13px;
    padding-right: 13px;
    background-color: #808e9b;
    margin: 10px 8px;
}

#sidebar-table-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 60px;
}

@media screen and (max-width: 850px) {
    .button-visibility {
        display: inline-block;
    }

    .sidebar-ctrl-visibility {
        display: none;
    }
}
</style>
