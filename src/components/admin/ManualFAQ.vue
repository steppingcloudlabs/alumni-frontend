<template>

   <v-row>
    <v-col cols="12">
        <v-text-field prepend-icon="mdi-comment-question-outline" label="Question"  required></v-text-field>
    </v-col>
    <v-col cols="12">
        <v-text-field  prepend-icon="mdi-comment-check-outline" label="Answer" required></v-text-field> 
    </v-col>
    <v-col cols="12" md="9">
        
    </v-col>
    <v-col cols="12" md="3">
        
        <!-- <v-btn color="primary" text > Close</v-btn> -->
         <v-flex xs6></v-flex>            
        <v-btn color="primary" text > Save</v-btn>
                     
    </v-col>


   </v-row>
  

</template>