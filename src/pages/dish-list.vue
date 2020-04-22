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
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      class="spinner"
      :size="50"
      color="primary"
    />
    <v-container v-else class="pa-0">
      <dish-carousel :dishes="dishes" />
    </v-container>
  </v-content>
</template>
<script>
import DishCarousel from '@/components/dish-carousel';

export default {
  components: { DishCarousel },
  data() {
    return {
      dishes: [],
      isLoading: false
    };
  },
  async created() {
    this.toggleIsLoading();
    await this.$store
      .dispatch('getDishes')
      .then(() => {
        this.dishes = this.$store.state.dishes;
      })
      .finally(() => {
        this.toggleIsLoading();
      });
  },
  methods: {
    toggleIsLoading() {
      this.isLoading = !this.isLoading;
    }
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
