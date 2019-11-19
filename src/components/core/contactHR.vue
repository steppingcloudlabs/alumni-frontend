<template>
  <v-layout row wrap>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Contact Us</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="contact"  lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field v-if="Showemail" v-model="email" :rules="emailRules" prepend-icon="mdi-email" label="Email*" ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="ask.subject" :rules="subjectRules" prepend-icon="mdi-message" label="Subject*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field  v-model="ask.body" prepend-icon="mdi-comment-text" label="Body" ></v-text-field>
              </v-col>
            </v-row>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="sendDialog">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      ask:{ subject:"",
      body:""},
     email:"",
      emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
      ],
       subjectRules: [
        v => !!v || "Subject is required",
        
      ]
    };
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    },
    Showemail:{
      type:Boolean,
      default:true
    }
  },
  
  methods: {
    closeDialog() {
      this.$emit("closeAskHrDialog");
    },
    sendDialog(){
      let newData = JSON.parse(JSON.stringify(this.ask));
       this.$emit("closeAskHrDialog");

     
     
      let data = {
        payload:{
        subject: newData.subject,
        body: newData.body,
        
        }
      };
      this.$store.dispatch("userModule/contactHr", data).then(response => {
          if(response.data.status==200)
          {
            this.$store.commit("showSnackbar", {
            message: "We will come back to you shortly",
            color: "success",
            heading: "Success",
            duration: 3000
          });
       
          }
        
       
      });
    }
    
  }
};
</script>