<template>
  <v-content>
    <v-toolbar>
      <v-input color="secondary">
        <v-text-field
          class="mt-12 pe-5"
          background-color="accent"
          dense
          outlined
          rounded
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
          color="secondary"
        >
        </v-text-field>
      </v-input>
      <v-btn small>
        Filter
      </v-btn>
    </v-toolbar>
    <v-container class="pa-0">
      <circle2 v-if="isLoading" class="spinner" size="60px" />
      <dish-carousel v-else :dishes="dishes" />
    </v-container>
  </v-content>
</template>
<script>
import DishCarousel from '@/components/dish-carousel';
import axios from 'axios';
import Circle2 from 'vue-loading-spinner/src/components/Circle2';

export default {
  components: { DishCarousel, Circle2 },
  data() {
    return {
      dishes: [],
      isLoading: true
    };
  },
  async created() {
    try {
      const response = await axios.get(
        `https://homefood-app.herokuapp.com/getDishes`
      );
      this.dishes = response.data;
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>
<style lang="scss">
.spinner {
  border-color: #e65100 #e65100 #ffffff !important;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
}
</style>
