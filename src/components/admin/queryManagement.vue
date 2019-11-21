<template>
  <div class="grey lighten-5 pa-4">
    <v-card-title>Pending Query</v-card-title>
    <v-card
      v-for="(item,i) in items"
      :key="i"
      width="85%"
      min-height="20px"
      class="mt-3 px-3"
      style="margin-left: auto; margin-right: auto; padding: 20px;"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-flex xs10>
            <v-list-item-title class="subtitle mb-2">
              <v-icon :color="item.color">{{item.status}}</v-icon>
              <span>{{item.query}}</span>
            </v-list-item-title>
          </v-flex>
          <v-flex xs2>
            <div class="flex-grow-1"></div>
            <v-icon style="margin-left:10px" @click="showQuery">mdi-send</v-icon>
          </v-flex>

          <v-flex xs3>
            <v-list-item-action-text>Date</v-list-item-action-text>
          </v-flex>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </div>
</template>
<script>
export default {
  data: () => ({
    items: [
      {
        query: "Lorem Ipsum is simply dummy  text ever since the 1500s,",
        status: "mdi-exclamation",
        color: "yellow"
      },
      {
        query: "Lorem Ipsum is simply dummy  text ever since the 1500s,",
        status: "mdi-check",
        color: "green"
      },
      {
        query: "Lorem Ipsum is simply dummy te",
        status: "mdi-alert-outline",
        color: "red"
      }
    ]
  }),
  methods: {
    showQuery() {
      this.$store.commit("adminModule/showQueryDialog", {});
    }
  }
};
</script>