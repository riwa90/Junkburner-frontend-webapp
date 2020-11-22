<template>
    <div class="login-form">
        <h1>Login</h1>
        <div id="message">
            {{ message }}
        </div>
        <div class="input-row">
            <div>
                <label for="email"><b>E-mail:</b></label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    v-model="email"
                />
            </div>
        </div>
        <div class="input-row">
            <div>
                <label for="psw"><b>Password:</b></label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    name="psw"
                    v-model="password"
                />
            </div>
        </div>

        <button 
            @click="$emit('closeForm')" 
            class="btn btn-abort"
        >
            Close
        </button>
        <button
            type="submit"
            class="btn btn-green"
            @click="$emit('login', { email: email, password: password })"
        >
            Login
        </button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            message:
                "Please do not use your real e-mail or password, we have no control over what firebase does with them.",
            email: "",
            password: ""
        };
    }
};
</script>

<style scoped src="@/constants/FormStyle.css" />
