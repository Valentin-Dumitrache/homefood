import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    dishes: [],
    cook: null,
    dish: null,
    pictures: [],
    ingredients: null
  },
  mutations: {
    logIn(state) {
      state.loggedIn = true;
    },
    setDishes(state, dishes) {
      state.dishes = dishes;
    },
    setCook(state, cook) {
      state.cook = cook;
    },
    setDish(state, dish) {
      state.dish = dish;
    },
    setPictures(state, pictures) {
      state.pictures = pictures;
      state.pictures.add(state.dish.mainPicture);
    },
    setIngredients(state, ingredients) {
      state.ingredients = ingredients;
    }
  },
  actions: {
    getDishes: async ({ commit }, id) => {
      let finalUrl = '';
      if (id) {
        finalUrl = `?id=${id}`;
      }
      await axios
        .get(`https://homefood-app.herokuapp.com/getdishes${finalUrl}`)
        .then(response => {
          commit('setDishes', response.data);
        })
        .catch(() => {
          //To-do handle errors
        });
    },
    getDishDetails: async ({ commit }, payload) => {
      await axios
        .get(
          `https://homefood-app.herokuapp.com/getdishdetails?dishid=${payload.dishId}&cookid=${payload.cookId}`
        )
        .then(response => {
          console.log(response);
          commit('setDish', response.data.dish);
          commit('setCook', response.data.cook);
          commit('setPictures', response.data.pictures);
          commit('setIngredients', response.data.ingredients);
        })
        .catch(() => {
          //To-do handle errors
        });
    }
  }
});
