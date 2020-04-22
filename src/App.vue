<template>
  <div id="app">
    <v-app>
      <app-header />
      <router-view />
    </v-app>
  </div>
</template>

<script>
import AppHeader from '@/components/app-header';
import storeModule from '@/store/index';

export default {
  storeModule,
  components: { AppHeader }
};
</script>

<style lang="scss">
#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  .v-chip:before {
    background-color: initial;
  }
}
</style>
