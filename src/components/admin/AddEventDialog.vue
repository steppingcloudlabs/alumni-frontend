<template>
<v-layout row wrap>
    <v-dialog v-model="showEvent" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Events</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="event.title" label="Title*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field   v-model="event.description" label="Description*" required></v-text-field>
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
          <v-btn color="blue darken-1" text @click="saveDialog">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>   
</v-layout>   
</template>

<script>
export default {
   computed:
    {
      event:{
        get(){
            return this.$store.getters['adminModule/getEventDialogData']
        },
        set(data)
            {
                this.$store.commit('adminModule/setShowEventDialogData', data)
            }
      },
      showEvent:{
         get(){
            return this.$store.getters['adminModule/getshowEventDialog']
        },
        set(data) 
            {
                this.$store.commit('adminModule/setShowEvent', data)
            }
      }
    },
    data() {
        return {

        }
    },
    methods: {
        closeDialog() 
        {
          this.$store.commit('adminModule/closeEventDialog')
        },
        saveDialog()
        {
          this.$store.commit('adminModule/addEventToList', JSON.parse(JSON.stringify(this.event)))
           this.$store.commit('adminModule/closeEventDialog')
          
        }
       
    }
}
</script>