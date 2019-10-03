<template>
    <v-layout row wrap>
        <v-flex xs12>
             <v-dialog v-model="showNews" persistent max-width="600px">
            <v-card>
                <v-card-title>
                <span class="headline">Add News</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row>
                    <v-col cols="12">
                        <v-text-field v-model="news.headLine" label="Headline*" required></v-text-field>
                    </v-col>
                    <v-col cols="12">
                        <v-text-field v-model="news.body" label="Body*" required></v-text-field>
                    </v-col>
                    <v-col cols="12" >
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
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    computed:
    {
      news:{
        get(){
            return this.$store.getters['adminModule/getNewsDialogData']
        },
        set(data) 
            {
                this.$store.commit('adminModule/setShowNewsDialogData', data)
            }
      },
      showNews:{
         get(){
            return this.$store.getters['adminModule/getshowNewsDialog']
        },
        set(data) 
            {
                this.$store.commit('adminModule/setShowNews', data)
            }
      },


    },
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
          this.$store.commit('adminModule/closeNewsDialog')
        },
        saveDialog(){
          this.$store.commit('adminModule/addNewsToList', JSON.parse(JSON.stringify(this.news)))
           this.$store.commit('adminModule/closeNewsDialog')
          
        }
       
    }
}

</script>