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
      <v-progress-circular
        v-if="isDishesLoading"
        indeterminate
        class="spinner"
        :size="50"
        color="primary"
      />
      <dish-carousel v-else :dishes="dishes" />
    </v-container>
  </v-content>
</template>
<script>
import DishCarousel from '@/components/dish-carousel';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { DishCarousel },
  computed: {
    ...mapGetters(['isDishesLoading', 'dishes'])
  },
  async created() {
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
