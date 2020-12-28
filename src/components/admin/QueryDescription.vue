<template>
  <v-layout row wrap>
    <v-flex>
      <v-card class="mx-auto" rounded>
        <v-toolbar fixed class="mb-3">
          <v-toolbar-title class="ml-5">
            <span class="mr-5">
              <i
                class="fas fa-arrow-left"
                style="cursor: pointer"
                @click="backToList"
              ></i>
            </span>
            <span>{{ selectedQueryItem.TITLE }}</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-layout
          row
          wrap
          style="overflow: auto; max-height: 400px"
          id="queryContainer"
        >
          <v-flex xs12>
            <v-timeline dense class="pr-5">
              <v-timeline-item
                v-for="(item, k) in messages"
                :key="k"
                large
                fill-dot
              >
                <template v-slot:icon>
                  <v-avatar >
                    <span class="white--text title">{{
                      item.USERTYPE== "admin"
                        ? "Y"
                        : "U"
                       
                    }}</span>
                  </v-avatar>
                </template>
                <v-card class="elevation-2" v-if="item.USERTYPE=='admin'" style="text-align:right">
                  <v-card-title class="headline" style="text-align:right">{{item.USERTYPE=='admin'? "You":"User" }}</v-card-title>
                  <v-card-text>{{ item.MESSAGE }}</v-card-text>
                </v-card>
                  <v-card class="elevation-2" v-else>
                  <v-card-title class="headline">{{item.USERTYPE=='admin'? "You":"User" }}</v-card-title>
                  <v-card-text>{{ item.MESSAGE }}</v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-flex>
          

          
        </v-layout>
        <v-toolbar class="mb-3">
          <v-layout row wrap class="add-comment-wrapper" align-center>
            <v-flex xs1>
              <v-btn rounded fab small text color="primary">
                <i class="fas fa-paperclip attachment-icon"></i>
              </v-btn>
            </v-flex>
            <v-flex xs11>
              <v-text-field
                v-model="addComment"
                label="Add Comment"
                append-icon="send"
                single-line
                @click:append="updateMessage"
                @keyup.enter="updateMessage"
                solo
                rounded
              ></v-text-field>
            </v-flex>
          </v-layout>
        </v-toolbar>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  name: "QueryDescription",
  data() {
    return {
      addComment: "",
     
    };
  },
  props: {
    selectedQueryItem: {
      type: Object,
      default: undefined,
    },
    objIndex: {
      type: Number,
      default: undefined,
    },
    messages:{
      type:Array,
      default:[]
    }
  },
  beforeMount() {
  //  this.getAllMessages();
  console.log(this.userType)
  },
  mounted()
  {
 //this.getAllMessages();
  },
  destroyed() {
    //this.messages = [];
  },
  methods: {
    // getAllMessages() {
    //   let message = {
    //     payload: {
    //       TICKETID: this.selectedQueryItem.ID,
    //     },
    //   };
    //   this.$store
    //     .dispatch("userModule/getQueryMessage", message)
    //     .then((response) => {
    //       if (response.status == 200) {
    //         this.messages = response.result;
    //       }
    //     });
    //   this.addComment = "";
    // },
    backToList() {
     
      this.$emit("backToList", {});
    },
    updateMessage() {
      let vm = this;
      let message = {
        payload: {
          USERTYPE:"admin",
          // created_at: "",use
          MESSAGE: this.addComment,
          TICKETID: this.selectedQueryItem.ID,
        },
      };
      let newmsg = {
        CREATEDAT: moment.unix(),
        CREATEDBY: "admin",
        MODIFIEDAT: moment.unix(),
        MODIFIEDBY: "admin",
        ID: this.selectedQueryItem.ID,
        USERTYPE: "admin",
        MESSAGE: this.addComment,
        TICKETID: this.selectedQueryItem.ID,
      };

      this.$store
        .dispatch("adminModule/postQueryMessage", message)
        .then((response) => {
          if (response.status == 200) {
            vm.messages.push(newmsg);
            this.$emit("newMessageAdded", {
              objIndex: this.objIndex,
              messageObj: message.payload,
            });
          }
        });
      this.addComment = "";
    },
  },
  computed: {
   userId() {
      return this.$store.getters["userModule/getSavedUserObjectId"];
    },
    userType() {
      return sessionStorage.getItem("Type");
    },
     Type() {
      return sessionStorage.getItem("userType");
    },
  },
};
</script>

<style >
.attachment-icon {
  font-size: 20px;
  transform: rotate(-43deg);
}
.add-comment-wrapper .v-input__slot {
  margin: 0;
}
.add-comment-wrapper .v-text-field__details {
  display: none;
}
</style>