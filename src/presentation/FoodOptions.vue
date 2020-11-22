<template>
    <div class="types-of-food-box">
        <span
            v-for="icon in icons"
            :key="icon.name"
            class="type-button"
            :class="{ active: isActive(icon.query) }"
            @click="$emit('click', icon.query)"
        >
            <img :src="icon.url" class="icon" />
            <p>{{ icon.name }}</p>
        </span>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: "FoodOptions",
    methods: {
        isActive(query) {
            return query === this.searchQuery;
        }
    },
    props: {
        icons: Array
    },
    computed: {
        ...mapGetters(["searchQuery"])
    }
};
</script>

<style scoped>
.types-of-food-box {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}

.type-button {
    display: flex;
    justify-content: center;
    border: 1px solid #696969;
    border-radius: 50px;
    align-items: center;
    padding: 4px 15px;
    margin-left: 5px;
    margin-top: 10px;
}

.type-button p {
    margin-left: 5px;
}

.type-button:hover,
.active {
    background-color: orange;
    color: #fff;
    cursor: pointer;
}
</style>
