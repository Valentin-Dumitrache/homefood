<template>
  <v-content>
    <router-link :to="{ name: 'dishList' }">
      <back-button />
    </router-link>
    <dish-card
      :image-source="dish.imageSource"
      :name="dish.name"
      :price="dish.price"
    >
    </dish-card>
    <v-container class="mt-3">
      <v-row>
        <v-chip
          v-for="label in dish.labels"
          :label="true"
          :key="label"
          :label-type="label"
          class="ml-3 elevation-4 text-capitalize"
          text-color="secondary"
          color="white"
        >
          <v-icon class="pr-2" color="secondary"> {{ getIcon(label) }}</v-icon>
          {{ label }}
        </v-chip>
      </v-row>
    </v-container>
    <v-container>
      <p class="ma-0">
        {{ dish.description }}
      </p>
    </v-container>
    <v-container class="pt-0">
      <v-row>
        <v-chip
          v-for="ingredient in dish.ingredients"
          :key="ingredient"
          label
          class="mt-4 ml-3 elevation-4"
          text-color="secondary"
          color="white"
          small
        >
          {{ ingredient.toUpperCase() }}
        </v-chip>
      </v-row>
    </v-container>
    <v-container>
      <v-row class="caption">
        <v-col>
          <p>{{ `Pret/Portie ${dish.price}` | formatPrice }}</p>
          <p>{{ cook.delivery | formatDelivery }}</p>
          <p>{{ cookName }}</p>
          <p>{{ cook.city | formatLocation(cook.county) }}</p>
        </v-col>
        <router-link
          :to="{
            name: 'profile',
            params: { id: cook.id, previousDish: dish.id }
          }"
          tag="div"
        >
          <v-col>
            <v-icon size="150px">
              mdi-account-circle
            </v-icon>
          </v-col>
        </router-link>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import DishCard from '../components/dish-card';
import dishes from '@/mocks/dishes.js';
import cook from '@/mocks/cooks.js';
import BackButton from '../components/back-button';
import icons from '../mixins/icons/icons';

export default {
  name: 'dish',
  components: { BackButton, DishCard },
  mixins: [icons],
  computed: {
    dish() {
      return dishes.find(({ id }) => id === parseInt(this.$route.params.id));
    },
    cook() {
      return cook.find(({ id }) => id === parseInt(this.dish.cookId));
    },
    cookName() {
      return `${this.cook.firstName} ${this.cook.lastName}`;
    }
  }
};
</script>
<style scoped lang="scss">
.v-chip:before {
  background-color: initial;
}
</style>
