<template>
  <v-layout row wrap>
    <v-flex xs12>
      <v-card class="mx-auto">
        <v-toolbar>
          <v-toolbar-title class="ml-5">User Queries</v-toolbar-title>
        </v-toolbar>
        <v-list shaped>
          <v-list-item-group v-model="selectedQuery" color="primary">
            <v-list-item
              two-line
              v-for="(item, i) in queryList"
              :key="i"
              @click="queryItemClicked(item)"
            >
              <v-list-item-content>
                <v-list-item-title v-text="item.querySubject"></v-list-item-title>
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
      queryList: [
        {
          id: "1",
          querySubject: "Unable to Login",
          queryDescription: "I am unable to login. Kindly do the needful",
          lastUpdated: "10/25/2019"
        },
        {
          id: "1",
          querySubject: "Connection Problem",
          queryDescription:
            "I am facing connection prblem. Kindly do the needful",
          lastUpdated: "10/25/2019"
        },
        {
          id: "1",
          querySubject: "Failed to Register",
          queryDescription: "I am unable to register. Kindly do the needful",
          lastUpdated: "10/25/2019"
        }
      ],
      selectedQuery: {}
    };
  },
  computed: {
    userId() {
      return this.$store.getters["userModule/getUserData"]._id;
    }
  },
  beforeMount() {
    let data = {
      payload: {
        creater_id: this.userId
      }
    };
    this.$store
      .dispatch("userModule/getAllUserQueries", data)
      .then(response => {
        this.queryList = response.result;
        console.log(response);
      });
  },
  methods: {
    queryItemClicked(item) {
      this.$emit("queryItemClicked", item);
    }
  }
};
</script>

<style>
</style>