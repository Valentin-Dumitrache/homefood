<template>
  <v-app-bar app flat>
    <router-link :to="{ name: 'home' }" tag="div">
      <p class="title primary--text pt-4">homefood</p>
    </router-link>
    <v-spacer />
    <div v-if="isHomePath">
      <v-btn v-if="false" color="primary" small outlined class="mr-7">
        Add dish
      </v-btn>
      <v-btn v-else color="primary" small outlined class="mr-7">
        Become a cook
      </v-btn>
    </div>
    <v-icon x-large v-if="false">mdi-account-circle</v-icon>
    <div v-else class="subtitle-1 secondary--text font-weight-regular">
      Log in
    </div>
  </v-app-bar>
</template>
<script>
export default {
  computed: {
    isHomePath() {
      return this.$route.name !== 'home';
    }
  }
};
</script>
