/**************  STATE ***************************/

const state = {
    alertVisibility: false,
    successVisibility: false,
    snackbarMessage: '',
    loggingIn: false
};

/**************  GETTERS ***************************/
const getters = {
    alertVisibility: state => state.alertVisibility,
    successVisibility: state => state.successVisibility,
    snackbarMessage: state => state.snackbarMessage,
    loggingIn: state => state.loggingIn
};

/**************  ACTIONS ***************************/

const actions = {
    setAlertVisible({commit}){
        commit('setAlertVisible');
    },
    setAlertNotVisible({commit}){
        commit('setAlertNotVisible');
    },
    setLoggingIn({commit}){
        commit('setLoggingIn');
    },
    setNotLoggingIn({commit}){
        commit('setNotLoggingIn');
    },
    setSuccessVisible({commit}){
        commit('setSuccessVisible');
    },
    setSuccessNotVisible({commit}){
        commit('setSuccessNotVisible');
    },
    setSnackbarMessage({commit}, msg) {
        commit('setSnackbarMessage', msg)
    }
};

/**************  MUTATIONS ***************************/
const mutations = {
    setAlertVisible(state){
        state.alertVisibility = true;
    },
    setAlertNotVisible(state){
        state.alertVisibility = false;
    },
    setSuccessVisible(state){
        state.successVisibility = true;
    },
    setSuccessNotVisible(state){
        state.successVisibility = false;
    },
    setSnackbarMessage(state, msg) {
        state.snackbarMessage = msg;
    },
    setLoggingIn(state) {
        state.loggingIn = true;
    },
    setNotLoggingIn(state) {
        state.loggingIn = false;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}