<template>
  <v-layout row wrap>
    <v-flex>
      <v-card class="mx-auto" max-height="400px" style="overflow: auto">
        <v-toolbar fixed>
          <v-toolbar-title class="ml-5">
            <span class="mr-5">
              <i class="fas fa-arrow-left" style="cursor:pointer" @click="backToList"></i>
            </span>
            <span>{{selectedQueryItem.querySubject}}</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-timeline dense class="pr-5">
          <v-timeline-item v-for="n in 4" :key="n" large>
            <template v-slot:icon>
              <v-avatar>
                <img src="http://i.pravatar.cc/64" />
              </v-avatar>
            </template>
            <v-card class="elevation-2">
              <v-card-title class="headline">Lorem ipsum</v-card-title>
              <v-card-text>Lorem ipsum dolor sit amet, no nam oblique veritus. Commune scaevola imperdiet nec ut, sed euismod convenire principes at. Est et nobis iisque percipit, an vim zril disputando voluptatibus, vix an salutandi sententiae.</v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "QueryDescription",
  data() {
    return {};
  },
  props: {
    selectedQueryItem: {
      type: Object,
      default: {}
    }
  },
  methods: {
    backToList() {
      this.$emit("backToList", {});
    }
  }
};
</script>