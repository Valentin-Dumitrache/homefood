import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const hostPath = 'https://homefood-app.herokuapp.com/';

export default new Vuex.Store({
  state: {
    loggedIn: false,
    dishes: {
      loading: false,
      data: []
    },
    selectedCook: {
      loading: false,
      details: null,
      dishes: []
    },
    selectedDish: {
      loading: false,
      cook: null,
      details: null,
      pictures: [],
      ingredients: []
    }
  },
  getters: {
    isDishesLoading: state => state.dishes.loading,
    dishes: state => state.dishes.data,
    isSelectedDishesLoading: state => state.selectedDish.loading,
    selectedDishDetails: state => state.selectedDish.details,
    selectedDishCook: state => state.selectedDish.cook,
    selectedDishIngredients: state => state.selectedDish.ingredients,
    selectedDishPictures: state => state.selectedDish.pictures,
    isSelectedCookLoading: state => state.selectedCook.loading,
    selectedCookDetails: state => state.selectedCook.details,
    selectedCookDishes: state => state.selectedCook.dishes
  },
  mutations: {
    logIn(state) {
      state.loggedIn = true;
    },
    beforeSetDishes(state) {
      state.dishes.loading = true;
    },
    setDishesSuccess(state, dishes) {
      state.dishes.data = dishes;
      state.dishes.loading = false;
    },
    setDishesFail(state) {
      state.dishes.loading = false;
    },
    beforeGetDishDetails(state) {
      state.selectedDish.loading = true;
    },
    getDishDetailsSuccess(state, data) {
      state.selectedDish.details = data.dish;
      state.selectedDish.cook = data.cook;
      state.selectedDish.ingredients = data.ingredients;
      state.selectedDish.pictures = [data.dish.mainPicture, ...data.pictures];
      state.selectedDish.loading = false;
    },
    getDishDetailsFail(state) {
      state.selectedDish.loading = false;
    },
    beforeGetCookDetails(state) {
      state.selectedCook.loading = true;
    },
    getCookDetailsSuccess(state, data) {
      state.selectedCook.dishes = data.dishes;
      state.selectedCook.details = data.cook;
      state.selectedCook.loading = false;
    },
    getCookDetailsFail(state) {
      state.selectedCook.loading = false;
    }
  },
  actions: {
    async getDishes({ commit }) {
      commit('beforeGetDishDetails');
      try {
        const { data } = await axios.get(`${hostPath}getdishes`);
        commit('setDishesSuccess', data);
      } catch (err) {
        commit('setDishesFail');
      }
    },
    async getDishDetails({ commit }, { cookId, dishId }) {
      commit('beforeSetDishes');
      try {
        const params = { cookid: cookId, dishid: dishId };
        const { data } = await axios.get(`${hostPath}getdishdetails`, {
          params
        });
        commit('getDishDetailsSuccess', data);
      } catch (err) {
        commit('getDishDetailsFail');
      }
    },
    async getCookDetails({ commit }, { cookId }) {
      commit('beforeGetCookDetails');
      try {
        const params = { cookid: cookId };
        const { data } = await axios.get(`${hostPath}getcookdetails`, {
          params
        });
        commit('getCookDetailsSuccess', data);
      } catch (err) {
        commit('getCookDetailsFail');
      }
    }
  }
});
