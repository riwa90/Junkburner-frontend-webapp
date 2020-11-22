<template>
    <div class="snackbar" :class="type">
        {{ msg }}
    </div>
</template>

<script>
export default {
    name: "Snackbar",
    props: [
            "type", 
            "msg"
        ]
};
</script>

<style scoped>
.snackbar {
    width: 300px;
    height: 60px;
    color: #fff;
    padding: 10px;
    text-align: center;
    border: 1px dotted #fff;
}

.alert {
    background-color: #ff5e57;
}

.success {
    background-color: #05c46b;
}
</style>
