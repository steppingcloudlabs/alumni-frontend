<template>
  <v-layout row wrap class="ma-0 pa-0">
    <v-flex xs12>
      <v-card outlined class="mx-auto" style="border-radius: 0px;">
        <v-list shaped>
          <v-list-item-group v-model="selectedQuery" color="primary">
            <v-list-item
              two-line
              v-for="(item, i) in queryList"
              :key="i"
              @click="queryItemClicked(item, i)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle style="font-size:12px" v-text="item.created_at"></v-list-item-subtitle>
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