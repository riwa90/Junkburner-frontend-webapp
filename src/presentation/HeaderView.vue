<template>
    <div id="container-header">
        <v-header />
        <div class="navbar-container">
            <v-navbar />
        </div>
        <v-snackbar
            v-if="alertVisibility"
            :type="alert"
            :msg="snackbarMessage"
            class="center"
        />
        <v-snackbar
            v-if="successVisibility"
            :type="success"
            :msg="snackbarMessage"
            class="center"
        />
    </div>
</template>

<script>
import header from "@/presentation/Header";
import navbar from "@/container/NavBarContainer";
import snackbar from "@/presentation/Snackbar";
import { mapGetters } from "vuex";

export default {
    name: "HeaderView",
    data() {
        return {
            alert: "alert",
            success: "success"
        };
    },
    computed: {
        ...mapGetters([
            "alertVisibility",
            "successVisibility",
            "snackbarMessage"
        ])
    },
    components: {
        "v-header": header,
        "v-navbar": navbar,
        "v-snackbar": snackbar
    }
};
</script>

<style scoped>
.navbar-container {
    display: flex;
    flex-direction: row;
}

#container-header {
    width: 100%;
    height: 100px;
    background-color: #1e272e;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

@media screen and (max-width: 850px) {
    #container-header {
        flex-direction: column;
        height: auto;
        overflow: hidden;
    }

    .navbar-container {
        display: flex;
        flex-direction: row;
        background-color: #1e272e;
        justify-content: flex-end;
    }

    .spinner {
        left: 80%;
        top: 25%;
        transform: translate(-80%, -25%);
    }
}
</style>
