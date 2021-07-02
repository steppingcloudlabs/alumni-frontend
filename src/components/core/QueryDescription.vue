<template>
  <v-layout row wrap>
                <v-flex>
                   <v-card
                  flat
                 class="mx-auto" rounded 
                >
                  <v-card-title>
                     <span class="mr-5">
              <i
                class="fas fa-arrow-left"
                style="cursor: pointer"
                @click="backToList"
              ></i>
            </span>
                    <span>{{ selectedQueryItem.TITLE }}</span>
                    <v-spacer></v-spacer>
                    
              <!-- <v-btn v-if="selectedQueryItem.ESCLATION==true"
                color="blue"
                style="cursor: pointer;font-size:15px;color:white"
                class="text-capitalize"
                @click="escalation"
              > Escalate</v-btn> -->
                    <v-btn color="primary" v-if="selectedQueryItem.ESCLATION" class="mt-2 white--text text-capitalize mr-2" @click="escalation">Escalate</v-btn>     
                  <v-btn color="primary" v-if="selectedQueryItem.RESOLVED" class="mt-2 white--text text-capitalize" @click="resolved">Reject Solution</v-btn>     
                  </v-card-title>
               
                  <v-divider class="my-0" />
                  <v-card-text class="flex-grow-1 fill-height"  style="min-height:65vh">
                 
                    <template v-for="(msg,k) in messages" >
                      <div
                        :key="k"
                        :class="{ 'd-flex flex-row-reverse': msg.USERTYPE=='user'? true : false }"
                      >
                        <v-menu offset-y>
                          <template v-slot:activator="{ on }">
                            <v-hover
                              v-slot:default="{  }"
                            >
                              <v-chip
                                :color="msg.USERTYPE=='user'? 'primary' : ''"
                                dark
                                style="height:auto;white-space: normal;"
                                class="pa-4 mb-2"
                                v-on="on"
                              >
                                {{ msg.MESSAGE }}
                                <sub
                                  class="ml-2"
                                  style="font-size: 0.8rem;"
                                  v-if="msg.CREATEDAT=='now'"
                                >{{msg.CREATEDAT}}</sub>
                                <sub
                                 class="ml-2"
                                  style="font-size: 0.7rem;"
                                  v-else>
                                  {{msg.CREATEDAT.substring(11,16)}},{{msg.CREATEDAT.substring(0,10)}}
                                </sub>
                              </v-chip>
                            </v-hover>
                          </template>
                         
                        </v-menu>
                      </div>
                    
                    </template>
                      <div v-if="reply" style="text-align:center;font-size:12px">We will get back to you soon</div>
                    <!-- <v-text-field
                      v-model="messageForm.content"
                      label="type_a_message"
                      type="text"
                      no-details
                      outlined
                      append-outer-icon="send"
                      @keyup.enter="messages.push(messageForm)"
                      @click:append-outer="messages.push(messageForm)"
                    /> -->
                 
                 
                  </v-card-text>
                   <v-card-text>
                       <v-text-field
                       ref="comments"
                     v-model="addComment"
                      label="Add Comment"
                      append-icon="send"
                      type="text"
                      outlined
                      :rules="commentRules"
                      @click:append="updateMessage"
                      @keyup.enter="updateMessage"
                      solo
                     rounded
                      style="width:90%"
                    
                   ></v-text-field>
                   </v-card-text>
                </v-card>

                </v-flex>













    <!-- <v-flex>
      <v-card class="mx-auto" rounded min-height="90vh">
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
                  <v-avatar>
                    <span class="white--text title">{{
                        item.USERTYPE=='user'
                        ? "Y"
                        : "A"
                    }}</span>
                  </v-avatar>
                </template>
                <v-card class="elevation-2" v-if="item.USERTYPE=='user'" style="text-align:right">
                  <v-card-title class="headline">{{
                    item.USERTYPE=='user'
                      ? "You"
                      : "Admin"
                  }}</v-card-title>
                  <v-card-text>{{ item.MESSAGE }}</v-card-text>
                </v-card>
                 <v-card class="elevation-2" v-else>
                  <v-card-title class="headline">{{
                    item.USERTYPE=='user'
                      ? "You"
                      : "Admin"
                  }}</v-card-title>
                  <v-card-text>{{ item.MESSAGE }}</v-card-text>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </v-flex>
        </v-layout>
        <v-toolbar fixed  class="mb-3" bottom style="position: sticky;top: 62em;z-index:1;" >
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
    </v-flex> -->
  </v-layout>
