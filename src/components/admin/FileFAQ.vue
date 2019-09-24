<template>

   <v-row>
    <v-col cols="12">
        <v-file-input
                                     accept="pdf"
   
                                     placeholder="Upload FAQ Document"
                                      label="FAQ Document"
                                     multiple
                                    prepend-icon="mdi-file-document"
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
    
    <v-col cols="12" md="9">
        
    </v-col>
    <v-col cols="12" md="3">
        
        <v-btn color="primary" text > Close</v-btn>
                     
        <!-- <v-btn color="primary" text > Save</v-btn> -->
                     
    </v-col>


   </v-row>
  

</template>