<template>
  <v-content>
    <v-toolbar v-if="false">
      <v-input color="secondary">
        <v-text-field
          class="mt-12 pe-5"
          background-color="accent"
          dense
          outlined
          rounded
          placeholder="Cauta..."
          prepend-inner-icon="mdi-magnify"
          color="secondary"
        >
        </v-text-field>
      </v-input>
      <v-btn small>
        Filtre
      </v-btn>
    </v-toolbar>
    <v-container class="pa-0">
      <v-progress-circular
        v-if="isDishesLoading"
        indeterminate
        class="spinner"
        :size="50"
        color="primary"
      />
      <v-container v-else>
        <p class="mx-auto mt-5 mb-6 d-table title">Cele mai populare</p>
        <dish-carousel :dishes="popularDishes" />
        <p class="mx-auto mt-5 mb-6 d-table title">Toate mancarurile</p>
        <dish-carousel :dishes="restOfDishes" />
      </v-container>
    </v-container>
  </v-content>
</template>
<script>
import DishCarousel from '@/components/dish-carousel';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { DishCarousel },
  computed: {
    ...mapGetters(['isDishesLoading', 'dishes']),
    popularDishes() {
      return this.dishes.filter(({ section }) => section === 'popular');
    },
    restOfDishes() {
      return this.dishes.filter(({ section }) => section !== 'popular');
    }
  },
  async mounted() {
    await this.getDishes();
  },
  methods: {
    ...mapActions(['getDishes'])
  }
};
</script>
<style lang="scss">
.spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -25px 0 0 -25px;
}
</style>
