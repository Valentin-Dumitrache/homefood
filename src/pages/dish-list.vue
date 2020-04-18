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
      <dish-carousel :dishes="dishList" />
    </v-container>
  </v-content>
</template>
<script>
import DishCarousel from '@/components/dish-carousel';
import dishes from '@/mocks/dishes.js';

export default {
  components: { DishCarousel },
  computed: {
    dishList() {
      return dishes;
    }
  }
};
</script>
