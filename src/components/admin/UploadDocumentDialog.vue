<template>
<v-layout row wrap>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Upload Documents</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-file-input
   
    placeholder="Upload Form16"
    label="Form 16"
    multiple
    prepend-icon="mdi-paperclip"
  >
    <template v-slot:selection="{ text }">
      <v-chip
        small
        label
        color="primary"
      >
        {{ text }}
      </v-chip>
    </template>
  </v-file-input>
              </v-col>
              <v-col cols="12">
                <v-file-input
                accept="pdf"
   
    placeholder="Upload your Salary Slip"
    label="Salary Slip"
    multiple
    prepend-icon="mdi-paperclip"
  >
    <template v-slot:selection="{ text }">
      <v-chip
        small
        label
        color="primary"
      >
        {{ text }}
      </v-chip>
    </template>
  </v-file-input>
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
        files:"",
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
            this.$emit('closeDocumentDialog');
        }
    }
}

</script>