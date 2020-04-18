<template>
  <v-content>
    <back-button @click="$router.go(-1)" />
    <edit-button />
    <div>
      <v-img :src="cook.coverPicture" height="150px" />
      <div class="avatar">
        <v-icon v-if="true" size="100px" color="white">
          mdi-account-circle
        </v-icon>
        <v-avatar v-else size="100px" />
      </div>
    </div>
    <v-container>
      <p class="mx-auto title mt-12 d-table mb-2" color="secondary">
        {{ cookName }}
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
    <dish-carousel :dishes="dishList" />
  </v-content>
</template>

<script>
import BackButton from '../components/back-button';
import cooks from '@/mocks/cooks.js';
import dishes from '@/mocks/dishes.js';
import EditButton from '../components/edit-button';
import DishCarousel from '@/components/dish-carousel';

export default {
  components: { BackButton, EditButton, DishCarousel },
  computed: {
    cook() {
      return cooks.find(({ id }) => id === parseInt(this.$route.params.id));
    },
    cookName() {
      return `${this.cook.firstName} ${this.cook.lastName}`;
    },
    dishList() {
      return dishes.find(({ cookId }) => cookId === this.cook.id);
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
