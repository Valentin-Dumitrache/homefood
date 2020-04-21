export default {
  methods: {
    getPicture(picture) {
      if (picture) {
        return picture;
      } else {
        return 'https://homefood-bucket.s3.eu-central-1.amazonaws.com/default.png';
      }
    }
  }
};
