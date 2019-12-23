<template>
  <v-window v-model="queryModel" reverse class="mb-4" dark>
    <v-window-item key="queryList">
      <UserQueryList :queryList="queryList" @queryItemClicked="queryItemClicked"></UserQueryList>
    </v-window-item>
    <v-window-item key="queryDescription">
      <QueryDescription
        :selectedQueryItem="selectedQueryItem"
        :objIndex="selectedIndex"
        @backToList="backToList"
        @newMessageAdded="newMessageAdded"
      />
    </v-window-item>
  </v-window>
</template>
<script>
import UserQueryList from "@/components/core/UserQueryList";
import QueryDescription from "@/components/core/QueryDescription";
export default {
  name: "QueryWindowWrapper",
  data() {
    return {
      queryModel: 0,
      selectedQueryItem: undefined,
      selectedIndex: undefined,
      queryList: undefined
    };
  },
  components: {
    UserQueryList,
    QueryDescription
  },
  computed: {
    userId() {
      return this.$store.getters["userModule/getSavedUserObjectId"];
    }
  },
  beforeMount() {
    console.log(this.userId);
    let data = {
      payload: {
        creater_id: this.userId
      }
    };
    this.$store
      .dispatch("userModule/getAllUserQueries", data)
      .then(response => {
        this.queryList = response.result;
      });
  },
  methods: {
    queryItemClicked(data) {
      this.queryModel = 1;
      this.selectedQueryItem = JSON.parse(JSON.stringify(data.messageObj));
      this.selectedIndex = data.messageIndex;
    },
    backToList(item) {
      this.queryModel = 0;
    },
    newMessageAdded(messageObj) {
      this.queryList[this.selectedIndex] = this.selectedQueryItem.message.push(
        messageObj.messageObj
      );
    }
  }
};
</script>

<style >
</style>