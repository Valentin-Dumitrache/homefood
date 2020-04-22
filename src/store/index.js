import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const hostPath = 'https://homefood-app.herokuapp.com/';

export default new Vuex.Store({
  state: {
    dishes: {
      loading: true,
      data: []
    },
    selectedCook: {
      loading: true,
      details: null,
      dishes: []
    },
    selectedDish: {
      loading: true,
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
    beforeGetDishes(state) {
      state.dishes.loading = true;
    },
    getDishesSuccess(state, dishes) {
      state.dishes.data = dishes;
      state.dishes.loading = false;
    },
    getDishesFail(state) {
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
      commit('beforeGetDishes');
      try {
        const { data } = await axios.get(`${hostPath}getdishes`);
        commit('getDishesSuccess', data);
      } catch (err) {
        commit('getDishesFail');
      }
    },
    async getDishDetails({ commit }, { cookId, dishId }) {
      commit('beforeGetDishDetails');
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
