<template>
    <div class="login-form">
        <h1>
            Update user profile
        </h1>

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
                    placeholder="Your weight in kilograms"
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
                    placeholder="Your length in centimeters"
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
        </div>
        <button @click="$emit('closeForm')" class="btn btn-abort">
            Close
        </button>
        <button
            type="submit"
            class="btn btn-green"
            :disabled="$v.$invalid"
            @click="
                $emit('updateProfile', {
                    age: age,
                    weight: weight,
                    length: length,
                    gender: gender
                })
            "
        >
            Update profile
        </button>
    </div>
</template>

<script>
import {
    required,
    between,
    integer,
    numeric,
    minValue,
    maxValue
} from "vuelidate/lib/validators";

export default {
    data() {
        return {
            age: this.user.age,
            weight: this.user.weight,
            length: this.user.length,
            gender: this.user.gender
        };
    },
    validations: {
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
    },
    props: {
        user: Object
    }
};
</script>

<style scoped src="@/constants/FormStyle.css" />
