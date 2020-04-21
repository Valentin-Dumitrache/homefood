<template>
  <v-content>
    <circle2 v-if="isLoading" class="spinner" size="60px" />
    <router-link :to="{ name: 'dishList' }">
      <back-button />
    </router-link>
    <dish-card
      :image-source="dishPictures"
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
</template>

<script>
import DishCard from '../components/dish-card';
import BackButton from '../components/back-button';
import icons from '../mixins/icons/icons';
import axios from 'axios';
import Circle2 from 'vue-loading-spinner/src/components/Circle2';
import images from '../mixins/images';

export default {
  name: 'dish',
  components: { BackButton, DishCard, Circle2 },
  data() {
    return {
      dish: [],
      cook: [],
      ingredients: [],
      extraPictures: [],
      isLoading: true
    };
  },
  mixins: [icons, images],
  async created() {
    try {
      let response = await axios.get(
        `https://homefood-app.herokuapp.com/getDishForCook?id=${this.$route.params.id}`
      );
      this.dish = response.data[0];
      this.cook = response.data[1];
      response = await axios.get(
        `https://homefood-app.herokuapp.com/getDishIngredients?id=${this.$route.params.id}`
      );
      for (let i of response.data) {
        this.ingredients.push(i.ingredientName);
      }
      response = await axios.get(
        `https://homefood-app.herokuapp.com/getDishPictures?id=${this.$route.params.id}`
      );
      for (let i of response.data) {
        this.extraPictures.push(i.pictureName);
      }
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    dishPictures() {
      let picturesArray = [];
      picturesArray.push(this.getPicture(this.dish.imageSource));
      for (let i of this.extraPictures) {
        picturesArray.push(i);
      }
      return picturesArray;
    }
  }
};
</script>
<style scoped lang="scss">
.v-chip:before {
  background-color: initial;
}
</style>
