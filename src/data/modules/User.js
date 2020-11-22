/**************  STATE ***************************/

const state = {
    age : 0,
    length : 0,
    weight : 0,
    kcalRdi : 0,
    userId : "",
    gender : "",
    signedIn : false
};

/**************  GETTERS ***************************/
const getters = {
    age : state => state.age,
    length : state => state.length,
    weight : state => state.weight,
    kcalRdi : state => state.kcalRdi,
    userId : state => state.userId,
    gender : state => state.gender,
    signedIn : state => state.signedIn,
    user : state => { 
        return { "age" : state.age, 
        "length" : state.length, 
        "weight" : state.weight, 
        "gender" : state.gender
        };
    }
};

/**************  ACTIONS ***************************/
import firebase from "firebase";
import {db} from "@/main";

const actions = {
    initUser({commit, dispatch}, user) {
        commit('setUserId', user.uid)
        let userRef = db.collection('users').doc(user.uid);
        userRef.get().then(doc => {
            if(doc.exists) {
                return {
                        age: doc.data().age,
                        weight: doc.data().weight,
                        length: doc.data().length,
                        gender: doc.data().gender,
                        userId: doc.data().userID,
                    }
            }
        })
        .then(user => {
            dispatch('loadUser', user);
            }
        )
        .catch(() => commit('calculateKcalRdi'))
    },
    setSignedIn({commit}) {
        commit('setSignedIn');
    },
    loadUser({commit}, user){
        commit("loadUser", user);
        commit("calculateKcalRdi");
    },
    signOut({commit}){
        commit("signOut");
    },
    setAge({commit}, age){
        commit("setAge", age);
        commit("calculateKcalRdi");
    },
    setLength({commit}, length){
        commit("setLength", length);
        commit("calculateKcalRdi");
    },
    setWeight({commit}, weight){
        commit("setWeight", weight);
        commit("calculateKcalRdi");
    },
    setGender({commit}, gender){
        commit("setGender", gender);
        commit("calculateKcalRdi");
    },
    loginUser({commit}, user){
        let userMail = user.email;
        let password = user.password;
        
        firebase
            .auth()
            .signInWithEmailAndPassword(userMail, password)
            .then(cred => {
                return db.collection('users').doc(cred.user.uid).get()
            }).then(doc => {
                let user = {
                    age: doc.data().age,
                    weight: doc.data().weight,
                    length: doc.data().length,
                    gender: doc.data().gender,
                    userId: doc.data().userID,
                };
                commit('loadUser', user);
                commit('setSnackbarMessage', 'Successfully logged in');
                commit('setSuccessVisible');
            })
            .catch((err) => {
                commit('setSnackbarMessage', err.message)
                commit('setAlertVisible');
            })
            .finally(
                setTimeout(() => commit('setAlertNotVisible'), 5000),
                setTimeout(() => commit('setSuccessNotVisible'), 5000)
            );
    },
    signOutUser({commit}){
        firebase
                .auth()
                .signOut()
                .then(() => {
                    commit('signOut');
                    commit('setSnackbarMessage', 'Successfully signed out');
                    commit('setSuccessVisible');
                })
                .catch(() => {
                    commit('setSnackbarMessage', 'Something went wrong when signing out. You are stuck!')
                    commit('setAlertVisible');
                })
                .finally(
                    setTimeout(() => commit('setAlertNotVisible'), 5000),
                    setTimeout(() => commit('setSuccessNotVisible'), 5000),
                    commit('clearMealState'),
                    commit('clearUserState'),
                    commit('clearWorkoutState'),
                    commit('clearSearchState')
                );
    },
    updateUserSettings({commit}, userInfo) {
        commit('setAge', userInfo.age)
        commit('setLength', userInfo.length)
        commit('setWeight', userInfo.weight)
        commit('setGender', userInfo.gender)
        commit('calculateKcalRdi')
        db.collection('users').doc(state.userId).update({
            age: userInfo.age,
            length: userInfo.length,
            weight: userInfo.weight,
            gender: userInfo.gender
        })
        .then(() => {
            commit('setSnackbarMessage', 'Successfully updated profile settings in database');
            commit('setSuccessVisible');
        })
        .catch(() => {
            commit('setSnackbarMessage', 'Could not update profile settings in database')
            commit('setAlertVisible');
        })
        .finally(
            setTimeout(() => commit('setAlertNotVisible'), 5000),
            setTimeout(() => commit('setSuccessNotVisible'), 5000)
        ); 
    },
    signUpUser({commit}, user) {
        commit('setAge', user.age);
        commit('setLength', user.length);
        commit('setAge', user.age);
        commit('setGender', user.gender);
        commit('setWeight', user.weight);

        firebase
            .auth()
            .createUserWithEmailAndPassword(user.email, user.password).then(cred => {
                return db.collection('users').doc(cred.user.uid).set({
                    userID: cred.user.uid,
                    age: user.age,
                    weight: user.weight,
                    length: user.length,
                    gender: user.gender,
                    mealState: {
                        currentMeal : [],
                        totalKcal : 0,
                        totalFat : 0,
                        totalCarb : 0,
                        totalProt : 0,
                    },
                    searchState: {
                        searchResult : [],
                        searchQuery : "",
                        restaurant: ""
                    },
                    workoutState: {
                        workout : {},
                        totalKcal: 0,
                        totalTime: {
                            minutes : 0,
                            hours : 0
                        },
                        sessions : 0
                    }
                })
            })
            .then(() => {
                commit('setSnackbarMessage', 'Successfully created a new user');
                commit('setSuccessVisible');
            })
            .catch((err) => {
                commit('setSnackbarMessage', err.message)
                commit('setAlertVisible');
            })
            .finally(
                setTimeout(() => commit('setAlertNotVisible'), 5000),
                setTimeout(() => commit('setSuccessNotVisible'), 5000)
            );
    }

};

/**************  MUTATIONS ***************************/
const mutations = {
    loadUser(state, user){
        state.age = user.age;
        state.length = user.length;
        state.weight = user.weight;
        state.userId = user.userId;
        state.gender = user.gender;
        state.signedIn = true;
    },
    setSignedIn(state) {
        state.signedIn = true;
    },
    signOut(state){
        state.signedIn = false;
    },
    setAge(state, age){
        state.age = age;
    },
    setLength(state, length){
        state.length = length;
    },
    setWeight(state, weight){
        state.weight = weight;
    },
    setUserId(state, userId) {
        state.userId = userId;
    },
    setGender(state, gender){
        state.gender = gender;
    },
    calculateKcalRdi(state){ // Revised Harris-Benedict Equation
        if(state.gender === "Female"){
            state.kcalRdi = Math.round(88.362 + 13.397*state.weight + 4.799*state.length - 5.677*state.age);
        }
        else{
            state.kcalRdi = Math.round(447.593 + 9.247*state.weight + 3.098*state.length - 4.33*state.age);
        }
    },

    clearUserState(state) {
        state.age = 0,
        state.length = 0,
        state.weight = 0,
        state.kcalRdi = 0,
        state.userId = "",
        state.gender = "",
        state.signedIn = false
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}