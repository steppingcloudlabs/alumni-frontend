<template>
  <v-layout row wrap class="ma-0 pa-0">
    <v-flex xs12>
      <v-window v-model="queryModel" reverse >
        <v-window-item key="queryList">
          <UserQueryList
            :queryList="queryList"
            @queryItemClicked="queryItemClicked"
          ></UserQueryList>
        </v-window-item>
        <v-window-item key="queryDescription">
          <QueryDescription
            :selectedQueryItem="selectedQueryItem"
            :objIndex="selectedIndex"
            :messages="messages"
            @backToList="backToList"
            @newMessageAdded="newMessageAdded"
             @updateStatus="updateStatus"
          />
        </v-window-item>
      </v-window>
    </v-flex>
    <v-flex xs12>
      <!-- <Contact
        :dialog="dialog"
        :Showemail="emailDailog"
        @closeAskHrDialog="closeAskHrDialog"
        @updateQueryList="getQueryList"
      /> -->
    </v-flex>
    <!-- <v-tooltip top>
      <template v-slot:activator="{}">
        <v-btn
          @click="dialog = true"
          style="position: fixed; bottom: 20px"
          large
          absolute
          dark
          fab
          float
          right
          bottom
          color="blue"
          class="mb-5"
        >
          <v-icon>mdi-wechat</v-icon>
        </v-btn>
      </template>
      <span>Raise Concern</span>
    </v-tooltip> -->
  </v-layout>
</template>
<script>
import UserQueryList from "@/components/admin/UserQueryList";
import QueryDescription from "@/components/admin/QueryDescription";
import Contact from "@/components/core/contactHR";
import { getObjectId, getAlumniId } from "@/utils/utils";

export default {
  name: "QueryWindowWrapper",
  data() {
    return {
      queryModel: 0,
      selectedQueryItem: undefined,
      selectedIndex: undefined,
      queryList: [],
      dialog: false,
      emailDailog: false,
      messages:[]
    };
  },
  components: {
    UserQueryList,
    QueryDescription,
    Contact,
  },
  computed: {
    userId() {
      return this.$store.getters["userModule/getSavedUserObjectId"];
    },
  },
  beforeMount() {
    this.getQueryList();
  },
  methods: {
    updateStatus(data)
    {
       this.selectedQueryItem=JSON.parse(JSON.stringify(data))
        this.getQueryList();
  
    },
    getAllMessages(id) {
      let message = {
        payload: {
          TICKETID: id,
        },
      };
      this.$store
        .dispatch("adminModule/getQueryMessage", message)
        .then((response) => {
          if (response.status == 200) {
            this.messages = response.result;
          }
        });
      this.addComment = "";
    },
    getQueryList() {
      let data = {
        payload: {
          USERID: getAlumniId(),
        },
      };
      this.$store
        .dispatch("adminModule/getAllUserQueries", data)
        .then((response) => {
          this.queryList = response.result;
        });
    },
    closeAskHrDialog() {
      this.dialog = false;
    },
    queryItemClicked(data) {
      this.queryModel = 1;

      this.selectedQueryItem = JSON.parse(JSON.stringify(data.messageObj));
      this.getAllMessages(this.selectedQueryItem.ID)
      this.selectedIndex = data.messageIndex;
      
    },
    backToList(item) {
      this.queryModel = 0;
    },
    newMessageAdded(messageObj) {
      console.log("messageadded")
    //  this.queryList[this.selectedIndex] = this.selectedQueryItem.message.push(
     //   messageObj.messageObj
     // );
      this.$nextTick(() => {
        this.scrollBottom();
      });
    },
    scrollBottom() {
      let container = this.$el.querySelector("#queryContainer");
      if (container) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
};
</script>

<style >
</style>