<template>
  <v-app-bar app flat>
    <router-link :to="{ name: 'home' }" tag="div">
      <p class="title primary--text pt-4">homefood</p>
    </router-link>
    <v-spacer />
    <div v-if="isHomePath">
      <router-link v-if="loggedIn" tag="div">
        <v-btn color="primary" small outlined class="mr-7">
          Add dish
        </v-btn>
      </router-link>
      <router-link v-else tag="div">
        <v-btn color="primary" small outlined class="mr-7">
          Become a cook
        </v-btn>
      </router-link>
    </div>
    <router-link v-if="loggedIn" tag="div">
      <v-icon x-large>mdi-account-circle</v-icon>
    </router-link>
    <router-link
      v-else
      class="subtitle-1 secondary--text font-weight-regular"
      tag="div"
      :to="{ name: 'login' }"
    >
      Log in
    </router-link>
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
