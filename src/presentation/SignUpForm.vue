<template>
    <div class="login-form">
        <h1>
            Sign up!
        </h1>
        <div id="message">
            {{ message }}
        </div>
        <div class="input-row">
            <div>
                <label for="email" :class="{ 'input-error': $v.email.$error }"
                    ><b>E-mail:</b></label
                >
                <input
                    type="text"
                    placeholder="Enter Email"
                    name="email"
                    @input="$v.email.$touch()"
                    v-model="email"
                />
            </div>
            <p class="error-msg" v-if="$v.email.$error">
                Please provide a valid e-mail address!
            </p>
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
        <div class="input-row">
            <div>
                <label for="age"><b>Age:</b></label>
                <input
                    type="number"
                    placeholder="Your age"
                    name="age"
                    @input="$v.age.$touch()"
                    v-model="age"
                />
            </div>
            <p class="error-msg" v-if="$v.age.$error">
                Age has to be between 10 and 120
            </p>
        </div>
        <div class="input-row">
            <div>
                <label for="weight"><b>Weight:</b></label>
                <input
                    type="number"
                    placeholder="Kilograms"
                    name="weight"
                    @input="$v.weight.$touch()"
                    v-model="weight"
                />
            </div>
            <p class="error-msg" v-if="$v.weight.$error">
                Weight has to be a positive number (not larger than 450)!
            </p>
        </div>
        <div class="input-row">
            <div>
                <label for="length"><b>Length:</b></label>
                <input
                    type="number"
                    placeholder="Centimeters"
                    name="length"
                    @input="$v.length.$touch()"
                    v-model="length"
                />
            </div>
            <p class="error-msg" v-if="$v.length.$error">
                Length has to be between 50 and 250 cm!
            </p>
        </div>
        <div class="input-row">
            <div>
                <label for="gender"><b>Gender:</b></label>
                <select name="gender" v-model="gender">
                    <option>Male</option>
                    <option>Female</option>
                </select>
            </div>
            <p>All fields are required</p>
        </div>
        <button @click="$emit('closeForm')" class="btn btn-abort">Close</button>
        <button
            type="submit"
            class="btn btn-green"
            :disabled="$v.$invalid"
            @click="signUp"
        >
            Sign up
        </button>
    </div>
</template>

<script>
import {
    required,
    email,
    between,
    integer,
    numeric,
    minValue,
    maxValue
} from "vuelidate/lib/validators";

export default {
    data() {
        return {
            message:
                "Please do not use your real e-mail or password, we have no control over what firebase does with them.",
            email: "",
            password: "",
            age: Number,
            weight: Number,
            length: Number,
            gender: "Male",
            submitStatus: null
        };
    },
    methods: {
        signUp() {
            this.$emit("signUp", {
                email: this.email,
                password: this.password,
                age: this.age,
                weight: this.weight,
                length: this.length,
                gender: this.gender
            });
        }
    },
    validations: {
        email: {
            email,
            required
        },
        age: {
            required,
            between: between(10, 120),
            integer
        },
        weight: {
            required,
            numeric,
            minValue: minValue(1),
            maxValue: maxValue(400)
        },
        length: {
            required,
            numeric,
            minValue: minValue(50),
            maxValue: maxValue(250)
        }
    }
};
</script>

<style scoped src="@/constants/FormStyle.css" />
