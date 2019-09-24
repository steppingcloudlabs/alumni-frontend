<template>
    <v-layout row wrap>
        <v-dialog v-model="dialog" persistent max-width="700px">
            <v-card class="card">
                <v-card-title>
                    <span class="headline-mb-1">Upload FAQ</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <manualFaq/>
                        
                        
                        <v-divider ></v-divider>
                     
                        
                         <p class="text-center"> OR</p>
                        
                          
                       
                        <v-divider ></v-divider>
                       
                      
                       
                            
                      <FileFAQ/>
                         
                        
                    </v-container>
                    <small> *Required Fields are mandatory</small>
                </v-card-text>
                <v-card-actions>
                    <div class="flex-grow-1"></div>
                 <v-flex xs4></v-flex>
                    <!--<v-btn color="blue-darken-1" text @click="closeDialog"> save</v-btn>-->
                     <v-btn color="blue-darken-1" text @click="closeDialog"> Close</v-btn> 
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import manualFaq from '@/components/admin/ManualFAQ.vue'
import FileFAQ from '@/components/admin/FileFAQ.vue'
export default {
    components:
    {
manualFaq,
FileFAQ
    },
    props:{
     dialog:{
         type:Boolean,
         default:false,
             
         }
     },
     methods:{
         closeDialog(){
             this.$emit('closeFAQDialog')
         }
     },
    
        data(){
        return{
            
        }
    }
}
</script>
<style >
.row{
    margin-right: 15px
}

</style>