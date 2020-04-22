<template>
  <v-content v-if="isSelectedDishesLoading">
    <v-progress-circular
      indeterminate
      class="spinner"
      :size="50"
      color="primary"
    />
    <back-button @click="$router.go(-1)" />
  </v-content>
  <v-content v-else>
    <back-button @click="$router.go(-1)" />
    <dish-card
      :pictures="selectedDishPictures"
      :name="selectedDishDetails.name"
      :price="selectedDishDetails.price"
    >
    </dish-card>
    <v-container class="mt-3">
      <v-row>
        <v-chip
          v-for="label in selectedDishDetails.labels"
          :label="true"
          :key="label"
          class="ml-3 elevation-4 text-capitalize"
          text-color="secondary"
          color="white"
        >
          <v-icon class="pr-2" color="secondary">{{ getIcon(label) }}</v-icon>
          {{ label }}
        </v-chip>
      </v-row>
    </v-container>
    <v-container>
      <p class="ma-0">
        {{ selectedDishDetails.description }}
      </p>
    </v-container>
    <v-container class="pt-0">
      <v-row>
        <v-chip
          v-for="ingredient in selectedDishIngredients"
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
          <p>{{ `Pret/Portie ${selectedDishDetails.price}` | formatPrice }}</p>
          <p>{{ selectedDishCook.delivery | formatDelivery }}</p>
          <p>
            {{
              selectedDishCook.firstName | formatName(selectedDishCook.lastName)
            }}
          </p>
          <p>
            {{
              selectedDishCook.city | formatLocation(selectedDishCook.county)
            }}
          </p>
        </v-col>
        <router-link
          :to="{
            name: 'profile',
            params: {
              id: selectedDishCook.id,
              previousDish: selectedDishDetails.id
            }
          }"
          tag="div"
        >
          <v-col>
            <v-avatar size="150px">
              <v-img :src="getPicture(selectedDishCook.profilePicture)"></v-img>
            </v-avatar>
          </v-col>
        </router-link>
      </v-row>
    </v-container>
  </v-content>
</template>

<script>
import DishCard from '../components/dish-card';
import BackButton from '../components/back-button';
import icons from '../mixins/icons/icons';
import images from '../mixins/images';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { BackButton, DishCard },
  computed: {
    ...mapGetters([
      'selectedDishPictures',
      'isSelectedDishesLoading',
      'selectedDishDetails',
      'selectedDishCook',
      'selectedDishIngredients'
    ])
  },
  mixins: [icons, images],
  async mounted() {
    await this.getDishDetails({ cookId: '1a', dishId: '1a' });
  },
  methods: {
    ...mapActions(['getDishDetails'])
  }
};
</script>
<style scoped lang="scss">
.v-chip:before {
  background-color: initial;
}
</style>
