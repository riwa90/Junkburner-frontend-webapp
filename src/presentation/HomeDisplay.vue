<template>
    <div>
        <img src="../images/homeHamburger.png" />
        <p id="home-text">
            {{ text }}
        </p>
        <button
            v-if="userNotSignedIn"
            @click="$emit('showFormSignup')"
            class="btn btn-orange"
        >
            Sign up!
        </button>
        <button
            v-if="userNotSignedIn"
            @click="$emit('showFormLogin')"
            class="btn btn-green"
        >
            Login
        </button>
        <button
            v-if="userSignedIn"
            @click="$emit('createMeal')"
            class="btn btn-green"
        >
            Create meal
        </button>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            text:
                "Welcome to Junk Burner! Here you can create fast food meals and figure out how much you need to workout to burn it off! Click on the button below to create a free account."
        };
    },
    computed: {
        ...mapGetters(["signedIn"]),
        userNotSignedIn() {
            return this.signedIn === false;
        },
        userSignedIn() {
            return this.signedIn === true;
        }
    }
};
</script>

<style scoped>
img {
    margin-top: 15px;
    max-width: 15%;
    max-height: 15%;
}

#home-text {
    width: 20vw;
    padding: 20px;
    margin: auto;
}

@media screen and (max-width: 800px) {
    #home-text {
        width: 80vw;
        padding: 5px;
    }

    .btn {
        padding: 8px 16px;
    }
}
</style>
