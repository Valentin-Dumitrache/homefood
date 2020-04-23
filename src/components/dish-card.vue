<template>
  <v-card class="align-end">
    <v-carousel v-if="isDishRoute" cycle :show-arrows="false" height="300px">
      <v-carousel-item
        v-for="picture in pictures"
        :src="getPicture(picture)"
        :key="picture"
      ></v-carousel-item>
    </v-carousel>
    <v-img
      v-else
      class="white--text align-center"
      :src="getPicture(mainPicture)"
      height="280"
    >
      <v-chip
        label
        class="py-1 px-2 mb-12 mx-auto subtitle-2 accent--text elevation-4 d-table"
        text-color="secondary"
        color="rgb(0, 0, 0, 0.6)"
      >
        {{ name }}
      </v-chip>
    </v-img>
    <v-toolbar dense>
      <v-toolbar-title class="subtitle-1">
        {{ price | formatPrice }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon v-if="false">
        <v-icon color="secondary">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon v-if="false">
        <v-icon color="secondary">mdi-heart</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import images from '../mixins/images';

export default {
  props: {
    mainPicture: String,
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    pictures: Array
  },
  mixins: [images],
  computed: {
    isDishRoute() {
      return this.$route.name === 'dish';
    }
  }
};
</script>
