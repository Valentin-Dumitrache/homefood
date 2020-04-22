<template>
  <div>
    <v-progress-circular
      indeterminate
      class="spinner"
      :size="50"
      color="primary"
      v-if="isLoading"
    />
    <v-content v-else>
      <router-link :to="{ name: 'dishList' }">
        <back-button />
      </router-link>
      <dish-card :pictures="pictures" :name="dish.name" :price="dish.price">
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
            <v-icon class="pr-2" color="secondary">
              {{ getIcon(label) }}</v-icon
            >
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
            v-for="ingredient in ingredients"
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
            <p>{{ cook.firstName | formatName(cook.lastName) }}</p>
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
              <v-avatar size="150px">
                <v-img :src="getPicture(cook.profilePicture)"></v-img>
              </v-avatar>
            </v-col>
          </router-link>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import DishCard from '../components/dish-card';
import BackButton from '../components/back-button';
import icons from '../mixins/icons/icons';
import images from '../mixins/images';

export default {
  components: { BackButton, DishCard },
  data() {
    return {
      dish: [],
      cook: [],
      ingredients: [],
      pictures: [],
      isLoading: false
    };
  },
  mixins: [icons, images],
  async created() {
    this.toggleIsLoading();
    await this.$store
      .dispatch('getDishDetails', {
        // We will modify this when we fix routing, to properly grab the ID of the dish and find the cook id from there
        // Until then it's functional
        cookId: '1a',
        dishId: '1a'
      })
      .then(() => {
        this.dish = this.$store.state.dish;
        this.pictures = this.$store.state.pictures;
        this.ingredients = this.$store.state.ingredients;
        this.cook = this.$store.state.cook;
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
<style scoped lang="scss">
.v-chip:before {
  background-color: initial;
}
</style>
