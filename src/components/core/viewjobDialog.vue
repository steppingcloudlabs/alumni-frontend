 <<template>

 <v-dialog v-model="viewJob" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="closeDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
         
          <v-toolbar-title>Job Description</v-toolbar-title>
           <v-spacer></v-spacer>
           <v-toolbar-items>
            <v-btn dark text >Apply</v-btn>
          </v-toolbar-items>
         </v-toolbar>
          <v-card-title>{{viewJobData.jobTitle}}</v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
         <v-icon color="blue" v-if="viewJobData.location">mdi-map-marker</v-icon>
        <div class="grey--text ml-4"> {{viewJobData.location}}</div>
      </v-row>

      <div class="my-4 subtitle-1 black--text">
        <v-icon color="blue" v-if="viewJobData.department">mdi-domain</v-icon>
                    {{viewJobData.department}}
      </div>
       <div class="my-4 subtitle-1 black--text">
       Job Posting Id:{{viewJobData.jobPostingId}}
      </div>

      <div>{{viewJobData.jobDescription}}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

   
    <v-card-actions>
      <v-btn
        color="deep-purple accent-4"
        text
      
      >
       Apply
      </v-btn>
    </v-card-actions>
        
      </v-card>
              </v-dialog>
</template>

<script>

export default {
  
   methods: {
    closeDialog() {
      this.$store.commit("userModule/closeViewJob");
    },
    
  },
  computed: {
    viewJob: {
      get() {
        return this.$store.getters["userModule/getViewJob"];
      },
      set(data) {
        this.$store.commit("userModule/setViewJob", data);
      }
    },
    viewJobData: {
      get() {
        return this.$store.getters["userModule/getViewJobData"];
      },
      set(data) {
        this.$store.commit("userModule/setViewJobData", data);
      }
    },
   
  },

};
</script>