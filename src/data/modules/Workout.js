/**************  LOCAL FUNCTIONS ***************************/
import workoutInfo from '@/data/modules/exerciseInfo';
const workoutTemplates = [
    {warmup: workoutInfo.exercises[1], workout: workoutInfo.exercises[0]},
    {warmup: workoutInfo.exercises[2], workout: workoutInfo.exercises[7]},
    {warmup: workoutInfo.exercises[2], workout: workoutInfo.exercises[8]},
    {warmup: workoutInfo.exercises[2], workout: workoutInfo.exercises[9]},
    {warmup: workoutInfo.exercises[3], workout: workoutInfo.exercises[0]},
    {warmup: workoutInfo.exercises[4], workout: workoutInfo.exercises[5]},
    {warmup: workoutInfo.exercises[4], workout: workoutInfo.exercises[6]},
    {warmup: workoutInfo.exercises[4], workout: workoutInfo.exercises[8]},
    {warmup: workoutInfo.exercises[4], workout: workoutInfo.exercises[10]},
    {warmup: workoutInfo.exercises[4], workout: workoutInfo.exercises[11]}
];


/**************  STATE ***************************/

const state = {
    workout : workoutTemplates[0],
    totalKcal: 0,
    totalTime: {
        minutes : 0,
        hours : 0
    },
    sessions : 0
};

/**************  GETTERS ***************************/
const getters = {
    workout : state => state.workout,
    workoutTotalKcal: state => state.totalKcal,
    totalTime: state => state.totalTime,
    sessions: state => state.sessions,
    totalExercise: state => JSON.parse(JSON.stringify(state))
};

/**************  ACTIONS ***************************/
import {db} from '@/main'

const actions = {
    initWorkoutState({commit}, user) {
        let userRef = db.collection('users').doc(user.uid);
        userRef.get().then(doc => {
            if(doc.exists) {
                return {
                        workout: doc.data().workoutState.workout,
                        totalKcal: doc.data().workoutState.totalKcal,
                        totalTime: doc.data().workoutState.totalTime,
                        sessions: doc.data().workoutState.sessions
                    }
            }
        })
        .then(workoutState => {
            commit('initWorkoutStateFirebase', workoutState);
            }
        )
        .catch(err => {}) // This is supposed to be empty
    },

    generateWorkoutSession({commit, dispatch}, {kcal, signedIn, userId}){
        let workoutSession = {
            workout : {},
            totalKcal: 0,
            totalTime: {
                minutes : 0,
                hours : 0
            },
            sessions : 1
        };
        let seed = Math.floor(Math.random() * 10);
        workoutSession.workout = workoutTemplates[seed];
        let totalTimeInMin = 0;
        if(kcal > 1000){
            workoutSession.sessions = Math.ceil(kcal/1000);
            kcal = kcal / workoutSession.sessions;
        }
        if(kcal < 350){
            let workoutTid = kcal / workoutSession.workout.warmup.kcalPerMin;
            workoutSession.workout.warmup.tid = Math.ceil(workoutTid);
            workoutSession.workout.workout.tid = 0;
        }
        else{
            let warmupSeed = 5 - Math.floor(Math.random() * 10);
            workoutSession.workout.warmup.tid = warmupSeed + 15;
            kcal -= workoutSession.workout.warmup.tid * workoutSession.workout.warmup.kcalPerMin;
            workoutSession.workout.workout.tid = Math.ceil(kcal / workoutSession.workout.workout.kcalPerMin);  
        }
        
        totalTimeInMin = (workoutSession.workout.workout.tid + workoutSession.workout.warmup.tid) * workoutSession.sessions;
        workoutSession.totalTime.hours = Math.floor(totalTimeInMin / 60);
        workoutSession.totalTime.minutes = totalTimeInMin % 60;
        
        workoutSession.totalKcal = workoutSession.workout.warmup.kcalPerMin*workoutSession.workout.warmup.tid;
        workoutSession.totalKcal += workoutSession.workout.workout.kcalPerMin*workoutSession.workout.workout.tid;
        workoutSession.totalKcal = Math.round(workoutSession.sessions*workoutSession.totalKcal);

        commit('storeTotalExercise', workoutSession);
        
        if(signedIn){
            dispatch('updateWorkoutStateFirebase', userId);
        }    
    },

    updateWorkoutStateFirebase({commit}, userId) {
        db.collection('users').doc(userId).update({
            workoutState: {
                workout: state.workout,
                totalKcal: state.totalKcal,
                totalTime: {
                    minutes: state.totalTime.minutes,
                    hours: state.totalTime.hours
                },
                sessions: state.sessions 
            }
        });
    }

};

/**************  MUTATIONS ***************************/
const mutations = {
    storeTotalExercise(state, totalExercise){
        state.workout = totalExercise.workout;
        state.totalKcal = totalExercise.totalKcal;
        state.totalTime = totalExercise.totalTime;
        state.sessions = totalExercise.sessions;
    },

    clearWorkoutState(state) {
        state.exercises = [],
        state.totalKcal = 0,
        state.totalTime = {
            minutes: 0,
            hours: 0
        },
        state.sessions = 0
    },

    initWorkoutStateFirebase(state, workoutState) {
        state.workout = workoutState.workout,
        state.totalKcal = workoutState.totalKcal,
        state.totalTime = workoutState.totalTime,
        state.sessions = workoutState.sessions
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}