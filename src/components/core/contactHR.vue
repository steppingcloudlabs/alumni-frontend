<template>
    <v-layout row wrap>
         <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
        <v-card-title>
          <span class="headline">Contact Us</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" >
                <v-text-field prepend-icon="mdi-email" label="Subject*" required></v-text-field>
              </v-col>
              <v-col cols="12" >
                <v-text-field prepend-icon="mdi-comment-text" label="Body*" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog">Send</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-layout>
</template>

<script>
export default {
    props:{
        dialog:{
            type:Boolean,
            default:false,
        }
    },
    methods:{
         closeDialog() {
            this.$emit('closeAskHrDialog');
        },
    }
}
</script>