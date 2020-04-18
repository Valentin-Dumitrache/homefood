import labelIcons from './labelIcons.json';

export default {
  methods: {
    getIcon(label) {
      return `fas + ${labelIcons[label]}` || null;
    }
  }
};
