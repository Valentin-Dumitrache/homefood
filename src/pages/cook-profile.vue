<template>
  <v-content v-if="isSelectedCookLoading">
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
    <edit-button />
    <div>
      <v-img
        :src="getPicture(selectedCookDetails.coverPicture)"
        height="150px"
      />
      <div class="avatar">
        <v-avatar size="100px" color="white">
          <v-img :src="getPicture(selectedCookDetails.profilePicture)" />
        </v-avatar>
      </div>
    </div>
    <v-container>
      <p class="mx-auto title mt-12 d-table mb-2" color="secondary">
        {{
          selectedCookDetails.firstName
            | formatName(selectedCookDetails.lastName)
        }}
      </p>
      <p class="mx-auto subtitle-1 d-table mb-0" color="secondary">
        {{
          selectedCookDetails.city | formatLocation(selectedCookDetails.county)
        }}
      </p>
      <p class="mx-auto subtitle-1 d-table" color="secondary">
        {{ selectedCookDetails.delivery | formatDelivery }}
      </p>
      <p class="subtitle-2" color="secondary">
        {{ selectedCookDetails.description }}
      </p>
    </v-container>
    <dish-carousel :dishes="selectedCookDishes" />
  </v-content>
</template>

<script>
import BackButton from '../components/back-button';
import EditButton from '../components/edit-button';
import DishCarousel from '@/components/dish-carousel';
import images from '../mixins/images';
import { mapActions, mapGetters } from 'vuex';

export default {
  components: { BackButton, EditButton, DishCarousel },
  mixins: [images],
  computed: {
    ...mapGetters([
      'isSelectedCookLoading',
      'selectedCookDetails',
      'selectedCookDishes'
    ])
  },
  async mounted() {
    await this.getCookDetails({ cookId: this.$route.params.id });
  },
  methods: {
    ...mapActions(['getCookDetails'])
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
