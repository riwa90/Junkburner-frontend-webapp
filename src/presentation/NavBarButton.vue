<template>
    <div
        class="nav-bar-button"
        :class="{
            active: isActive,
            signUp: this.isSignup,
            login: this.isLogin,
            signOut: isSignOut
        }"
        @click="$emit('navBtnClicked', text)"
    >
        <p>
            {{ text }}
        </p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isSignup: this.text === "Sign up!",
            isLogin: this.text === "Login",
            isSignOut: this.text === "Sign out"
        };
    },
    props: {
        text: String
    },
    computed: {
        isActive: function() {
            return this.$router.currentRoute.name === this.text;
        }
    }
};
</script>

<style scoped>
/**STYLES */
.active {
    color: orange !important;
    border-bottom: 5px solid orange;
}

.signUp {
    background-color: #ffa801 !important;
    color: #1e272e !important;
}

.login {
    background-color: #05c46b !important;
}

.signOut {
    background-color: #ff3f34 !important;
    color: black !important;
}

.nav-bar-button {
    height: 70px;
    background-color: #1e272e;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    text-align: center;
    padding-top: 30px;
    padding-left: 5px;
    padding-right: 5px;
    text-decoration: none;
    width: 70px;
}

/** EVENTS */
.nav-bar-button:hover {
    background-color: #485460;
    cursor: pointer;
}

.nav-bar-button:active {
    font-size: 11px;
    padding-bottom: 3px;
    background-color: #1e272e !important;
    height: 50px;
    color: #fff !important;
    border-style: none !important;
}

/** QUERIES */
@media screen and (max-width: 1020px) {
    .nav-bar-button {
        font-size: 12px;
        width: 50px;
    }
}

@media screen and (max-width: 850px) {
    .nav-bar-button {
        font-size: 12px;
        width: 50px;
        height: 37px;
        padding-top: 2px;
    }

    .active {
        border: none;
        color: #ffa801;
    }
}
</style>
