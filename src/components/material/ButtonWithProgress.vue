<template>
  <v-btn class="button" color="primary" :disabled="progress" dark @click="clicked">
    <v-progress-circular
      v-if="progress"
      v-model="progress"
      :size="30"
      :width="4"
      indeterminate
      color="white"
    ></v-progress-circular>

    <slot v-else>Click Me</slot>
  </v-btn>
</template>

<script>
export default {
  props: {
    progress: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    clicked() {
      this.$emit("clicked");
    }
  }
};
</script>