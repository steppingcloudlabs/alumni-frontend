<template>
  <v-layout row wrap>
    <v-flex>
      <v-card class="mx-auto">
        <v-toolbar fixed class="mb-3">
          <v-toolbar-title class="ml-5">
            <span class="mr-5">
              <i class="fas fa-arrow-left" style="cursor:pointer" @click="backToList"></i>
            </span>
            <span>{{selectedQueryItem.querySubject}}</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-layout row wrap style="overflow: auto; max-height:400px">
          <v-flex xs12>
            <v-timeline dense class="pr-5">
              <v-timeline-item v-for="item in queryList" :key="item.messageId" large fill-dot>
                <template v-slot:icon>
                  <v-avatar>
                    <span
                      class="white--text title"
                    >{{currentUserId == item.messageFrom ? "Y" : item.responserName.substring(0, 1) }}</span>
                  </v-avatar>
                </template>
                <v-card class="elevation-2">
                  <v-card-title
                    class="headline"
                  >{{currentUserId == item.messageFrom ? "You" : item.responserName}}</v-card-title>
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
      addComment: "",
      queryList: [
        {
          messageId: "1",
          queryId: "1",
          requesterId: "007",
          requesterName: "John Doe",
          responserName: "Admin",
          responserId: "1232",
          message: "Hello",
          messageTime: "10/14/2019",
          messageFrom: "007"
        },
        {
          messageId: "2",
          queryId: "1",
          requesterId: "007",
          responserId: "1232",
          requesterName: "John Doe",
          responserName: "Admin",
          message: "How are you",
          messageTime: "10/15/2019",
          messageFrom: "1232"
        },
        {
          messageId: "3",
          queryId: "1",
          requesterId: "007",
          responserId: "1232",
          requesterName: "John Doe",
          responserName: "Admin",
          message: "How are u doing",
          messageTime: "10/22/2019",
          messageFrom: "007"
        },
        {
          messageId: "4",
          queryId: "1",
          requesterId: "007",
          responserId: "1232",
          requesterName: "John Doe",
          responserName: "Admin",
          message: "New work in progress",
          messageTime: "10/30/2019",
          messageFrom: "1232"
        }
      ]
    };
  },
  props: {
    selectedQueryItem: {
      type: Object,
      default: {}
    }
  },
  methods: {
    backToList() {
      this.$emit("backToList", {});
    },
    updateMessage() {
      let message = {
        messageId: "5",
        queryId: "1",
        requesterId: sessionStorage.getItem("UserId"),
        responserId: "1232",
        requesterName: "John Doe",
        responserName: "Admin",
        message: this.addComment,
        messageTime: new Date().getTime(),
        messageFrom: sessionStorage.getItem("UserId")
      };
      this.queryList.push(message);
      this.addComment = "";
    }
  },
  computed: {
    currentUserId() {
      return sessionStorage.getItem("UserId");
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