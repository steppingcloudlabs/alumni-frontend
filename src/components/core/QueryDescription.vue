<template>
  <v-layout row wrap>
    <v-flex>
      <v-card class="mx-auto" rounded>
        <v-toolbar fixed class="mb-3">
          <v-toolbar-title class="ml-5">
            <span class="mr-5">
              <i class="fas fa-arrow-left" style="cursor:pointer" @click="backToList"></i>
            </span>
            <span>{{selectedQueryItem.title}}</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-layout row wrap style="overflow: auto; max-height:400px" id="queryContainer">
          <v-flex xs12>
            <v-timeline dense class="pr-5">
              <v-timeline-item
                v-for="(item, k) in selectedQueryItem.message"
                :key="item.senders + k"
                large
                fill-dot
              >
                <template v-slot:icon>
                  <v-avatar>
                    <span
                      class="white--text title"
                    >{{ currentUserId == item.senders ? "Y" : userType == "adab7b701f23bb82014c8506d3dc784e" ? "U" : "A" }}</span>
                  </v-avatar>
                </template>
                <v-card class="elevation-2">
                  <v-card-title
                    class="headline"
                  >{{currentUserId == item.senders ? "You" : userType == "adab7b701f23bb82014c8506d3dc784e" ? "User" : "Admin" }}</v-card-title>
                  <v-card-text>{{item.message}}</v-card-text>
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
export default {
  name: "QueryDescription",
  data() {
    return {
      addComment: ""
    };
  },
  props: {
    selectedQueryItem: {
      type: Object,
      default: undefined
    },
    objIndex: {
      type: Number,
      default: undefined
    }
  },
  methods: {
    backToList() {
      this.$emit("backToList", {});
    },
    updateMessage() {
      let message = {
        payload: {
          senders: this.currentUserId,
          // created_at: "",use
          message: this.addComment,
          ticket_id: this.selectedQueryItem._id
        }
      };
      this.$store
        .dispatch("userModule/postQueryMessage", message)
        .then(response => {
          if (response.status == 200) {
            this.$emit("newMessageAdded", {
              objIndex: this.objIndex,
              messageObj: message.payload
            });
          }
        });
      this.addComment = "";
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters["userModule/getUserData"]._id;
    },
    userType() {
      return sessionStorage.getItem("Type");
    }
  }
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