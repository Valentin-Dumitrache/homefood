<template>
  <v-slide-group center-active>
    <v-slide-item
      v-for="dish in dishList"
      :key="dish.id"
      v-slot:default="{ active, toggle }"
    >
      <router-link :to="{ name: 'dish', params: { id: dish.id } }" tag="div">
        <dish-card
          class="dish-card mr-4 mb-2 ml-2"
          :color="active ? 'primary' : 'grey lighten-1'"
          :main-picture="dish.mainPicture"
          :name="dish.name"
          :price="dish.price"
          @click.native="toggle"
        />
      </router-link>
    </v-slide-item>
  </v-slide-group>
</template>

<script>
import DishCard from '@/components/dish-card.vue';

export default {
  components: { DishCard },
  props: {
    dishes: {
      type: [Array, Object],
      required: true
    }
  },
  computed: {
    dishList() {
      if (Array.isArray(this.dishes)) {
        return this.dishes;
      }
      return [this.dishes];
    }
  }
};
</script>

<style lang="scss" scoped>
.dish-card {
  width: 250px;
}
</style>
