<template>
    <div
        class="restaurant-button"
        :class="{ active: isActive }"
        @click="$emit('click')"
    >
        <img :src="url" :alt="alt" class="responsive-pic" />
    </div>
</template>

<script>
export default {
    props: {
        url: String,
        alt: String,
        isActive: Boolean
    }
};
</script>

<style scoped>
.restaurant-button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px dashed #000;
    background-color: #fff;
    padding: 10px;
    width: 120px;
    margin: 20px;
}

.restaurant-button:hover,
.active {
    background-color: orange;
    border-color: orange;
    cursor: pointer;
}
</style>
