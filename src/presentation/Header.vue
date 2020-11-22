<template>
    <div class="header">
        <img :src="logo" />
        <h1>JUNKFOOD BURNER</h1>
    </div>
</template>

<script>
export default {
    name: "Header",
    data() {
        return {
            logo: require("@/images/logo.png")
        };
    }
};
</script>

<style scoped>
.header {
    width: 500px;
}
.header img {
    max-width: 80px;
    height: auto;
    float: left;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 30px;
}

.header h1 {
    display: inline-block;
    letter-spacing: 2px;
    word-spacing: 4px;
    color: #fff;
    font-size: 200%;
    margin-top: 35px;
    margin-left: 15px;
}

@media screen and (max-width: 1065px) {
    .header h1 {
        font-size: 1.1em;
        margin-top: 40px;
    }
}

@media screen and (max-width: 420px) {
    .header h1 {
        display: none;
    }
}
</style>
