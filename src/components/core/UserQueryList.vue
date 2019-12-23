<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="mx-auto">
        <v-toolbar>
          <v-toolbar-title class="ml-5">User Queries</v-toolbar-title>
        </v-toolbar>
        <v-list shaped style="max-height: 300px; overflow-y: auto">
          <v-list-item-group v-model="selectedQuery" color="primary">
            <v-list-item
              two-line
              v-for="(item, i) in queryList"
              :key="i"
              @click="queryItemClicked(item, i)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle v-text="item.queryDescription"></v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "UserQueryList",
  data() {
    return {
      selectedQuery: {}
    };
  },
  props: {
    queryList: {
      type: Array,
      default: undefined
    }
  },
  computed: {
    userId() {
      return this.$store.getters["userModule/getSavedUserObjectId"];
    }
  },
  methods: {
    queryItemClicked(item, index) {
      this.$emit("queryItemClicked", { messageObj: item, messageIndex: index });
    }
  }
};
</script>

<style>
</style>