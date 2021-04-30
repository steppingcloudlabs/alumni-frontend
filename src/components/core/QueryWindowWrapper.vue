<template>
  <v-layout row wrap class="ma-0 pa-0">
    <v-flex xs12>
      <v-window v-model="queryModel" reverse>
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
      <Contact
        :dialog="dialog"
        :Showemail="emailDailog"
        @closeAskHrDialog="closeAskHrDialog"
        @updateQueryList="getQueryList"
      />
    </v-flex>
    <v-tooltip top>
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
    </v-tooltip>
  </v-layout>
</template>
<script>
import UserQueryList from "@/components/core/UserQueryList";
import QueryDescription from "@/components/core/QueryDescription";
import Contact from "@/components/core/contactHR";
import { getObjectId, getAlumniId, addTokenToPayload } from "@/utils/utils";
//import chatbot from "@/utils/chatbot.js"

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
      messages: [],
    };
  },
  //  watch:
  // {
  //   selectedQueryItem()
  //   {
  //        this.selectedQueryItem.RESOLVED=JSON.parse(JSON.stringify(this.selectedQueryItem))
  //        this.queryList[this.selectedIndex]=this.selectedQueryItem
  //         this.queryList=JSON.parse(JSON.stringify(this.queryList))
  //   }
  // },
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

  beforeDestroy() {
    // const recaptchaScripts = document.querySelectorAll(
    //   'script[src^="https://cdn.cai.tools.sap/webchat/webchat.js"]'
    // );
    // for (let i = 0; i < recaptchaScripts.length; i += 1) {
    //     recaptchaScripts[i].parentElement.removeChild(recaptchaScripts[i]);
    // }
    // let elem=document.getElementById("cai-webchat-div")
    // elem.style.visibility="Hidden"
   // document.removeChild(recaptchaScripts[0]);
  },

  mounted() {
    let tok = [];
    addTokenToPayload(tok);
    //window.sapcai = {};
    //window.sapcai.webclientBridge = {};
    window.webchatMethods = {
      getMemory: (conversationId) => {
        const memory = { userId: getAlumniId(), token: "Bearer " + tok.token };
        return { memory, merge: true };
      },
    };
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
        .dispatch("userModule/getQueryMessage", message)
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
        .dispatch("userModule/getAllUserQueries", data)
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
      this.getAllMessages(this.selectedQueryItem.ID);
      this.selectedIndex = data.messageIndex;
    },
    backToList(item) {
      this.queryModel = 0;
      this.queryList[this.selectedIndex]=this.selectedQueryItem
      this.queryList=JSON.parse(JSON.stringify(this.queryList))

    },
    newMessageAdded(messageObj) {
      console.log("messageadded");
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