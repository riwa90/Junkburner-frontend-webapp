<template>
    <div>
        <div id="container-home">
            <v-home-container />
        </div>
    </div>
</template>

<script>
import homecontainer from "@/container/HomeContainer";

export default {
    components: {
        "v-home-container": homecontainer
    }
};
</script>

<style scoped>
/****** GENERAL ******/
.btn {
    margin: 10px 5px;
}

/******  WRAPPER *****/
img {
    margin-top: 15px;
    max-width: 15%;
    max-height: 15%;
}

#container-home {
    text-align: center;
    width: 100%;
    margin-top: 30px;
}

#home-text {
    margin-left: auto;
    margin-right: auto;
    width: 20vw;
    padding: 20px;
}

/******* MEDIA QUERIES *******/

@media screen and (max-width: 800px) {
    #home-text {
        width: 90vw;
        padding: 5px;
    }

    .btn {
        padding: 8px 16px;
    }
}
</style>
