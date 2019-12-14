<template>
  <v-window v-model="queryModel" reverse class="mb-4" dark>
    <v-window-item key="queryList">
      <UserQueryList @queryItemClicked="queryItemClicked"></UserQueryList>
    </v-window-item>
    <v-window-item key="queryDescription">
      <QueryDescription :selectedQueryItem="selectedQueryItem" @backToList="backToList" />
    </v-window-item>
  </v-window>
</template>
<script>
import UserQueryList from "@/components/core/UserQueryList";
import QueryDescription from "@/components/core/QueryDescription";
export default {
  name: "QueryWindowWrapper",
  data() {
    return { queryModel: 0, selectedQueryItem: {} };
  },
  components: {
    UserQueryList,
    QueryDescription
  },
  methods: {
    queryItemClicked(item) {
      this.queryModel = 1;
      this.selectedQueryItem = item;
    },
    backToList(item) {
      this.queryModel = 0;
    }
  }
};
</script>

<style >
</style>