import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

Vue.filter('formatPrice', value => `${value} RON`);
Vue.filter('formatLocation', (value1, value2) =>
  value1 === value2 || !value2 ? value1 : `${value1}, ${value2}`
);
Vue.filter('formatName', (value1, value2) => `${value1} ${value2}`);
Vue.filter('formatDelivery', value => (value ? 'Cu livrare' : 'Fara Livrare'));

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app');