</template>

<script>
import moment from "moment";
export default {
  name: "QueryDescription",
  data() {
    return {
      addComment: "",
      commentRules: [(v) => !!v || "Comment is required"],
      reply:false
     
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
  // watch:
  // {
  //   selectedQueryItem()
  //   {
  //        this.selectedQueryItem=this.selectedQueryItem
  //   }
  // },
  beforeMount() {
  //  this.getAllMessages();
  },
  mounted()
  {
 //this.getAllMessages();
  },
  destroyed() {
    this.reply=false
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
    resolved()
    {
      let date=new Date()
    
       let data={
         payload:
         {
             ID: this.selectedQueryItem.ID,
            USERID:this.selectedQueryItem.USERID,
            TITLE:this.selectedQueryItem.TITLE,
            ESCLATION:this.selectedQueryItem.ESCLATION,
            RESOLVED: false,
            ESCLATATIONMANAGER:this.selectedQueryItem.ESCLATATIONMANAGER,
            DATE: moment(date).format("x").toString(),
            CREATEDBY: "user"
         }
        
       }
       this.$store
        .dispatch("userModule/updateTicket", data)
        .then((response) => {
          if (response.status == 200) {
            this.selectedQueryItem.RESOLVED=false
           this.$store.commit("showSnackbar", {
            message: "Your Ticket is Open.We will get back to you soon",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
           this.updateStatus()
          }
        });
       console.log(data)
    },
    escalation()
    {
      let date=new Date()
    
       let data={
         payload:
         {
             ID: this.selectedQueryItem.ID,
            USERID:this.selectedQueryItem.USERID,
            TITLE:this.selectedQueryItem.TITLE,
          ESCLATION:true,
            RESOLVED: false,
            ESCLATATIONMANAGER:(parseInt(this.selectedQueryItem.ESCLATATIONMANAGER)+1).toString(),
            DATE: moment(date).format("x").toString(),
            CREATEDBY: "user"
         }
        
       }
       this.$store
        .dispatch("userModule/updateTicket", data)
        .then((response) => {
          if (response.status == 200) {
            this.selectedQueryItem.ESCLATION=true
            this.selectedQueryItem.ESCLATATIONMANAGER=data.payload.ESCLATATIONMANAGER
           this.$store.commit("showSnackbar", {
            message: "Your Ticket is Escalated to Manager..We will get back to you soon",
            color: "success",
            heading: "Success",
            duration: 3000,
          });
          this.updateStatus()
          }
        });
       console.log(data)
    },
    backToList() {
     
      this.$emit("backToList", {});
    },
    updateStatus() {
     
      this.$emit("updateStatus", this.selectedQueryItem);
    },
    updateMessage() {
      this.reply=false
       if (this.$refs.comments.validate())
       {

      
      let vm = this;
      let message = {
        payload: {
          USERTYPE: "user",
          // created_at: "",use
          MESSAGE: this.addComment,
          TICKETID: this.selectedQueryItem.ID,
        },
      };
      let newmsg = {
        CREATEDAT: "now",
        CREATEDBY: "user",
        MODIFIEDAT: moment.unix(),
        MODIFIEDBY: "user",
        ID: this.selectedQueryItem.ID,
        USERTYPE: "user",
        MESSAGE: this.addComment,
        TICKETID: this.selectedQueryItem.ID,
      };

      this.$store
        .dispatch("userModule/postQueryMessage", message)
        .then((response) => {
          if (response.status == 200) {
            vm.reply=true
            vm.messages.push(newmsg);
            this.$emit("newMessageAdded", {
              objIndex: this.objIndex,
              messageObj: message.payload,
            });
          }
        });
      this.addComment = "";
    }
    },
  },
  computed: {
    currentUserId() {
      return this.$store.getters["userModule/getUserData"].USERID;
    },
    userType() {
      return sessionStorage.getItem("Type");
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