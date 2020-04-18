<template>
  <v-content class="pa-0 zi-0">
    <v-container class="fill-height pa-0" fluid>
      <v-row align="center" justify="center" class="mx-auto">
        <v-col class="pa-0 mx-auto">
          <v-chip
            label
            class="py-1 px-2 mb-12 mx-auto subtitle-2 accent--text elevation-4 d-table"
            text-color="secondary"
            color="rgb(0, 0, 0, 0.6)"
          >
            Here you can find the best food
          </v-chip>
          <router-link :to="{ name: 'dishList' }">
            <v-btn color="primary" small rounded class="mx-auto d-block mb-9">
              See dishes
            </v-btn>
          </router-link>
          <router-link :to="{ name: 'signUp' }">
            <v-btn color="primary" small rounded class="mx-auto d-block">
              Become a cook
            </v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-container>
    <v-carousel
      cycle
      hide-delimiters
      :show-arrows="false"
      class="carousel"
      height="100%"
    >
      <v-carousel-item
        src="https://img.theculturetrip.com/1440x807/smart/wp-content/uploads/2017/03/rsz_1romanian_food.jpg"
      ></v-carousel-item>
      <v-carousel-item
        src="https://n8h7m9s3.stackpathcdn.com/wp-content/uploads/2017/10/mancare-romaneasca.jpg"
      ></v-carousel-item>
    </v-carousel>
  </v-content>
</template>

<style scoped lang="scss">
.carousel {
  position: absolute;
  top: 0;
  z-index: -1;
}
.zi-0 {
  z-index: 0;
}
</style>
