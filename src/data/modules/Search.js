/**************  LOCAL FUNCTIONS ***************************/

import apiInfo from "./apiConfig";

const apiHeaderTemplate = new Headers({
    "x-app-id": apiInfo["x-app-id"],
    "x-app-key" : apiInfo["x-app-key"],
    "x-remote-user-id" : apiInfo["x-remote-user-id"]
});

//Based on Christian Bogdans course material.
const handleHTTPError = (response)  => {
    if(response.ok){
      return response;
    }
    else if(response.status === 503){
      throw Error("Nutritionix service temporarily unavailable. Please try again in a moment.")
    }
    throw Error(response.statusText);
}

/**************  STATE ***************************/
const state = {
    searchResult : [],
    searchQuery : "",
    restaurant: "",
    apiNutrientData: []
};

/**************  GETTERS ***************************/
const getters = {
    searchResult : state => state.searchResult,
    searchQuery : state => state.searchQuery,
    restaurant : state => state.restaurant,
    apiNutrientData : state => state.apiNutrientData
};

/**************  ACTIONS ***************************/
import {db} from '@/main'

const actions = {
    initSearchState({commit, dispatch}, user) {
        let userRef = db.collection('users').doc(user.uid);
        userRef.get().then(doc => {
            if(doc.exists) {
                return {
                        searchResult: doc.data().searchState.searchResult,
                        searchQuery: doc.data().searchState.searchQuery,
                        restaurant: doc.data().searchState.restaurant
                    }
            }
        }).then(searchState => {
            commit('initSearchStateFirebase', searchState);
            }
        ).catch(err => {}) // This is supposed to be empty
    },
    newSearch({commit, dispatch}, {userId}){
        let url = "https://trackapi.nutritionix.com/v2/search/instant";
        let apiHeader = new Headers(apiHeaderTemplate);
        apiHeader.append("Content-Type", "application/json");
        let apiBody = JSON.stringify({
            "query" : state.restaurant + " " + state.searchQuery,
            "detailed": true
        })
        return fetch(url, {
            method : "POST",
            headers : apiHeader,
            body : apiBody
        }).then(handleHTTPError)
        .then(response => response.json())
        .then(response => commit("newSearchResult", response["branded"]))
        .finally(() => dispatch('updateSearchStateFirebase', userId));
    },

    newQuery({commit}, query){
        commit("changeQuery", query);
    },

    selectRestaurant({commit, dispatch}, {restaurant, userId, signedIn}) {
        commit("changeQuery", "")
        commit('newSearchResult', [])
        commit("selectRestaurant", restaurant)
        if(signedIn){
            dispatch('updateSearchStateFirebase', userId);
        } 
    },

    changeQuery({commit, dispatch}, {query, userId}) {
        commit("changeQuery", query)
        dispatch('updateSearchStateFirebase', userId)
    },

    updateSearchStateFirebase({commit}, userId) {
         db.collection('users').doc(userId).update({
            searchState: {
                searchResult: state.searchResult,
                searchQuery: state.searchQuery,
                restaurant: state.restaurant
            }
        });
    },

    INIT_SEARCH({commit}){
        let url = "https://trackapi.nutritionix.com/v2/utils/nutrients";
        return fetch(url)
            .then(handleHTTPError)
            .then(response => response.json())
            .then(response => response.filter(
                element => element.api_name === "nf_protein" || element.api_name === "nf_total_fat" || element.api_name === "nf_total_carbohydrate" || element.api_name === "nf_calories"
            )).then(response => commit("addApiData", response));
    }

};

/**************  MUTATIONS ***************************/
import keywords from '@/constants/keywords'

const mutations = {
    changeQuery(state, query){
        state.searchQuery = query;
    },

    newSearchResult(state, result){
        let query = state.searchQuery;
        let searchKeywords = keywords[query]
        result = result.filter(dish => {return dish.food_name.match(searchKeywords) !== null})
        result = result.map(dish => {
            dish.full_nutrients.forEach(dishNutrient => {
                state.apiNutrientData.forEach(nutrient => {
                    if(dishNutrient.attr_id === nutrient.attr_id){
                        dishNutrient.name = nutrient.api_name;
                    }
                })
            });
            return dish;
        });
        state.searchResult = result;
    },

    selectRestaurant(state, restaurant) {
        state.restaurant = restaurant;
    },

    addApiData(state, data){
        state.apiNutrientData = data;
    },

    initSearchStateFirebase(state, searchState) {
        state.searchResult = searchState.searchResult,
        state.searchQuery = searchState.searchQuery,
        state.restaurant = searchState.restaurant
    },

    clearSearchState(state) {
        state.searchResult = [],
        state.searchQuery = '',
        state.restaurant = '',
        state.selectDish = {}
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}