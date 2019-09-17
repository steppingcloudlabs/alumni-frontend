<template>
<v-layout row wrap>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Events</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field label="Title*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Description*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field label="Location" required></v-text-field>
              </v-col>
             <v-col cols="12">
              <v-file-input accept="image/*" prepend-icon="mdi-camera" label="Upload Image"></v-file-input>
             </v-col>
             
            
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn color="blue darken-1" text @click="closeDialog">Close</v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>   
</v-layout>   
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: {
        dialog: {
            type: Boolean,
            default: false,
        }
    },
    methods: {
        closeDialog() {
            this.$emit('closeEventDialog');
        }
    }
}

</script>