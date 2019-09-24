<template>
  <div>
     <v-row>
          
      <v-col cols="12">
        <v-card outlined
        >
        <v-card-title>
          <p>FAQ</p>
        <v-spacer></v-spacer>
        <v-btn class="button" color="primary" dark @click="dialog = true"><i class="fas fa-plus-circle"></i>Upload FAQ</v-btn>
        </v-card-title>
        <v-card
      v-for="(item,i) in 7"
      :key="i"
    >
    <v-list-item three-line>
      
      
      <v-list-item-content>
          <v-flex xs10>
        <v-list-item-title class="headline mb-2">
            <p>Question </p>
        </v-list-item-title>
          </v-flex>
          <v-flex xs2>
        <div class="flex-grow-1"></div>
        
           <v-icon>delete</v-icon>
          
           <v-icon @click="dialog=true">edit</v-icon>
          </v-flex>
        <v-list-item-subtitle>Answer</v-list-item-subtitle>
      </v-list-item-content>

      
    </v-list-item>
    </v-card>
        
     </v-card> 
     <FAQ :dialog='dialog'  @closeFAQDialog='closeFAQDialog'/>
      </v-col>
     </v-row>
  </div>
   
</template>
<script>
import FAQ from '@/components/admin/uploadFaq.vue'
export default {
    components:{
        FAQ,
    },
    methods:{
        closeFAQDialog(){
            
            this.dialog=false
        }
    },
    data()
    {
        return{
            dialog:false,
        }
    }

}
</script>