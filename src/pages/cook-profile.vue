<template>
  <v-content>
    <circle2 v-if="isLoading" class="spinner" size="60px"></circle2>
    <back-button @click="$router.go(-1)" />
    <edit-button />
    <div>
      <v-img :src="getPicture(cook.coverPicture)" height="150px" />
      <div class="avatar">
        <v-avatar size="100px" color="white">
          <v-img :src="getPicture(cook.profilePicture)" />
        </v-avatar>
      </div>
    </div>
    <v-container>
      <p class="mx-auto title mt-12 d-table mb-2" color="secondary">
        {{ cook.firstName | formatName(cook.lastName) }}
      </p>
      <p class="mx-auto subtitle-1 d-table mb-0" color="secondary">
        {{ cook.city | formatLocation(cook.county) }}
      </p>
      <p class="mx-auto subtitle-1 d-table" color="secondary">
        {{ cook.delivery | formatDelivery }}
      </p>
      <p class="subtitle-2" color="secondary">
        {{ cook.description }}
      </p>
    </v-container>
    <dish-carousel :dishes="dishes" />
  </v-content>
</template>

<script>
import BackButton from '../components/back-button';
import EditButton from '../components/edit-button';
import DishCarousel from '@/components/dish-carousel';
import Circle2 from 'vue-loading-spinner/src/components/Circle2';
import axios from 'axios';
import images from '../mixins/images';

export default {
  components: { BackButton, EditButton, DishCarousel, Circle2 },
  mixins: [images],
  data() {
    return {
      dishes: [],
      cook: [],
      isLoading: true
    };
  },
  // this is not done yet, i'm waiting on feedback on the previous components before going further.
  async created() {
    try {
      let response = await axios.get(
        `https://homefood-app.herokuapp.com/getDishesForCook?id=${this.$route.params.id}`
      );
      let i = 0;
      let arrayLengthMinusOne = response.data.length - 1;
      while (i < arrayLengthMinusOne) {
        this.dishes.push(response.data[i]);
        i++;
      }
      this.cook = response.data[arrayLengthMinusOne];
      this.isLoading = false;
    } catch (e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss">
.avatar {
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
